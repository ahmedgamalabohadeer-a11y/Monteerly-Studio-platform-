import 'server-only';

export type PaymentIntentSourceType = 'service' | 'job';

export type PaymentStatusForQuote = {
  has_successful_payment: boolean;
  has_active_attempt: boolean;
};

type PaymentStatusRpcResponse = {
  data: unknown;
  error: unknown | null;
};

export interface PaymentStatusRpcClient {
  rpc: (
    functionName: 'get_payment_status_for_quote',
    parameters: {
      p_source_type: PaymentIntentSourceType;
      p_source_id: string;
    },
  ) => Promise<PaymentStatusRpcResponse>;
}

export type PaymentStatusRpcErrorCode =
  | 'invalid_request'
  | 'query_failed'
  | 'invalid_response';

export class PaymentStatusRpcError extends Error {
  readonly code: PaymentStatusRpcErrorCode;

  constructor(code: PaymentStatusRpcErrorCode) {
    super(code);
    this.name = 'PaymentStatusRpcError';
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function readPaymentStatusForQuote(
  client: PaymentStatusRpcClient,
  sourceType: PaymentIntentSourceType,
  sourceId: string,
): Promise<PaymentStatusForQuote> {
  if (
    (sourceType !== 'service' && sourceType !== 'job') ||
    typeof sourceId !== 'string' ||
    sourceId.trim().length === 0
  ) {
    throw new PaymentStatusRpcError('invalid_request');
  }

  const result = await client.rpc('get_payment_status_for_quote', {
    p_source_type: sourceType,
    p_source_id: sourceId,
  });
  if (result.error) throw new PaymentStatusRpcError('query_failed');
  if (
    !isRecord(result.data) ||
    typeof result.data.has_successful_payment !== 'boolean' ||
    typeof result.data.has_active_attempt !== 'boolean'
  ) {
    throw new PaymentStatusRpcError('invalid_response');
  }

  return {
    has_successful_payment: result.data.has_successful_payment,
    has_active_attempt: result.data.has_active_attempt,
  };
}
