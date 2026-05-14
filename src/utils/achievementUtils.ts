import type { Achievement } from "../types/achievement";
import type { Task } from "../types/task";

export function calculateAchievements(
  tasks: Task[],
  streak: number
): Achievement[] {
  const completedTasks = tasks.filter((task) => task.completed);
  const totalPoints = completedTasks.reduce(
    (sum, task) => sum + task.points,
    0
  );

  return [
    {
      id: "first-task",
      title: "First Step",
      description: "Complete your first task",
      icon: "✅",
      unlocked: completedTasks.length >= 1,
    },
    {
      id: "five-tasks",
      title: "Task Crusher",
      description: "Complete 5 tasks",
      icon: "💪",
      unlocked: completedTasks.length >= 5,
    },
    {
      id: "hundred-xp",
      title: "XP Collector",
      description: "Earn 100 XP",
      icon: "⭐",
      unlocked: totalPoints >= 100,
    },
    {
      id: "three-day-streak",
      title: "On Fire",
      description: "Reach a 3-day streak",
      icon: "🔥",
      unlocked: streak >= 3,
    },
    {
      id: "all-done",
      title: "Perfect Day",
      description: "Complete all tasks for today",
      icon: "🏆",
      unlocked: tasks.length > 0 && completedTasks.length === tasks.length,
    },
  ];
}