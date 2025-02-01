import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Users, GraduationCap, BookOpen, School, Trophy, UserCheck } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ThemeToggle } from './components/ThemeToggle';
import { StatsCard } from './components/StatsCard';
import { ActivityFeed } from './components/ActivityFeed';
import { PerformanceChart } from './components/PerformanceChart';
import { LoginForm } from './components/LoginForm';
import { useThemeStore } from './store/theme';
import { useAuthStore } from './store/auth';
import type { User } from './types';

const queryClient = new QueryClient();

// Mock data for different roles
const dashboardData = {
  admin: {
    stats: [
      { title: 'Total Schools', value: '42', icon: School, trend: { value: 15, isPositive: true } },
      { title: 'Total Students', value: '12,456', icon: Users, trend: { value: 8, isPositive: true } },
      { title: 'Average Performance', value: '78%', icon: Trophy, trend: { value: 5, isPositive: true } },
    ],
    activities: [
      { id: 1, title: 'New School Onboarded', description: 'Lincoln High School joined the platform', time: '1h ago' },
      { id: 2, title: 'Performance Report', description: 'Monthly performance report generated', time: '3h ago' },
      { id: 3, title: 'System Update', description: 'New features deployed successfully', time: '1d ago' },
    ]
  },
  school: {
    stats: [
      { title: 'Total Students', value: '1,234', icon: Users, trend: { value: 12, isPositive: true } },
      { title: 'Active Classes', value: '42', icon: GraduationCap, trend: { value: 8, isPositive: true } },
      { title: 'Average Score', value: '87%', icon: BookOpen, trend: { value: 3, isPositive: true } },
    ],
    activities: [
      { id: 1, title: 'New Student Enrolled', description: 'Sarah Johnson joined Class 10A', time: '2h ago' },
      { id: 2, title: 'Assignment Submitted', description: 'Math homework submitted by 15 students', time: '3h ago' },
      { id: 3, title: 'Exam Results Published', description: 'Science mid-term results are now available', time: '5h ago' },
    ]
  },
  parent: {
    stats: [
      { title: 'Assignments', value: '8', icon: BookOpen, trend: { value: 2, isPositive: true } },
      { title: 'Attendance', value: '95%', icon: UserCheck, trend: { value: 1, isPositive: true } },
      { title: 'Average Grade', value: 'A-', icon: Trophy, trend: { value: 4, isPositive: true } },
    ],
    activities: [
      { id: 1, title: 'Math Test', description: 'Scored 92% in Advanced Algebra', time: '2d ago' },
      { id: 2, title: 'Parent Meeting', description: 'Scheduled for next Tuesday', time: '1d ago' },
      { id: 3, title: 'Project Submission', description: 'Science project due in 3 days', time: '12h ago' },
    ]
  },
  student: {
    stats: [
      { title: 'Current Grade', value: 'A-', icon: Trophy, trend: { value: 5, isPositive: true } },
      { title: 'Completed Tasks', value: '45', icon: BookOpen, trend: { value: 12, isPositive: true } },
      { title: 'Attendance', value: '92%', icon: UserCheck, trend: { value: 2, isPositive: false } },
    ],
    activities: [
      { id: 1, title: 'Assignment Due', description: 'History essay deadline tomorrow', time: '1h ago' },
      { id: 2, title: 'Quiz Result', description: 'Scored 95% in Biology quiz', time: '1d ago' },
      { id: 3, title: 'New Course Material', description: 'Physics chapter 5 notes available', time: '2h ago' },
    ]
  }
};

const performanceData = {
  admin: [
    { date: 'Jan', value: 72 },
    { date: 'Feb', value: 75 },
    { date: 'Mar', value: 78 },
    { date: 'Apr', value: 74 },
    { date: 'May', value: 80 },
    { date: 'Jun', value: 82 },
  ],
  school: [
    { date: 'Jan', value: 65 },
    { date: 'Feb', value: 72 },
    { date: 'Mar', value: 68 },
    { date: 'Apr', value: 75 },
    { date: 'May', value: 82 },
    { date: 'Jun', value: 87 },
  ],
  parent: [
    { date: 'Jan', value: 78 },
    { date: 'Feb', value: 82 },
    { date: 'Mar', value: 81 },
    { date: 'Apr', value: 85 },
    { date: 'May', value: 88 },
    { date: 'Jun', value: 90 },
  ],
  student: [
    { date: 'Jan', value: 70 },
    { date: 'Feb', value: 75 },
    { date: 'Mar', value: 85 },
    { date: 'Apr', value: 82 },
    { date: 'May', value: 88 },
    { date: 'Jun', value: 92 },
  ],
};

function App() {
  const { isDarkMode } = useThemeStore();
  const user = useAuthStore((state) => state.user);
  const currentPath = '/dashboard';
  
  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`${isDarkMode ? 'dark' : ''}`}>
          <LoginForm />
        </div>
      </QueryClientProvider>
    );
  }

  const roleData = dashboardData[user.role];
  const chartData = performanceData[user.role];

  const getDashboardTitle = () => {
    switch (user.role) {
      case 'admin':
        return 'System Overview';
      case 'school':
        return 'School Dashboard';
      case 'parent':
        return 'Student Progress';
      case 'student':
        return 'My Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const getChartTitle = () => {
    switch (user.role) {
      case 'admin':
        return 'Overall System Performance';
      case 'school':
        return 'School Performance Trend';
      case 'parent':
        return 'Student Performance History';
      case 'student':
        return 'My Performance Trend';
      default:
        return 'Performance Trend';
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar userRole={user.role} currentPath={currentPath} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header user={user}>
              <ThemeToggle />
            </Header>
            
            <main className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {getDashboardTitle()}
                  </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {roleData.stats.map((stat, index) => (
                    <StatsCard
                      key={index}
                      title={stat.title}
                      value={stat.value}
                      icon={stat.icon}
                      trend={stat.trend}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <PerformanceChart
                    data={chartData}
                    title={getChartTitle()}
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Recent Activity
                    </h2>
                    <ActivityFeed activities={roleData.activities} />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;