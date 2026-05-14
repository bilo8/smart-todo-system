import { NavLink, Outlet } from "react-router-dom";

function AppLayout() {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `rounded-xl px-4 py-3 font-semibold transition ${isActive
            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        }`;

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto flex max-w-7xl gap-6 p-6">
                <aside className="hidden w-64 shrink-0 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900 md:block">
                    <h1 className="px-4 text-xl font-bold">Smart To-Do</h1>

                    <nav className="mt-6 flex flex-col gap-2">
                        <NavLink to="/" className={linkClass}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/tasks" className={linkClass}>
                            Tasks
                        </NavLink>

                        <NavLink to="/analytics" className={linkClass}>
                            Analytics
                        </NavLink>

                        <NavLink to="/achievements" className={linkClass}>
                            Achievements
                        </NavLink>

                        <NavLink to="/settings" className={linkClass}>
                            Settings
                        </NavLink>
                    </nav>
                </aside>

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;