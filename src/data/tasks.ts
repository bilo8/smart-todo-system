import type { Task } from "../types/task";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Study React Hooks",
    category: "Study",
    completed: false,
    points: 20,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Workout at the gym",
    category: "Gym",
    completed: false,
    points: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Read 10 pages",
    category: "Personal",
    completed: true,
    points: 15,
    createdAt: new Date().toISOString(),
  },
];