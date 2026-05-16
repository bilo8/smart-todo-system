import type { Achievement } from "../types/achievement";

interface AchievementsProps {
  achievements: Achievement[];
}

function Achievements({ achievements }: AchievementsProps) {
  const unlockedCount = achievements.filter(
    (achievement) => achievement.unlocked
  ).length;

  return (
    <section className="mt-10 rounded-3xl border border-white/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black">Achievements & Badges</h2>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Unlock rewards as you build better habits.
          </p>
        </div>

        <div className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
          🏆 {unlockedCount}/{achievements.length} Unlocked
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative overflow-hidden rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${
              achievement.unlocked
                ? "border-amber-300 bg-gradient-to-br from-amber-50 to-white dark:border-amber-500/50 dark:from-amber-900/20 dark:to-slate-900"
                : "border-slate-200 bg-slate-50 opacity-70 dark:border-slate-700 dark:bg-slate-800"
            }`}
          >
            <div className="absolute right-4 top-4 text-4xl opacity-10">
              {achievement.icon}
            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
                achievement.unlocked
                  ? "bg-amber-100 dark:bg-amber-900/40"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              {achievement.icon}
            </div>

            <h3 className="mt-4 text-lg font-black">{achievement.title}</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {achievement.description}
            </p>

            <div
              className={`mt-4 inline-flex rounded-2xl px-3 py-1 text-sm font-bold ${
                achievement.unlocked
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                  : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              }`}
            >
              {achievement.unlocked ? "Unlocked" : "Locked"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Achievements;