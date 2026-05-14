import type { Task } from "../types/task";

interface TaskCardProps {
    task: Task;
    onComplete: (taskId: number) => void;
    onDelete: (taskId: number) => void;
    onEdit: (task: Task) => void;
}

function TaskCard({ task, onComplete, onDelete, onEdit }: TaskCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
                <h3
                    className={`break-words text-lg font-semibold ${task.completed
                            ? "text-slate-500 line-through"
                            : "text-slate-900 dark:text-slate-100"
                        }`}
                >
                    {task.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {task.category}
                    </span>

                    <span className="text-sm font-medium text-amber-600">
                        +{task.points} XP
                    </span>

                    {task.reminderAt && (
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            Reminder: {new Date(task.reminderAt).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                {task.completed ? (
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                        Done
                    </span>
                ) : (
                    <button
                        onClick={() => onComplete(task.id)}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                    >
                        Complete
                    </button>
                )}
                <button
                    onClick={() => onEdit(task)}
                    className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-400"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;