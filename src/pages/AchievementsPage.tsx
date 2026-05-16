import Achievements from "../components/Achievements";
import { calculateAchievements } from "../utils/achievementUtils";
import type { Task } from "../types/task";

interface AchievementsPageProps {
  tasks: Task[];
}

function AchievementsPage({ tasks }: AchievementsPageProps) {
  const savedStreak = localStorage.getItem("streak");
  const streak = savedStreak ? JSON.parse(savedStreak) : 0;

  const achievements = calculateAchievements(tasks, streak);

  return (
    <div>
      <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          Achievements
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Track your unlocked badges and productivity milestones.
        </p>
      </div>

      <Achievements achievements={achievements} />
    </div>
  );
}

export default AchievementsPage;