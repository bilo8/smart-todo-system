import { useState } from "react";
import toast from "react-hot-toast";

interface EditProfileModalProps {
  onClose: () => void;
  onSave: () => void;
}

function EditProfileModal({ onClose, onSave }: EditProfileModalProps) {
  const authUser = JSON.parse(sessionStorage.getItem("authUser") || "null");

  const [firstName, setFirstName] = useState(authUser?.firstName || "");
  const [lastName, setLastName] = useState(authUser?.lastName || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [image, setImage] = useState(authUser?.image || "");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUser = {
      ...authUser,
      firstName,
      lastName,
      email,
      image,
    };

    sessionStorage.setItem("authUser", JSON.stringify(updatedUser));

    toast.success("Profile updated successfully");
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt="Profile preview"
            className="h-20 w-20 rounded-3xl object-cover shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Edit Profile
            </h2>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Update your personal information.
            </p>
          </div>
        </div>



        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-4 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />

        <label className="mt-6 flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-blue-400 bg-blue-50 px-5 py-4 font-bold text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
          Upload Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Cancel
          </button>

          <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-bold text-white shadow-lg hover:shadow-xl">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileModal;