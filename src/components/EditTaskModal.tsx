import { useState } from "react";

import type {
  Task,
  TaskCategory,
} from "../types/task";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const categories: TaskCategory[] = [
  "Study",
  "Gym",
  "Personal",
  "Work",
];

function EditTaskModal({
  task,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(
    task.title
  );

  const [category, setCategory] =
    useState<TaskCategory>(task.category);

  const [points, setPoints] = useState(
    task.points
  );

  const [reminderAt, setReminderAt] =
    useState(task.reminderAt || "");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) return;

    onSave({
      ...task,
      title,
      category,
      points,
      reminderAt:
        reminderAt || undefined,
      reminderSent: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl dark:bg-blue-900/40">
            ✏️
          </div>

          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Edit Task
            </h2>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Update task details and
              reminder.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-white/10"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target
                  .value as TaskCategory
              )
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
          >
            {categories.map(
              (categoryItem) => (
                <option
                  key={categoryItem}
                  value={categoryItem}
                  className="bg-slate-900"
                >
                  {categoryItem}
                </option>
              )
            )}
          </select>

          <input
            type="number"
            min="1"
            value={points}
            onChange={(e) =>
              setPoints(
                Number(e.target.value)
              )
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
          />

          <input
            type="datetime-local"
            value={reminderAt}
            onChange={(e) =>
              setReminderAt(
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Cancel
          </button>

          <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-bold text-white shadow-lg transition hover:shadow-xl">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskModal;