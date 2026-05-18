export type TaskCategory = "Study" | "Gym" | "Personal" | "Work";

export interface Task {
  id: number;
  title: string;
  category: TaskCategory;
  completed: boolean;
  points: number;
  createdAt: string;
  reminderAt?: string;
  reminderSent?: boolean;
  completedAt?: string;
}