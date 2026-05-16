function AppLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-100 dark:bg-slate-950">
      <div className="text-center">
        <div className="mx-auto flex h-24 w-24 animate-pulse items-center justify-center rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-700 text-5xl text-white shadow-2xl">
          ⚡
        </div>

        <h1 className="mt-6 text-4xl font-black text-slate-900 dark:text-white">
          Smart To-Do
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Loading your productivity workspace...
        </p>

        <div className="mx-auto mt-6 h-2 w-64 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-full w-1/2 animate-[loader_1.2s_infinite] rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
        </div>
      </div>
    </div>
  );
}

export default AppLoader;