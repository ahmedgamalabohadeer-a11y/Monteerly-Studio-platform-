import 'server-only';

import { requireUser } from '../serverAuth.ts';
import {
  readPaymentStatusForQuote,
  type PaymentStatusRpcClient,
} from './payment-status-rpc.ts';
import {
  createServerQuote,
  ServerQuoteError,
  type QuotePaymentState,
  type ServerQuote,
  type ServerQuoteStore,
} from './server-quote.ts';

const JOB_QUOTE_LIFETIME_MS = 5 * 60 * 1000;
const JOB_PRICE_VERSION_PREFIX = 'job-budget-text-v1:';

type JobReadResult = {
  data: unknown;
  error: unknown | null;
};

export type ServerQuoteAdapterContext = {
  actorId: string;
  readOwnedJob: (actorId: string, jobId: string) => Promise<JobReadResult>;
  paymentStatusClient: PaymentStatusRpcClient;
};

export type ServerQuoteAdapterDependencies = {
  authenticate: () => Promise<ServerQuoteAdapterContext>;
  now: () => Date;
};

export type ServerQuoteAdapterErrorCode = 'job_read_failed' | 'invalid_job_record';

export class ServerQuoteAdapterError extends Error {
  readonly code: ServerQuoteAdapterErrorCode;

  constructor(code: ServerQuoteAdapterErrorCode) {
    super(code);
    this.name = 'ServerQuoteAdapterError';
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseJobQuoteRequest(input: unknown): {
  jobId: string;
  expectedPriceVersion: string;
} {
  if (!isRecord(input)) throw new ServerQuoteError('invalid_request');

  const allowedKeys = new Set(['jobId', 'expectedPriceVersion']);
  if (Object.keys(input).some((key) => !allowedKeys.has(key))) {
    throw new ServerQuoteError('invalid_request');
  }
  if (
    typeof input.jobId !== 'string' ||
    input.jobId.trim().length === 0 ||
    typeof input.expectedPriceVersion !== 'string' ||
    input.expectedPriceVersion.trim().length === 0
  ) {
    throw new ServerQuoteError('invalid_request');
  }

  return {
    jobId: input.jobId,
    expectedPriceVersion: input.expectedPriceVersion,
  };
}

export function createServerQuoteAdapter(
  dependencies: ServerQuoteAdapterDependencies,
): (input: unknown) => Promise<ServerQuote> {
  return async (input: unknown): Promise<ServerQuote> => {
    const request = parseJobQuoteRequest(input);
    const context = await dependencies.authenticate();
    const requestTime = dependencies.now();
    if (
      typeof context.actorId !== 'string' ||
      context.actorId.trim().length === 0 ||
      !Number.isFinite(requestTime.getTime())
    ) {
      throw new ServerQuoteError('invalid_request');
    }

    const store: ServerQuoteStore = {
      readAuthorizedSource: async (actorId, source) => {
        if (actorId !== context.actorId || source.sourceType !== 'job') return null;

        const { data, error } = await context.readOwnedJob(actorId, source.sourceId);
        if (error) throw new ServerQuoteAdapterError('job_read_failed');
        if (data === null) return null;
        const jobId = isRecord(data) ? data.id : undefined;
        const clientId = isRecord(data) ? data.client_id : undefined;
        const status = isRecord(data) ? data.status : undefined;
        const budgetText = isRecord(data) ? data.budget_text : undefined;
        if (
          typeof jobId !== 'string' ||
          jobId !== source.sourceId ||
          typeof status !== 'string' ||
          typeof budgetText !== 'string'
        ) {
          throw new ServerQuoteAdapterError('invalid_job_record');
        }
        if (clientId !== actorId) return null;

        return {
          sourceType: 'job',
          sourceId: jobId,
          quoteable: status === 'open',
          priceEgp: budgetText,
          currency: 'EGP',
          priceVersion: `${JOB_PRICE_VERSION_PREFIX}${budgetText}`,
          validUntil: new Date(
            requestTime.getTime() + JOB_QUOTE_LIFETIME_MS,
          ).toISOString(),
        };
      },
      readPaymentState: async (
        actorId,
        source,
      ): Promise<QuotePaymentState> => {
        if (actorId !== context.actorId || source.sourceType !== 'job') {
          throw new ServerQuoteError('invalid_payment_state');
        }

        const paymentStatus = await readPaymentStatusForQuote(
          context.paymentStatusClient,
          'job',
          source.sourceId,
        );
        return {
          hasSuccessfulPayment: paymentStatus.has_successful_payment,
          hasActiveAttempt: paymentStatus.has_active_attempt,
        };
      },
    };

    const quote = await createServerQuote(
      {
        sourceType: 'job',
        sourceId: request.jobId,
        expectedPriceVersion: request.expectedPriceVersion,
      },
      context.actorId,
      store,
      requestTime,
    );
    const responseTime = dependencies.now().getTime();
    if (!Number.isFinite(responseTime)) {
      throw new ServerQuoteError('invalid_request');
    }
    if (Date.parse(quote.expires_at) <= responseTime) {
      throw new ServerQuoteError('quote_expired');
    }
    return quote;
  };
}

async function authenticateJobQuoteContext(): Promise<ServerQuoteAdapterContext> {
  const { supabase, user } = await requireUser();
  return {
    actorId: user.id,
    readOwnedJob: async (actorId, jobId) => {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, client_id, status, budget_text:budget::text')
        .eq('id', jobId)
        .eq('client_id', actorId)
        .maybeSingle();
      return { data, error };
    },
    paymentStatusClient: {
      rpc: async (functionName, parameters) => {
        const { data, error } = await supabase.rpc(functionName, parameters);
        return { data, error };
      },
    },
  };
}

export const createAuthenticatedJobQuote = createServerQuoteAdapter({
  authenticate: authenticateJobQuoteContext,
  now: () => new Date(),
});
