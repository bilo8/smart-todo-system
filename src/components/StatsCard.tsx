interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}

function StatsCard({ title, value, subtitle, icon, color }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-20 ${color}`}
      />

      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-800">
          {icon}
        </div>

        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
          {value}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default StatsCard;