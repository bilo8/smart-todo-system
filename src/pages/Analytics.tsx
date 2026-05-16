import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import type { Task } from "../types/task";

interface AnalyticsProps {
  tasks: Task[];
}

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
];

function Analytics({
  tasks,
}: AnalyticsProps) {
  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  );

  const categoryData = [
    {
      name: "Study",
      value: tasks.filter(
        (task) =>
          task.category === "Study"
      ).length,
    },
    {
      name: "Gym",
      value: tasks.filter(
        (task) =>
          task.category === "Gym"
      ).length,
    },
    {
      name: "Personal",
      value: tasks.filter(
        (task) =>
          task.category === "Personal"
      ).length,
    },
    {
      name: "Work",
      value: tasks.filter(
        (task) =>
          task.category === "Work"
      ).length,
    },
  ];

  const productivityData = [
    { day: "Mon", xp: 40 },
    { day: "Tue", xp: 70 },
    { day: "Wed", xp: 55 },
    { day: "Thu", xp: 90 },
    { day: "Fri", xp: 75 },
    { day: "Sat", xp: 110 },
    { day: "Sun", xp: 95 },
  ];

  const totalXP = completedTasks.reduce(
    (sum, task) => sum + task.points,
    0
  );

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Track your productivity and performance.
        </p>
      </div>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
            Total Tasks
          </p>

          <h2 className="mt-4 text-5xl font-black">
            {tasks.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-green-100">
            Completed
          </p>

          <h2 className="mt-4 text-5xl font-black">
            {completedTasks.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-100">
            Total XP
          </p>

          <h2 className="mt-4 text-5xl font-black">
            {totalXP}
          </h2>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                Tasks by Category
              </h2>

              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Distribution of your tasks.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              📊 Categories
            </div>
          </div>

          <div className="mt-8 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  innerRadius={60}
                  paddingAngle={5}
                >
                  {categoryData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                Weekly Productivity
              </h2>

              <p className="mt-1 text-slate-500 dark:text-slate-400">
                XP gained during the week.
              </p>
            </div>

            <div className="rounded-2xl bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
              ⚡ XP Flow
            </div>
          </div>

          <div className="mt-8 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={productivityData}
              >
                <defs>
                  <linearGradient
                    id="colorXP"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#6366F1"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#6366F1"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.2}
                />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#6366F1"
                  fillOpacity={1}
                  fill="url(#colorXP)"
                  strokeWidth={4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <h2 className="text-2xl font-black">
          Productivity Summary
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-800">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Completion Rate
            </p>

            <h3 className="mt-3 text-4xl font-black">
              {tasks.length === 0
                ? 0
                : Math.round(
                    (completedTasks.length /
                      tasks.length) *
                      100
                  )}
              %
            </h3>
          </div>

          <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-800">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Pending Tasks
            </p>

            <h3 className="mt-3 text-4xl font-black">
              {pendingTasks.length}
            </h3>
          </div>

          <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-800">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Avg XP / Task
            </p>

            <h3 className="mt-3 text-4xl font-black">
              {completedTasks.length === 0
                ? 0
                : Math.round(
                    totalXP /
                      completedTasks.length
                  )}
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analytics;