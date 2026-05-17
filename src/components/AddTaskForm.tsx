import { useState } from "react";

import {
  ClipboardPen,
  ChevronDown,
} from "lucide-react";

import type {
  TaskCategory,
} from "../types/task";

interface AddTaskFormProps {
  onAddTask: (
    title: string,
    category: TaskCategory,
    points: number,
    reminderAt?: string
  ) => void;
}

function AddTaskForm({
  onAddTask,
}: AddTaskFormProps) {
  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState<TaskCategory>(
      "Study"
    );

  const [points, setPoints] =
    useState(10);

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
      className="mt-8 overflow-hidden rounded-[36px] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
            <ClipboardPen
              size={34}
            />
          </div>

          <div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Add New Task
            </h2>

            <p className="mt-2 text-xl text-slate-500 dark:text-slate-400">
              Plan your work and stay
              productive.
            </p>
          </div>
        </div>

        <div className="hidden text-7xl opacity-20 lg:block">
          ✨
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <label className="mb-3 block text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Task Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="What do you want to accomplish?"
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-5 text-lg font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-white/10"
          />
        </div>

        <div className="lg:col-span-3">
          <label className="mb-3 block text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Category
          </label>

          <div className="relative">
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target
                    .value as TaskCategory
                )
              }
              className="w-full appearance-none rounded-3xl border border-slate-300 bg-slate-50 px-5 py-5 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
            >
              <option
                value="Study"
                className="bg-white text-slate-900"
              >
                📚 Study
              </option>

              <option
                value="Gym"
                className="bg-white text-slate-900"
              >
                💪 Gym
              </option>

              <option
                value="Personal"
                className="bg-white text-slate-900"
              >
                🌱 Personal
              </option>

              <option
                value="Work"
                className="bg-white text-slate-900"
              >
                💼 Work
              </option>
            </select>

            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
              <ChevronDown
                size={22}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <label className="mb-3 block text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Points (XP)
          </label>

          <input
            type="number"
            min="1"
            value={points}
            onChange={(e) =>
              setPoints(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-5 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
          />
        </div>

        <div className="lg:col-span-3">
          <label className="mb-3 block text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Reminder
          </label>

          <input
            type="datetime-local"
            value={reminderAt}
            onChange={(e) =>
              setReminderAt(e.target.value)
            }
            className="w-full cursor-pointer rounded-3xl border border-slate-300 bg-white px-5 py-5 text-lg font-semibold text-slate-900 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/10"
          />
        </div>
      </div>

      <button className="mt-8 w-full rounded-[28px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-5 text-2xl font-black text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.45)]">
        + Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;