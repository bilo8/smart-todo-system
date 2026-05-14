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
    <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <h2 className="text-2xl font-bold">Weekly Statistics</h2>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default WeeklyStats;