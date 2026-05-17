import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import WeeklyStats from "../components/WeeklyStats";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import DailySuccessModal from "../components/DailySuccessModal";
import LevelUpModal from "../components/LevelUpModal";

import { motivationMessages } from "../utils/motivationMessages";
import { taskCompletionMessages } from "../utils/taskCompletionMessages";

import type { Task, TaskCategory } from "../types/task";

interface DashboardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function Dashboard({ tasks, setTasks }: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    TaskCategory | "All"
  >("All");

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [dailySuccessMessage, setDailySuccessMessage] = useState<string | null>(
    null
  );
  const [levelUpModalLevel, setLevelUpModalLevel] = useState<number | null>(
    null
  );

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem("streak");
    return saved ? JSON.parse(saved) : 0;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    const intervalId = window.setInterval(() => {
      const now = new Date();

      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          if (
            task.completed ||
            task.reminderSent ||
            !task.reminderAt ||
            new Date(task.reminderAt) > now
          ) {
            return task;
          }

          if (Notification.permission === "granted") {
            new Notification("Task Reminder 🔔", {
              body: task.title,
            });
          }

          toast(`Reminder: ${task.title}`, {
            icon: "🔔",
          });

          return {
            ...task,
            reminderSent: true,
          };
        })
      );
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [setTasks]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const totalPoints = tasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.points, 0);

  const level = Math.floor(totalPoints / 100) + 1;
  const currentLevelXP = totalPoints % 100;

  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  useEffect(() => {
    if (tasks.length === 0) return;

    const allCompleted = tasks.every((task) => task.completed);
    const todayKey = new Date().toISOString().split("T")[0];
    const successShownDate = localStorage.getItem("dailySuccessShownDate");

    if (allCompleted && successShownDate !== todayKey) {
      const randomMessage =
        motivationMessages[
          Math.floor(Math.random() * motivationMessages.length)
        ];

      setDailySuccessMessage(randomMessage);
      localStorage.setItem("dailySuccessShownDate", todayKey);
    }
  }, [tasks]);

  useEffect(() => {
    const savedLevel = Number(localStorage.getItem("lastShownLevel") || "1");

    if (level > savedLevel) {
      setLevelUpModalLevel(level);
      localStorage.setItem("lastShownLevel", level.toString());
    }
  }, [level]);

  const handleCompleteTask = (taskId: number) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);

    if (!taskToComplete || taskToComplete.completed) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );

    setStreak((current) => current + 1);

    const randomMessage =
      taskCompletionMessages[
        Math.floor(Math.random() * taskCompletionMessages.length)
      ];

    toast.success(randomMessage);
  };

  const handleAddTask = (
    title: string,
    category: TaskCategory,
    points: number,
    reminderAt?: string
  ) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      category,
      points,
      completed: false,
      createdAt: new Date().toISOString(),
      reminderAt,
      reminderSent: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);

    toast.success("Task added successfully");
  };

  const handleSaveEditedTask = (updatedTask: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditingTask(null);
    toast.success("Task updated");
  };

  const confirmDeleteTask = () => {
    if (!deletingTask) return;

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== deletingTask.id)
    );

    setDeletingTask(null);
    toast.success("Task deleted");
  };

  return (
    <div>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveEditedTask}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          task={deletingTask}
          onCancel={() => setDeletingTask(null)}
          onConfirm={confirmDeleteTask}
        />
      )}

      {dailySuccessMessage && (
        <DailySuccessModal
          message={dailySuccessMessage}
          onClose={() => setDailySuccessMessage(null)}
        />
      )}

      {levelUpModalLevel && (
        <LevelUpModal
          level={levelUpModalLevel}
          onClose={() => setLevelUpModalLevel(null)}
        />
      )}

      <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
              Productivity Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Smart Productivity To-Do
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Manage tasks, track progress, build streaks, unlock badges, and
              stay motivated every day.
            </p>
          </div>

          <button
            onClick={() => setIsDarkMode((current) => !current)}
            className="rounded-2xl bg-white/20 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/30"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tasks Completed"
          value={`${completedTasks}/${totalTasks}`}
          subtitle="Today progress"
          icon="✅"
          color="bg-green-500"
        />

        <StatsCard
          title="Current Streak"
          value={`${streak} 🔥`}
          subtitle="Keep it alive"
          icon="🔥"
          color="bg-orange-500"
        />

        <StatsCard
          title="Points"
          value={`${totalPoints} XP`}
          subtitle="Total earned"
          icon="⭐"
          color="bg-amber-500"
        />

        <StatsCard
          title="Level"
          value={level.toString()}
          subtitle={`${currentLevelXP}/100 XP to next`}
          icon="🏆"
          color="bg-blue-500"
        />
      </section>

      <WeeklyStats tasks={tasks} />

      <section className="mt-10">
        <div>
          <h2 className="text-3xl font-black">Today&apos;s Tasks</h2>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Organize and complete your daily goals
          </p>
        </div>

        <AddTaskForm onAddTask={handleAddTask} />

        <div className="mt-6 flex flex-wrap gap-3">
          {["All", "Study", "Gym", "Personal", "Work"].map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category as TaskCategory | "All")
              }
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900"
                  : "bg-white text-slate-700 shadow-sm hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="relative overflow-hidden rounded-[32px] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" />

              <div className="relative z-10">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-6xl shadow-inner dark:from-blue-900/30 dark:to-indigo-900/30">
                  🚀
                </div>

                <h3 className="mt-8 text-4xl font-black text-slate-900 dark:text-white">
                  No Tasks Yet
                </h3>

                <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-500 dark:text-slate-400">
                  Start building momentum by adding your first task.
                </p>
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
                onDelete={() => setDeletingTask(task)}
                onEdit={() => setEditingTask(task)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;