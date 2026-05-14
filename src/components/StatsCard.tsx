interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
}

function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}

export default StatsCard;