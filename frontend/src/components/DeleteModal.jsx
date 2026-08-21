function DeleteModal({ task, onClose, onConfirm, loading }) {
    if (!task) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">

            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 shadow-xl transition-colors duration-200">

                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Delete Task?
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                        "{task.title}"
                    </span>
                    ?
                </p>

                <p className="mt-2 text-xs text-red-500 dark:text-red-400">
                    This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            rounded-lg
                            border
                            border-slate-200
                            dark:border-slate-700
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-slate-700
                            dark:text-slate-200
                            hover:bg-slate-100
                            dark:hover:bg-slate-700
                            disabled:opacity-50
                            cursor-pointer
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            rounded-lg
                            bg-red-600
                            hover:bg-red-700
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            cursor-pointer
                        "
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteModal;