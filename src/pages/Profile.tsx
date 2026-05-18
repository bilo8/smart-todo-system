import { useState } from "react";
import EditProfileModal from "../components/EditProfileModal";

function Profile() {
    const [isEditing, setIsEditing] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const authUser = JSON.parse(
        sessionStorage.getItem("authUser") || "null"
    );

    const handleProfileSaved = () => {
        setIsEditing(false);
        setRefresh((current) => !current);
    };

    return (

        <div className="space-y-8">
            {isEditing && (
                <EditProfileModal
                    onClose={() =>
                        setIsEditing(false)
                    }
                    onSave={handleProfileSaved}
                />
            )}
            <section className="overflow-hidden rounded-[36px] border border-white/60 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700" />

                <div className="relative px-8 pb-8">
                    <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                            <img
                                src={authUser?.image}
                                alt={authUser?.firstName}
                                className="h-32 w-32 rounded-[32px] border-4 border-white object-cover shadow-2xl dark:border-slate-900"
                            />

                            <div>
                                <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                                    {authUser?.firstName} {authUser?.lastName}
                                </h1>

                                <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
                                    @{authUser?.username}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <div className="rounded-2xl bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                        ✨ Premium User
                                    </div>

                                    <div className="rounded-2xl bg-green-100 px-4 py-2 text-sm font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                        🔥 Productivity Streak
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-800">
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                Email
                            </p>

                            <h3 className="mt-3 text-lg font-black break-all">
                                {authUser?.email}
                            </h3>
                        </div>

                        <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-800">
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                Gender
                            </p>

                            <h3 className="mt-3 text-lg font-black capitalize">
                                {authUser?.gender}
                            </h3>
                        </div>

                        <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-800">
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                Role
                            </p>

                            <h3 className="mt-3 text-lg font-black">
                                Productive Member
                            </h3>
                        </div>

                        <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-800">
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                Account Status
                            </p>

                            <h3 className="mt-3 text-lg font-black text-green-600 dark:text-green-400">
                                Active
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;