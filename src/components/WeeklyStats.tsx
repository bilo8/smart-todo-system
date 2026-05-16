import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Task } from "../types/task";

interface WeeklyStatsProps {
  tasks: Task[];
}

function WeeklyStats({ tasks }: WeeklyStatsProps) {
  const weekData = [
    { day: "Mon", completed: 0 },
    { day: "Tue", completed: 0 },
    { day: "Wed", completed: 0 },
    { day: "Thu", completed: 0 },
    { day: "Fri", completed: 0 },
    { day: "Sat", completed: 0 },
    { day: "Sun", completed: 0 },
  ];

  tasks.forEach((task) => {
    if (!task.completed) return;

    const dayIndex = new Date(task.createdAt).getDay();
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

    weekData[adjustedIndex].completed += 1;
  });

  return (
    <section className="mt-10 rounded-3xl border border-white/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">Weekly Statistics</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Track your completed tasks this week.
          </p>
        </div>

        <div className="hidden rounded-2xl bg-blue-100 px-4 py-3 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 sm:block">
          📊 Weekly View
        </div>
      </div>

      <div className="mt-8 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="completed" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default WeeklyStats;