export type UserRole = 'admin' | 'school' | 'parent' | 'student';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  roles: UserRole[];
}