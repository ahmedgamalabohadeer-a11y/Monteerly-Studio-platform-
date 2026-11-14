export const SYSTEM_ROLES = [
  'user',
  'support',
  'moderator',
  'kyc_operator',
  'finance_operator',
  'admin',
  'executive',
] as const;

export type SystemRole = (typeof SYSTEM_ROLES)[number];

export function isSystemRole(value: unknown): value is SystemRole {
  return typeof value === 'string' && SYSTEM_ROLES.some((role) => role === value);
}
