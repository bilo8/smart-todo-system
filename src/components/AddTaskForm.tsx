import { useState } from "react";
import {
  ClipboardPen,
  ChevronDown,
  Calendar,
} from "lucide-react";

import type { TaskCategory } from "../types/task";

interface AddTaskFormProps {
  onAddTask: (
    title: string,
    category: TaskCategory,
    points: number,
    reminderAt?: string
  ) => void;
}

const categories: {
  value: TaskCategory;
  icon: string;
}[] = [
    { value: "Study", icon: "📚" },
    { value: "Gym", icon: "💪" },
    { value: "Personal", icon: "🌱" },
    { value: "Work", icon: "💼" },
  ];

function AddTaskForm({
  onAddTask,
}: AddTaskFormProps) {
  const [title, setTitle] = useState("");

  const [category, setCategory] =
    useState<TaskCategory>("Study");

  const [points, setPoints] = useState(10);

  const [reminderAt, setReminderAt] =
    useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTask(
      title,
      category,
      points,
      reminderAt || undefined
    );

    setTitle("");
    setCategory("Study");
    setPoints(10);
    setReminderAt("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
          <ClipboardPen size={34} />
        </div>

        <div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white">
            Add New Task
          </h3>

          <p className="mt-1 text-lg text-slate-500 dark:text-slate-400">
            Plan your work and stay productive.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <label className="mb-3 block text-sm font-black text-slate-700 dark:text-slate-300">
            Task Title
          </label>

          <input
            type="text"
            placeholder="What do you want to accomplish?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-5 text-xl font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-white/10"
          />
        </div>

        <div className="lg:col-span-3">
          <label className="mb-3 block text-sm font-black text-slate-700 dark:text-slate-300">
            Category
          </label>

          <div className="relative">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as TaskCategory)
              }
              className="w-full appearance-none rounded-3xl border border-slate-300 bg-slate-50 px-5 py-5 text-xl font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
            >
              {categories.map((categoryItem) => (
                <option
                  key={categoryItem.value}
                  value={categoryItem.value}
                  className="bg-slate-900"
                >
                  {categoryItem.icon} {categoryItem.value}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
              <ChevronDown size={22} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <label className="mb-3 block text-sm font-black text-slate-700 dark:text-slate-300">
            Points
          </label>

          <input
            type="number"
            min="1"
            value={points}
            onChange={(e) =>
              setPoints(Number(e.target.value))
            }
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-5 text-xl font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
          />
        </div>

        <div className="lg:col-span-3">
          <label className="mb-3 block text-sm font-black text-slate-700 dark:text-slate-300">
            Reminder
          </label>

          <div className="relative">
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
              <Calendar size={22} />
            </div>

            <input
              type="datetime-local"
              value={reminderAt}
              onChange={(e) =>
                setReminderAt(e.target.value)
              }
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-5 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
            />
          </div>
        </div>
      </div>

      <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5 text-2xl font-black text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20">
        + Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;