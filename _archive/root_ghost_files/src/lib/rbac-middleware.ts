// 🔐 RBAC MIDDLEWARE (Phase 1)
// Role-Based Access Control for Paymob + Protected Routes
// File: src/lib/rbac-middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export interface RBACUser {
  uid: string;
  email: string;
  role: 'admin' | 'creator' | 'client' | 'moderator';
  subscription: 'free' | 'pro' | 'enterprise';
}

// ============ ROLE PERMISSIONS ============
const rolePermissions: Record<string, string[]> = {
  admin: [
    'read:all',
    'write:all',
    'delete:all',
    'manage:users',
    'manage:payments',
    'view:analytics'
  ],
  creator: [
    'read:own',
    'write:own',
    'receive:payment',
    'upload:media',
    'view:own_analytics'
  ],
  client: [
    'read:own',
    'write:own',
    'send:payment',
    'view:own_projects'
  ],
  moderator: [
    'read:all',
    'moderate:content',
    'view:analytics'
  ]
};

export function hasPermission(user: RBACUser | null, requiredPermission: string): boolean {
  if (!user) return false;
  const permissions = rolePermissions[user.role] || [];
  return permissions.includes(requiredPermission) || permissions.includes('*');
}

export function checkRole(user: RBACUser | null, allowedRoles: string[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

// ============ MIDDLEWARE FOR ROUTES ============
export function rbacMiddleware(request: NextRequest, user: RBACUser | null, requiredPermission: string) {
  if (!hasPermission(user, requiredPermission)) {
    return NextResponse.json(
      { error: 'Forbidden: Insufficient permissions' },
      { status: 403 }
    );
  }
  return null; // Allow
}

export default { hasPermission, checkRole, rbacMiddleware };
