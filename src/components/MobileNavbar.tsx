import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/tasks", label: "Tasks", icon: "✅" },
  { to: "/analytics", label: "Stats", icon: "📊" },
  { to: "/achievements", label: "Awards", icon: "🏆" },
];

function MobileNavbar() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 md:hidden">
      <div className="flex items-center justify-around rounded-3xl border border-white/20 bg-white/80 p-3 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-xs font-bold transition ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default MobileNavbar;