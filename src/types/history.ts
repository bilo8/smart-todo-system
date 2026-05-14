import type { TaskCategory } from "./task";

export interface TaskHistoryItem {
  id: number;
  title: string;
  category: TaskCategory;
  points: number;
  completedAt: string;
}