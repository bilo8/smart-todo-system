import type { Task } from "../types/task";

interface HistoryProps {
  tasks: Task[];
}

function History({ tasks }: HistoryProps) {
  const completedTasks = tasks
    .filter((task) => task.completed && task.completedAt)
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() -
        new Date(a.completedAt!).getTime()
    );

  const groupedTasks = completedTasks.reduce<Record<string, Task[]>>(
    (groups, task) => {
      const dateKey = new Date(task.completedAt!).toLocaleDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(task);

      return groups;
    },
    {}
  );

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          Task History
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          View your completed tasks grouped by completion day.
        </p>
      </div>

      {completedTasks.length === 0 ? (
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
          <div className="text-7xl">🕒</div>

          <h2 className="mt-6 text-4xl font-black">No History Yet</h2>

          <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
            Complete tasks and they will appear here.
          </p>
        </div>
      ) : (
        Object.entries(groupedTasks).map(([date, dayTasks]) => (
          <section key={date} className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {date}
            </h2>

            <div className="space-y-4">
              {dayTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        {task.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-3">
                        <span className="rounded-2xl bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          {task.category}
                        </span>

                        <span className="rounded-2xl bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                          +{task.points} XP
                        </span>

                        <span className="rounded-2xl bg-green-100 px-3 py-1 text-sm font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                          Completed
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {new Date(task.completedAt!).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default History;