import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Home() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-200 flex flex-col font-sans">
            {/* Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                    <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        TaskFlow
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        <Link
                            to="/login"
                            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Log in
                        </Link>

                        <Link
                            to="/register"
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-xs"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {/* Hero */}
                <section className="mx-auto max-w-4xl px-4 py-16 sm:py-24 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Simple task management for your daily work.
                    </h1>

                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                        Plan your tasks, set priorities, and track your progress in one clean, distraction-free space.
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-3">
                        <Link
                            to="/register"
                            className="px-6 py-3 text-sm font-semibold rounded-lg bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-xs"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="px-6 py-3 text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            Log In
                        </Link>
                    </div>

                    {/* App Mockup / Card Preview */}
                    <div className="mt-14 max-w-3xl mx-auto text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-xl">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700">
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">Today's Tasks</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">3 of 4 tasks completed</p>
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                                75% Done
                            </span>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                                <div className="flex items-center gap-3">
                                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
                                    <span className="text-slate-800 dark:text-slate-200">Design landing page layout</span>
                                </div>
                                <span className="text-xs font-medium text-red-600 dark:text-red-400">High</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                                <div className="flex items-center gap-3">
                                    <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center"></span>
                                    <span className="text-slate-800 dark:text-slate-200">Connect backend REST endpoints</span>
                                </div>
                                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Medium</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                                <div className="flex items-center gap-3">
                                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
                                    <span className="text-slate-800 dark:text-slate-200">Configure dark mode toggle</span>
                                </div>
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Low</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Practical Features */}
                <section className="border-t border-slate-200 dark:border-slate-800 py-16 bg-white dark:bg-slate-900/40">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Key Features
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Built to keep you organized without extra clutter.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                    Status Organization
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                                    Move tasks between To-Do, In Progress, and Completed states as you work.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                    Due Dates & Priorities
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                                    Set deadlines and priority levels so you always know what requires attention first.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                    Progress Metrics
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                                    Review total task counts and completion percentages on your analytics dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                TaskFlow &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
}

export default Home;
