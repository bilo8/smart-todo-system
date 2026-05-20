import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("touka");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const user = await loginUser({ username, password });

      const savedProfile = localStorage.getItem("userProfile");

      sessionStorage.setItem(
        "authUser",
        savedProfile ? savedProfile : JSON.stringify(user)
      );
      sessionStorage.setItem("accessToken", user.accessToken);
      sessionStorage.setItem("refreshToken", user.refreshToken);
      toast.success(`Welcome back, ${user.firstName}!`);

      navigate("/");
    } catch {
      toast.error("Login failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 p-6 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/60 bg-white/80 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-2">
        <section className="hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-10 text-white lg:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 text-3xl">
                <Sparkles />
              </div>

              <h1 className="mt-8 text-5xl font-black leading-tight">
                Build better habits every day.
              </h1>

              <p className="mt-5 max-w-md text-lg leading-8 text-blue-100">
                Track tasks, earn XP, unlock badges, and keep your productivity streak alive.
              </p>
            </div>
          </div>
        </section>

        <section className="p-8 md:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Smart Productivity
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
              Welcome Back
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Login to continue managing your daily progress.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Username
              </label>

              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />

                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 py-5 pl-14 pr-5 text-lg font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 py-5 pl-14 pr-5 text-lg font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5 text-xl font-black text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Login;