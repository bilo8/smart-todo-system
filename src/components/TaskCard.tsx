import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: number) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

function TaskCard({
  task,
  onComplete,
  onDelete,
  onEdit,
}: TaskCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-2xl bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {task.category}
              </span>

              <span className="rounded-2xl bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                +{task.points} XP
              </span>

              {task.completed && (
                <span className="rounded-2xl bg-green-100 px-3 py-1 text-sm font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  Done
                </span>
              )}
            </div>

            <h3
              className={`mt-4 break-words text-2xl font-black transition ${
                task.completed
                  ? "text-slate-400 line-through dark:text-slate-500"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {task.title}
            </h3>

            {task.reminderAt && (
              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                🔔 Reminder:{" "}
                {new Date(
                  task.reminderAt
                ).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {!task.completed && (
              <button
                onClick={() =>
                  onComplete(task.id)
                }
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:scale-105 hover:bg-slate-700 dark:bg-white dark:text-slate-900"
              >
                Complete
              </button>
            )}

            <button
              onClick={() => onEdit(task)}
              className="rounded-2xl bg-blue-100 px-5 py-3 text-sm font-bold text-blue-700 transition hover:scale-105 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300"
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(task)
              }
              className="rounded-2xl bg-red-100 px-5 py-3 text-sm font-bold text-red-700 transition hover:scale-105 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;