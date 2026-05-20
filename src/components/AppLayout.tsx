import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import MobileNavbar from "./MobileNavbar";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: "🏠",
  },
  {
    to: "/history",
    label: "History",
    icon: "🕒",
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: "📊",
  },
  {
    to: "/achievements",
    label: "Achievements",
    icon: "🏆",
  },
  {
    to: "/settings",
    label: "Settings",
    icon: "⚙️",
  },
];

function AppLayout() {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const authUser = JSON.parse(
    sessionStorage.getItem("authUser") || "null"
  );

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");

    sessionStorage.removeItem("refreshToken")

    sessionStorage.removeItem("authUser");

    navigate("/login");
  };

  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${isActive
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-purple-500/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl gap-6 p-6">
        <aside className="hidden w-72 shrink-0 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 md:block">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white">
            <div className="text-3xl">
              ⚡
            </div>

            <h1 className="mt-3 text-2xl font-black">
              Smart To-Do
            </h1>

            <p className="mt-1 text-sm text-blue-100">
              Build better habits daily.
            </p>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
              >
                <span>
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="relative mt-6">
            <button
              onClick={() =>
                setIsProfileOpen(
                  (current) =>
                    !current
                )
              }
              className="w-full rounded-3xl border border-white/20 bg-white/60 p-4 text-left backdrop-blur transition hover:bg-white/80 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    authUser?.image
                  }
                  alt={
                    authUser?.firstName
                  }
                  className="h-14 w-14 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black text-slate-900 dark:text-white">
                    {
                      authUser?.firstName
                    }{" "}
                    {
                      authUser?.lastName
                    }
                  </h3>

                  <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    @
                    {
                      authUser?.username
                    }
                  </p>
                </div>

                <span className="text-slate-400">
                  {isProfileOpen
                    ? "▲"
                    : "▼"}
                </span>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute left-0 right-0 top-[110%] z-50 rounded-3xl border border-white/20 bg-white/90 p-3 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full rounded-2xl px-4 py-3 text-left font-semibold transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  👤 Profile
                </button>

                <button
                  onClick={
                    handleLogout
                  }
                  className="mt-1 w-full rounded-2xl px-4 py-3 text-left font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50/80 p-4 backdrop-blur dark:bg-slate-800/80">
            <p className="text-sm font-bold">
              Daily Focus
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Complete one important
              task today.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-28 md:pb-0">
          <Outlet />

          <MobileNavbar />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;