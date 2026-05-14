import { useState } from "react";
import type { TaskCategory } from "../types/task";

interface AddTaskFormProps {
  onAddTask: (
    title: string,
    category: TaskCategory,
    points: number,
    reminderAt?: string
  ) => void;
}

const categories: TaskCategory[] = [
  "Study",
  "Gym",
  "Personal",
  "Work",
];

function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<TaskCategory>("Study");
  const [points, setPoints] = useState(10);
  const [reminderAt, setReminderAt] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTask(title, category, points, reminderAt || undefined);
    setReminderAt("");

    setTitle("");
    setCategory("Study");
    setPoints(10);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 grid gap-3 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900 md:grid-cols-5"
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as TaskCategory)
        }
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        {categories.map((categoryItem) => (
          <option key={categoryItem} value={categoryItem}>
            {categoryItem}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />

      <input
        type="datetime-local"
        value={reminderAt}
        onChange={(e) => setReminderAt(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />

      <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;