"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { UserRole } from "@/types"
import { Button } from "@/components/ui/button"
import { RoleGuard } from "@/components/auth/role-guard"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  Package,
  Settings,
  LogOut,
  CheckSquare,
  BarChart3,
  UserCircle,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  roles: (UserRole | string)[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.ORGANIZER, UserRole.PARTICIPANT],
  },
  {
    title: "Events",
    href: "/events",
    icon: <Calendar className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.ORGANIZER, UserRole.PARTICIPANT],
  },
  {
    title: "Clubs",
    href: "/clubs",
    icon: <Users className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.ORGANIZER, UserRole.PARTICIPANT],
  },
  {
    title: "Resources",
    href: "/resources",
    icon: <Building2 className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.ORGANIZER],
  },
  {
    title: "Approvals",
    href: "/approvals",
    icon: <CheckSquare className="h-5 w-5" />,
    roles: [UserRole.ADMIN],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    roles: [UserRole.ADMIN],
  },
  {
    title: "My Bookings",
    href: "/bookings",
    icon: <Package className="h-5 w-5" />,
    roles: [UserRole.ORGANIZER],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="flex h-screen w-64 flex-col glass-effect border-r-0">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-white/20 px-6">
        <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
          <span className="text-white font-bold">CH</span>
        </div>
        <span className="ml-2 text-lg font-bold text-gradient">Campus Hub</span>
      </div>

      {/* User Info */}
      <div className="border-b border-white/20 p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover-lift">
          <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-purple-600 capitalize font-medium">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <RoleGuard key={item.href} allowedRoles={item.roles}>
              <li>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    pathname === item.href
                      ? "gradient-primary text-white shadow-lg shadow-purple-500/50"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover-lift"
                  }`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            </RoleGuard>
          ))}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="border-t border-white/20 p-4 space-y-2">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
