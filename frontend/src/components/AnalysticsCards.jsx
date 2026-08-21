function AnalysticsCards({ analytics }) {

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-5 shadow-sm transition-colors duration-200">

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Total Tasks
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {analytics.totalTasks}
                </p>

            </div>


            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-5 shadow-sm transition-colors duration-200">

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Completed
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-emerald-400">
                    {analytics.completedTasks}
                </p>

            </div>


            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-5 shadow-sm transition-colors duration-200">

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-amber-400">
                    {analytics.pendingTasks}
                </p>

            </div>


            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-5 shadow-sm transition-colors duration-200">

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Completion Rate
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-indigo-400">
                    {analytics.completionPercentage}%
                </p>

            </div>

        </div>
    );
}

export default AnalysticsCards;