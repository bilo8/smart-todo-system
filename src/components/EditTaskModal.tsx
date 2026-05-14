import { useState } from "react";
import type { Task, TaskCategory } from "../types/task";

interface EditTaskModalProps {
    task: Task;
    onClose: () => void;
    onSave: (updatedTask: Task) => void;
}

const categories: TaskCategory[] = ["Study", "Gym", "Personal", "Work"];

function EditTaskModal({ task, onClose, onSave }: EditTaskModalProps) {
    const [title, setTitle] = useState(task.title);
    const [category, setCategory] = useState<TaskCategory>(task.category);
    const [points, setPoints] = useState(task.points);
    const [reminderAt, setReminderAt] = useState(task.reminderAt || "");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onSave({
            ...task,
            title,
            category,
            points,
            reminderAt: reminderAt || undefined,
            reminderSent: false,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900"
            >
                <h2 className="text-2xl font-bold">Edit Task</h2>

                <div className="mt-5 space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as TaskCategory)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                    <input
                        type="datetime-local"
                        value={reminderAt}
                        onChange={(e) => setReminderAt(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    >
                        Cancel
                    </button>

                    <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTaskModal;