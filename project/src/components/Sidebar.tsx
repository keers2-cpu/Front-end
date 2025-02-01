import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react';
import type { NavigationItem, UserRole } from '../types';

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'school', 'parent', 'student'] },
  { name: 'Users', href: '/users', icon: Users, roles: ['admin', 'school'] },
  { name: 'Classes', href: '/classes', icon: GraduationCap, roles: ['admin', 'school', 'student'] },
  { name: 'Schedule', href: '/schedule', icon: Calendar, roles: ['admin', 'school', 'parent', 'student'] },
  { name: 'Reports', href: '/reports', icon: FileText, roles: ['admin', 'school', 'parent'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin', 'school', 'parent', 'student'] },
];

interface SidebarProps {
  userRole: UserRole;
  currentPath: string;
}

export function Sidebar({ userRole, currentPath }: SidebarProps) {
  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex h-screen flex-col justify-between bg-gray-900 w-64 p-4">
      <div>
        <div className="flex items-center gap-2 px-2 mb-8">
          <GraduationCap className="h-8 w-8 text-indigo-500" />
          <span className="text-xl font-bold text-white">Slate</span>
        </div>
        <nav className="space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>
      <button className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
        <LogOut className="h-5 w-5" />
        Sign out
      </button>
    </div>
  );
}