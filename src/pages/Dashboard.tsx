import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import { initialTasks } from "../data/tasks";
import type { Task, TaskCategory } from "../types/task";
import { getTodayDateKey, getYesterdayDateKey } from "../utils/dateUtils";
import WeeklyStats from "../components/WeeklyStats";
import Achievements from "../components/Achievements";
import { calculateAchievements } from "../utils/achievementUtils";
import EditTaskModal from "../components/EditTaskModal";

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [selectedCategory, setSelectedCategory] = useState<
    TaskCategory | "All"
  >("All");

  const [streak, setStreak] = useState<number>(() => {
    const savedStreak = localStorage.getItem("streak");
    return savedStreak ? JSON.parse(savedStreak) : 0;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

          return {
            ...task,
            reminderSent: true,
          };
        })
      );
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const totalTasks = tasks.length;

  const totalPoints = tasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.points, 0);

  const level = Math.floor(totalPoints / 100) + 1;

  const currentLevelXP = totalPoints % 100;

  const progressPercentage = currentLevelXP;
  const achievements = calculateAchievements(tasks, streak);

  useEffect(() => {
    const unlocked = achievements.find((achievement) => achievement.unlocked);

    if (!unlocked) return;

    const shownAchievements = JSON.parse(
      localStorage.getItem("shownAchievements") || "[]"
    ) as string[];

    if (shownAchievements.includes(unlocked.id)) return;

    setLastUnlockedAchievement(`${unlocked.icon} ${unlocked.title}`);

    localStorage.setItem(
      "shownAchievements",
      JSON.stringify([...shownAchievements, unlocked.id])
    );

    setTimeout(() => {
      setLastUnlockedAchievement(null);
    }, 3000);
  }, [achievements]);

  const [lastUnlockedAchievement, setLastUnlockedAchievement] =
    useState<string | null>(null);

  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  const updateStreak = () => {
    const today = getTodayDateKey();
    const yesterday = getYesterdayDateKey();
    const lastActiveDate = localStorage.getItem("lastActiveDate");

    if (lastActiveDate === today) return;

    if (lastActiveDate === yesterday) {
      setStreak((currentStreak) => currentStreak + 1);
    } else {
      setStreak(1);
    }

    localStorage.setItem("lastActiveDate", today);
  };

  const handleCompleteTask = (taskId: number) => {
    updateStreak();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
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
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveEditedTask = (updatedTask: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditingTask(null);
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
        {lastUnlockedAchievement && (
          <div className="fixed right-6 top-6 z-50 rounded-2xl bg-amber-400 px-6 py-4 font-bold text-slate-900 shadow-lg">
            Achievement unlocked: {lastUnlockedAchievement}
          </div>
        )}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Smart Productivity To-Do
            </h1>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage tasks, track progress, build streaks, and stay motivated.
            </p>
          </div>

          <button
            onClick={() => setIsDarkMode((current) => !current)}
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Tasks Completed"
            value={`${completedTasks}/${totalTasks}`}
            subtitle="Today"
          />

          <StatsCard
            title="Current Streak"
            value={`${streak} 🔥`}
            subtitle="Days"
          />

          <StatsCard
            title="Points"
            value={`${totalPoints} XP`}
            subtitle="Level progress"
          />

          <StatsCard
            title="Level"
            value={level.toString()}
            subtitle={`${currentLevelXP}/100 XP to next level`}
          />
        </section>

        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Level Progress</h3>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {currentLevelXP}/100 XP
            </span>
          </div>

          <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Add New Task</h2>

          <AddTaskForm onAddTask={handleAddTask} />
        </section>
        <Achievements achievements={achievements} />
        <WeeklyStats tasks={tasks} />
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Today&apos;s Tasks</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {["All", "Study", "Gym", "Personal", "Work"].map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category as TaskCategory | "All")
                }
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${selectedCategory === category
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-white text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        </section>
      </div>
  );
}

export default Dashboard;