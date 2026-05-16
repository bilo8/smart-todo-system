import { useState } from "react";
import toast from "react-hot-toast";

function Settings() {
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetData = () => {
    localStorage.removeItem("tasks");
    localStorage.removeItem("streak");

    toast.success("All productivity data reset");

    window.location.reload();
  };
  return (

    <div>
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl dark:bg-red-900/40">
              ⚠️
            </div>

            <h2 className="mt-6 text-center text-3xl font-black text-slate-900 dark:text-white">
              Reset Everything?
            </h2>

            <p className="mt-3 text-center text-slate-500 dark:text-slate-400">
              This will permanently delete all tasks, XP, streaks, and analytics.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                Cancel
              </button>

              <button
                onClick={handleResetData}
                className="rounded-2xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Customize your productivity experience.
        </p>

        <div className="mt-8 grid gap-5">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-black">
              Notifications
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Browser reminders are enabled for your tasks.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-black">
              Productivity Tips
            </h2>

            <ul className="mt-3 space-y-2 text-slate-500 dark:text-slate-400">
              <li>• Focus on 3 important tasks daily</li>
              <li>• Keep your streak alive</li>
              <li>• Break large goals into smaller tasks</li>
              <li>• Use reminders consistently</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-red-200 bg-red-50 p-5 dark:border-red-900/40 dark:bg-red-900/10">
            <h2 className="text-xl font-black text-red-600 dark:text-red-400">
              Danger Zone
            </h2>

            <p className="mt-2 text-red-500 dark:text-red-300">
              Reset all tasks, XP, streaks, and productivity statistics.
            </p>

            <button
              onClick={() => setShowResetModal(true)}
              className="mt-5 rounded-2xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;