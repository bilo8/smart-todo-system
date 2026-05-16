import type { Task } from "../types/task";

interface DeleteTaskModalProps {
  task: Task;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteTaskModal({ task, onCancel, onConfirm }: DeleteTaskModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-6 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl dark:bg-red-900/40">
          🗑️
        </div>

        <h2 className="mt-6 text-3xl font-black text-slate-900 dark:text-white">
          Delete Task?
        </h2>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Are you sure you want to delete this task?
        </p>

        <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-left dark:bg-slate-800">
          <p className="font-bold text-slate-900 dark:text-white">
            {task.title}
          </p>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {task.category} • {task.points} XP
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-600 px-5 py-3 font-bold text-white shadow-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskModal;