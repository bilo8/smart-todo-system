interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

function LevelUpModal({
  level,
  onClose,
}: LevelUpModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-[36px] border border-white/20 bg-white text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 p-10 text-white">
          <div className="text-8xl">
            🏆
          </div>

          <h2 className="mt-6 text-5xl font-black">
            Level Up!
          </h2>

          <p className="mt-4 text-2xl font-bold text-yellow-100">
            You reached Level {level}
          </p>
        </div>

        <div className="p-8">
          <p className="text-xl font-bold leading-9 text-slate-700 dark:text-slate-200">
            Your consistency and discipline are paying off.
            Keep pushing forward.
          </p>

          <button
            onClick={onClose}
            className="mt-8 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
          >
            Awesome 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default LevelUpModal;