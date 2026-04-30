import { Layout } from "@/components/dashboard-component/dashboard-layout";
import { DashboardMetrics } from "@/components/dashboard-component/dashboard/metrics";
import { WeeklyProgress } from "@/components/dashboard-component/dashboard/weekly-progress";
import { WorkloadChart } from "@/components/dashboard-component/dashboard/workload-chart";
import { TopStudents } from "@/components/dashboard-component/dashboard/top-students";
import { TasksList } from "@/components/dashboard-component/dashboard/tasks-list";
import { UpcomingActivities } from "@/components/dashboard-component/dashboard/upcoming-activities";

export default function HomePage() {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 space-y-4">
            <DashboardMetrics />
            <div className="grid gap-4 md:grid-cols-2">
              <WeeklyProgress />
              <WorkloadChart />
            </div>
            <TopStudents />
          </div>
          <div className="col-span-3 space-y-4">
            <TasksList />
            <UpcomingActivities />
          </div>
        </div>
      </div>
    </Layout>
  );
}
