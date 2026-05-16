interface DailySuccessModalProps {
  message: string;
  onClose: () => void;
}

function DailySuccessModal({
  message,
  onClose,
}: DailySuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-[36px] border border-white/20 bg-white text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-10 text-white">
          <div className="text-7xl">
            🎉
          </div>

          <h2 className="mt-6 text-5xl font-black">
            Day Complete
          </h2>

          <p className="mt-4 text-xl text-blue-100">
            Every task completed successfully.
          </p>
        </div>

        <div className="p-8">
          <p className="text-2xl font-bold leading-10 text-slate-700 dark:text-slate-200">
            {message}
          </p>

          <button
            onClick={onClose}
            className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
          >
            Continue 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default DailySuccessModal;