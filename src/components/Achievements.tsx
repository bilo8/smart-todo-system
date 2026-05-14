import type { Achievement } from "../types/achievement";

interface AchievementsProps {
  achievements: Achievement[];
}

function Achievements({ achievements }: AchievementsProps) {
  return (
    <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <h2 className="text-2xl font-bold">Achievements & Badges</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`rounded-2xl border p-4 transition ${
              achievement.unlocked
                ? "border-amber-300 bg-amber-50 dark:border-amber-500/50 dark:bg-amber-900/20"
                : "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-700 dark:bg-slate-800"
            }`}
          >
            <div className="text-3xl">{achievement.icon}</div>

            <h3 className="mt-3 font-bold">{achievement.title}</h3>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {achievement.description}
            </p>

            <p className="mt-3 text-sm font-semibold">
              {achievement.unlocked ? "Unlocked" : "Locked"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Achievements;