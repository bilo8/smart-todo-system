import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="mt-2 text-slate-600 dark:text-slate-400">
        This page will be built next.
      </p>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<PlaceholderPage title="Tasks" />} />
        <Route
          path="/analytics"
          element={<PlaceholderPage title="Analytics" />}
        />
        <Route
          path="/achievements"
          element={<PlaceholderPage title="Achievements" />}
        />
        <Route
          path="/settings"
          element={<PlaceholderPage title="Settings" />}
        />
      </Route>
    </Routes>
  );
}

export default App;