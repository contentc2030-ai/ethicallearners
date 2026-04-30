'use client';

import EmailSubscribers from "@/components/admin/email-subscribers";

export default function SubscriberManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Subscriber Management</h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300">
        Manage your subscribers and send targeted or broadcast emails to keep your audience engaged.
      </p>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900">
        <EmailSubscribers />
      </div>
    </div>
  );
} 