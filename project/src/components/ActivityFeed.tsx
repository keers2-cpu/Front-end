import React from 'react';
import { motion } from 'framer-motion';

interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.description}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {activity.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}