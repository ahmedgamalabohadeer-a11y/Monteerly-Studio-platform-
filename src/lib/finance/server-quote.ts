import 'server-only';

import { parseEgpToMinorUnits } from './egp-minor-units.ts';

const QUOTE_LIFETIME_MS = 5 * 60 * 1000;

export const SERVER_QUOTE_POLICY_VERSION = 'egp-minor-units-half-up-v1';

export type QuoteSourceType = 'service' | 'job' | 'order' | 'contract';

export type QuoteSourceReference = {
  sourceType: QuoteSourceType;
  sourceId: string;
};

export type TrustedQuoteSource = QuoteSourceReference & {
  quoteable: boolean;
  priceEgp: string;
  currency: string;
  priceVersion: string;
  validUntil: string;
};

export type QuotePaymentState = {
  hasSuccessfulPayment: boolean;
  hasActiveAttempt: boolean;
};

export interface ServerQuoteStore {
  /** Enforce ownership, membership, or capability using server-side identity, not accountType. */
  readAuthorizedSource(
    actorId: string,
    source: QuoteSourceReference,
  ): Promise<TrustedQuoteSource | null>;
  /** Read canonical successful-payment and active-attempt state; never accept it from the caller. */
  readPaymentState(
    actorId: string,
    source: QuoteSourceReference,
  ): Promise<QuotePaymentState>;
}

export type ServerQuote = QuoteSourceReference & {
  amount_minor: number;
  currency: 'EGP';
  policy_version: string;
  source_price_version: string;
  expires_at: string;
};

export type ServerQuoteErrorCode =
  | 'invalid_request'
  | 'source_not_found'
  | 'source_unavailable'
  | 'invalid_source'
  | 'quote_expired'
  | 'price_changed'
  | 'payment_already_succeeded'
  | 'active_payment_attempt'
  | 'unsupported_currency'
  | 'invalid_source_price'
  | 'invalid_payment_state';

export class ServerQuoteError extends Error {
  readonly code: ServerQuoteErrorCode;

  constructor(code: ServerQuoteErrorCode) {
    super(code);
    this.name = 'ServerQuoteError';
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseRequest(input: unknown): QuoteSourceReference & {
  expectedPriceVersion: string;
} {
  if (!isRecord(input)) throw new ServerQuoteError('invalid_request');

  const allowedKeys = new Set(['sourceType', 'sourceId', 'expectedPriceVersion']);
  if (Object.keys(input).some((key) => !allowedKeys.has(key))) {
    throw new ServerQuoteError('invalid_request');
  }

  if (
    (input.sourceType !== 'service' &&
      input.sourceType !== 'job' &&
      input.sourceType !== 'order' &&
      input.sourceType !== 'contract') ||
    typeof input.sourceId !== 'string' ||
    input.sourceId.trim().length === 0 ||
    typeof input.expectedPriceVersion !== 'string' ||
    input.expectedPriceVersion.trim().length === 0
  ) {
    throw new ServerQuoteError('invalid_request');
  }

  return {
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    expectedPriceVersion: input.expectedPriceVersion,
  };
}

export async function createServerQuote(
  input: unknown,
  actorId: string,
  store: ServerQuoteStore,
  now: Date = new Date(),
): Promise<ServerQuote> {
  const request = parseRequest(input);
  if (typeof actorId !== 'string' || actorId.trim().length === 0) {
    throw new ServerQuoteError('invalid_request');
  }

  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs)) throw new ServerQuoteError('invalid_request');

  const sourceReference: QuoteSourceReference = {
    sourceType: request.sourceType,
    sourceId: request.sourceId,
  };
  const source = await store.readAuthorizedSource(actorId, sourceReference);
  if (!source) throw new ServerQuoteError('source_not_found');
  if (
    source.sourceType !== request.sourceType ||
    source.sourceId !== request.sourceId ||
    typeof source.quoteable !== 'boolean' ||
    typeof source.priceEgp !== 'string' ||
    typeof source.currency !== 'string' ||
    typeof source.priceVersion !== 'string' ||
    typeof source.validUntil !== 'string'
  ) {
    throw new ServerQuoteError('invalid_source');
  }
  if (!source.quoteable) throw new ServerQuoteError('source_unavailable');
  if (source.currency !== 'EGP') throw new ServerQuoteError('unsupported_currency');
  if (source.priceVersion !== request.expectedPriceVersion) {
    throw new ServerQuoteError('price_changed');
  }

  const sourceExpiryMs = Date.parse(source.validUntil);
  if (!Number.isFinite(sourceExpiryMs)) {
    throw new ServerQuoteError('invalid_source');
  }
  if (sourceExpiryMs <= nowMs) throw new ServerQuoteError('quote_expired');

  const paymentState = await store.readPaymentState(actorId, sourceReference);
  if (
    typeof paymentState.hasSuccessfulPayment !== 'boolean' ||
    typeof paymentState.hasActiveAttempt !== 'boolean'
  ) {
    throw new ServerQuoteError('invalid_payment_state');
  }
  if (paymentState.hasSuccessfulPayment) {
    throw new ServerQuoteError('payment_already_succeeded');
  }
  if (paymentState.hasActiveAttempt) {
    throw new ServerQuoteError('active_payment_attempt');
  }

  let amountMinor: number;
  try {
    amountMinor = parseEgpToMinorUnits(source.priceEgp);
  } catch (error) {
    if (error instanceof TypeError || error instanceof RangeError) {
      throw new ServerQuoteError('invalid_source_price');
    }
    throw error;
  }

  return {
    sourceType: source.sourceType,
    sourceId: source.sourceId,
    amount_minor: amountMinor,
    currency: 'EGP',
    policy_version: SERVER_QUOTE_POLICY_VERSION,
    source_price_version: source.priceVersion,
    expires_at: new Date(
      Math.min(sourceExpiryMs, nowMs + QUOTE_LIFETIME_MS),
    ).toISOString(),
  };
}
