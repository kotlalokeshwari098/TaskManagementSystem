import { useState } from "react";

function TaskList({
    tasks,
    onEdit,
    onDelete,
    onComplete
}) {

    // =========================================================
    // DESCRIPTION EXPANSION STATE
    // =========================================================

    const [expandedTasks, setExpandedTasks] = useState({});


    // =========================================================
    // EMPTY STATE
    // =========================================================

    if (tasks.length === 0) {

        return (

            <div className="
                rounded-xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-800
                p-10
                text-center
                shadow-sm
                transition-colors duration-200
            ">

                <h3 className="
                    text-lg
                    font-semibold
                    text-slate-900
                    dark:text-white
                ">

                    No tasks yet

                </h3>


                <p className="
                    mt-1
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                ">

                    Create your first task to get started.

                </p>

            </div>

        );

    }


    // =========================================================
    // STATUS LABEL
    // =========================================================

    const getStatusLabel = (status) => {

        if (status === "todo") {
            return "To Do";
        }

        if (status === "in-progress") {
            return "In Progress";
        }

        if (status === "done") {
            return "Done";
        }

        return status;

    };


    // =========================================================
    // STATUS STYLE
    // =========================================================

    const getStatusStyle = (status) => {

        if (status === "done") {

            return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400";

        }

        if (status === "in-progress") {

            return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400";

        }

        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400";

    };


    // =========================================================
    // PRIORITY STYLE
    // =========================================================

    const getPriorityStyle = (priority) => {

        if (priority === "high") {

            return "text-red-600 dark:text-red-400";

        }

        if (priority === "medium") {

            return "text-amber-600 dark:text-amber-400";

        }

        return "text-emerald-600 dark:text-emerald-400";

    };


    // =========================================================
    // TOGGLE DESCRIPTION
    // =========================================================

    const toggleDescription = (taskId) => {

        setExpandedTasks((prev) => ({

            ...prev,

            [taskId]: !prev[taskId]

        }));

    };


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-800
            shadow-sm
            transition-colors duration-200
        ">

            <div className="overflow-x-auto">

                <table className="
                    w-full
                    min-w-[850px]
                    text-left
                    text-sm
                ">


                    {/* =================================================
                        TABLE HEADER
                    ================================================= */}

                    <thead className="
                        border-b
                        border-slate-200
                        dark:border-slate-700
                        bg-slate-50
                        dark:bg-slate-900/50
                    ">

                        <tr>

                            <th className="
                                px-6
                                py-4
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            ">

                                Task

                            </th>


                            <th className="
                                px-6
                                py-4
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            ">

                                Status

                            </th>


                            <th className="
                                px-6
                                py-4
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            ">

                                Priority

                            </th>


                            <th className="
                                px-6
                                py-4
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            ">

                                Due Date

                            </th>


                            <th className="
                                px-6
                                py-4
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            ">

                                Assignee

                            </th>


                            <th className="
                                px-6
                                py-4
                                text-right
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            ">

                                Actions

                            </th>

                        </tr>

                    </thead>



                    {/* =================================================
                        TASK ROWS
                    ================================================= */}

                    <tbody className="
                        divide-y
                        divide-slate-200
                        dark:divide-slate-700
                    ">

                        {tasks.map((task) => (

                            <tr
                                key={task._id}
                                className="
                                    transition
                                    hover:bg-slate-50
                                    dark:hover:bg-slate-700/40
                                "
                            >


                                {/* =================================================
                                    TASK
                                ================================================= */}

                                <td className="
                                    px-6
                                    py-4
                                    align-top
                                ">

                                    <div className="max-w-md">

                                        <p className="
                                            font-medium
                                            text-slate-900
                                            dark:text-white
                                        ">

                                            {task.title}

                                        </p>


                                        {/* DESCRIPTION */}

                                        {task.description && (

                                            <div className="mt-1">


                                                <p
                                                    className={`
                                                        text-xs
                                                        leading-5
                                                        text-slate-500
                                                        dark:text-slate-400

                                                        ${
                                                            expandedTasks[task._id]
                                                                ? ""
                                                                : "line-clamp-2"
                                                        }
                                                    `}
                                                >

                                                    {task.description}

                                                </p>


                                                {/* READ MORE / LESS */}

                                                {task.description.length > 100 && (

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleDescription(
                                                                task._id
                                                            )
                                                        }
                                                        className="
                                                            mt-1
                                                            text-xs
                                                            font-medium
                                                            text-slate-700
                                                            dark:text-slate-300
                                                            hover:text-slate-900
                                                            dark:hover:text-white
                                                            hover:underline
                                                            cursor-pointer
                                                        "
                                                    >

                                                        {expandedTasks[task._id]
                                                            ? "Read less"
                                                            : "Read more"}

                                                    </button>

                                                )}

                                            </div>

                                        )}

                                    </div>

                                </td>



                                {/* =================================================
                                    STATUS
                                ================================================= */}

                                <td className="
                                    px-6
                                    py-4
                                    align-top
                                ">

                                    <span
                                        className={`
                                            inline-flex
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-medium
                                            ${getStatusStyle(
                                                task.status
                                            )}
                                        `}
                                    >

                                        {getStatusLabel(
                                            task.status
                                        )}

                                    </span>

                                </td>



                                {/* =================================================
                                    PRIORITY
                                ================================================= */}

                                <td className="
                                    px-6
                                    py-4
                                    align-top
                                ">

                                    <span
                                        className={`
                                            font-medium
                                            capitalize
                                            ${getPriorityStyle(
                                                task.priority
                                            )}
                                        `}
                                    >

                                        {task.priority}

                                    </span>

                                </td>



                                {/* =================================================
                                    DUE DATE
                                ================================================= */}

                                <td className="
                                    whitespace-nowrap
                                    px-6
                                    py-4
                                    align-top
                                    text-slate-600
                                    dark:text-slate-400
                                ">

                                    {task.dueDate

                                        ? new Date(
                                            task.dueDate
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )

                                        : "No date"

                                    }

                                </td>



                                {/* =================================================
                                    ASSIGNEE / COLLABORATOR
                                ================================================= */}

                                <td className="
                                    whitespace-nowrap
                                    px-6
                                    py-4
                                    align-top
                                ">

                                    {task.assignedTo ? (

                                        <div className="flex flex-col">

                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800/40 w-fit">

                                                👤 {task.assignedTo.name || task.assignedTo.email}

                                            </span>

                                            {task.user && (
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                                                    by {task.user.name || task.user.email}
                                                </span>
                                            )}

                                        </div>

                                    ) : (

                                        <span className="inline-flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 w-fit">
                                            Personal
                                        </span>

                                    )}

                                </td>



                                {/* =================================================
                                    ACTIONS
                                ================================================= */}

                                <td className="
                                    px-6
                                    py-4
                                    align-top
                                ">

                                    <div className="
                                        flex
                                        justify-end
                                        gap-2
                                        whitespace-nowrap
                                    ">


                                        {/* COMPLETE */}

                                        {task.status !== "done" && (

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onComplete(
                                                        task._id
                                                    )
                                                }
                                                className="
                                                    rounded-lg
                                                    border
                                                    border-emerald-200
                                                    dark:border-emerald-800
                                                    px-3
                                                    py-1.5
                                                    text-xs
                                                    font-medium
                                                    text-emerald-600
                                                    dark:text-emerald-400
                                                    transition
                                                    hover:bg-emerald-50
                                                    dark:hover:bg-emerald-900/30
                                                    cursor-pointer
                                                "
                                            >

                                                ✓ Done

                                            </button>

                                        )}



                                        {/* EDIT */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEdit(task)
                                            }
                                            className="
                                                rounded-lg
                                                border
                                                border-slate-200
                                                dark:border-slate-700
                                                px-3
                                                py-1.5
                                                text-xs
                                                font-medium
                                                text-slate-700
                                                dark:text-slate-200
                                                transition
                                                hover:bg-slate-100
                                                dark:hover:bg-slate-700
                                                cursor-pointer
                                            "
                                        >

                                            Edit

                                        </button>



                                        {/* DELETE */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onDelete(task)
                                            }
                                            className="
                                                rounded-lg
                                                border
                                                border-red-200
                                                dark:border-red-800
                                                px-3
                                                py-1.5
                                                text-xs
                                                font-medium
                                                text-red-600
                                                dark:text-red-400
                                                transition
                                                hover:bg-red-50
                                                dark:hover:bg-red-900/30
                                                cursor-pointer
                                            "
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default TaskList;