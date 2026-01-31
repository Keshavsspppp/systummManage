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
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/50 group-hover:rotate-6 transition-transform">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate group-hover:text-purple-600 transition-colors">{user?.name}</p>
            <p className="text-xs text-purple-600 capitalize font-semibold">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <RoleGuard key={item.href} allowedRoles={item.roles}>
              <li style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 group ${
                    pathname === item.href
                      ? "gradient-primary text-white shadow-xl shadow-purple-500/50 scale-105"
                      : "text-gray-700 hover:bg-gradient-to-br hover:from-purple-50 hover:via-pink-50 hover:to-blue-50 hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  <span className={`${pathname === item.href ? "" : "group-hover:rotate-12"} transition-transform`}>
                    {item.icon}
                  </span>
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
          <Button variant="ghost" className="w-full justify-start hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-105 transition-all font-semibold">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 hover:scale-105 transition-all font-semibold"
          onClick={logout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
