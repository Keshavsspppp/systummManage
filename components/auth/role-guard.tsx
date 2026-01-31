"use client"

import { useAuth } from "@/lib/auth-context"
import { UserRole } from "@/types"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: (UserRole | string)[]
  fallback?: React.ReactNode
}

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { hasRole } = useAuth()

  if (!hasRole(allowedRoles)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
