import {
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AchievementsPage from "./pages/AchievementsPage";

import AppLayout from "./components/AppLayout";
import AppLoader from "./components/AppLoader";
import ProtectedRoute from "./components/ProtectedRoute";

import { initialTasks } from "./data/tasks";

import type { Task } from "./types/task";

function App() {
  const [isLoading, setIsLoading] =
    useState(true);

  const [tasks, setTasks] =
    useState<Task[]>(() => {
      const savedTasks =
        localStorage.getItem(
          "tasks"
        );

      return savedTasks
        ? JSON.parse(savedTasks)
        : initialTasks;
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        setIsLoading(false);
      }, 1200);

    return () =>
      window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleCompleteTask = (
    taskId: number
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            completed: true,
            completedAt: new Date().toISOString(),
          }
          : task
      )
    );
  };

  const handleDeleteTask = (
    taskToDelete: Task
  ) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) =>
          task.id !==
          taskToDelete.id
      )
    );
  };

  const handleEditTask = (
    updatedTask: Task
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/"
          element={
            <Dashboard
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />

        <Route path="/history" element={<History tasks={tasks} />} />

        <Route
          path="/analytics"
          element={
            <Analytics
              tasks={tasks}
            />
          }
        />
        <Route
          path="/achievements"
          element={<AchievementsPage tasks={tasks} />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;