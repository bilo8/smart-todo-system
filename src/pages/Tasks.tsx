import { useMemo, useState } from "react";

import TaskCard from "../components/TaskCard";

import type {
    Task,
    TaskCategory,
} from "../types/task";

interface TasksProps {
    tasks: Task[];
    onComplete: (taskId: number) => void;
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
}

function Tasks({
    tasks,
    onComplete,
    onDelete,
    onEdit,
}: TasksProps) {
    const [search, setSearch] =
        useState("");

    const [
        selectedCategory,
        setSelectedCategory,
    ] = useState<
        TaskCategory | "All"
    >("All");

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesCategory =
                selectedCategory === "All"
                    ? true
                    : task.category ===
                    selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        tasks,
        search,
        selectedCategory,
    ]);

    return (
        <div className="space-y-8">
            <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                    Tasks Manager
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Search, filter, and manage
                    all your tasks.
                </p>

                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search tasks..."
                        className="rounded-3xl border border-slate-300 bg-slate-50 px-5 py-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(e.target.value as TaskCategory | "All")
                        }
                        className="rounded-3xl border border-slate-300 bg-slate-50 px-5 py-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-white/10"
                    >
                        <option value="All" className="bg-white text-slate-900">
                            All Categories
                        </option>

                        <option value="Study" className="bg-white text-slate-900">
                            Study
                        </option>

                        <option value="Gym" className="bg-white text-slate-900">
                            Gym
                        </option>

                        <option value="Personal" className="bg-white text-slate-900">
                            Personal
                        </option>

                        <option value="Work" className="bg-white text-slate-900">
                            Work
                        </option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filteredTasks.length ===
                    0 ? (
                    <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
                        <div className="text-7xl">
                            📭
                        </div>

                        <h2 className="mt-6 text-4xl font-black">
                            No Tasks Found
                        </h2>

                        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
                            Try changing filters or
                            search keywords.
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onComplete={
                                onComplete
                            }
                            onDelete={
                                onDelete
                            }
                            onEdit={onEdit}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Tasks;