import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import AnalysticsCards from "../components/AnalysticsCards";
import AnalyticsChart from "../components/AnalyticsChart";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";

import api from "../services/api";
import toast from "react-hot-toast";




function Dashboard() {



    const [analytics, setAnalytics] = useState(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [analyticsError, setAnalyticsError] = useState("");


  

    const [tasks, setTasks] = useState([]);
    const [tasksLoading, setTasksLoading] = useState(true);
    const [tasksError, setTasksError] = useState("");



    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);


   

    const [taskToDelete, setTaskToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);


    // =========================
    // PAGINATION
    // =========================

    const [page, setPage] = useState(1);

    const [limit] = useState(5);

    const [totalPages, setTotalPages] = useState(1);

    const [totalTasks, setTotalTasks] = useState(0);


    // =========================
    // SORTING
    // =========================

    const [sortBy, setSortBy] = useState("createdAt");

    const [order, setOrder] = useState("desc");


    const fetchAnalytics = async () => {

        try {

            setAnalyticsLoading(true);
            setAnalyticsError("");

            const response = await api.get("/tasks/analytics");


            setAnalytics(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch analytics:",
                error
            );

            setAnalyticsError(
                error.response?.data?.message ||
                "Failed to load analytics"
            );

        } finally {

            setAnalyticsLoading(false);

        }
    };


    const fetchTasks = async () => {

        try {

            setTasksLoading(true);
            setTasksError("");

            const response = await api.get("/tasks", {

                params: {
                    page,
                    limit,
                    sortBy,
                    order
                }

            });

            setTasks(response.data.tasks);

            setTotalPages(response.data.totalPages);

            setTotalTasks(response.data.total);

        } catch (error) {

            console.error(
                "Failed to fetch tasks:",
                error
            );

            setTasksError(
                error.response?.data?.message ||
                "Failed to load tasks"
            );

        } finally {

            setTasksLoading(false);

        }
    };



    useEffect(() => {

        fetchAnalytics();

    }, []);


   

    useEffect(() => {

        fetchTasks();

    }, [page, sortBy, order]);


    const handleTaskCreated = async () => {

        setShowTaskForm(false);

        // Go back to first page
        setPage(1);

        // Refresh analytics
        await fetchAnalytics();

        // Fetch task list
        await fetchTasks();

    };


    const handleEditTask = (task) => {

        setTaskToEdit(task);

    };


   
    const handleTaskUpdated = async () => {

        setTaskToEdit(null);

        await fetchTasks();

        await fetchAnalytics();

    };


   
    const handleDeleteTask = (task) => {

        setTaskToDelete(task);

    };


    const confirmDeleteTask = async () => {

        if (!taskToDelete) {
            return;
        }

        try {

            setDeleteLoading(true);

            await api.delete(
                `/tasks/${taskToDelete._id}`
            );

            setTaskToDelete(null);
            toast.success("Task deleted successfully!");

            // Refresh tasks
            await fetchTasks();

            // Refresh analytics
            await fetchAnalytics();

        } catch (error) {

            console.error(
                "Failed to delete task:",
                error
            );

            toast.error("Failed to delete task");

        } finally {

            setDeleteLoading(false);

        }

    };


    const handleCompleteTask = async (taskId) => {

        try {

            await api.patch(
                `/tasks/${taskId}/complete`
            );

            toast.success("Task marked as completed!");

            // Refresh task list
            await fetchTasks();

            // Refresh analytics
            await fetchAnalytics();

        } catch (error) {

            console.error(
                "Failed to complete task:",
                error
            );

           
            toast.error( error.response?.data?.message ||"Failed to delete task");

        }

    };


  
    const handleSortChange = (value) => {

        setSortBy(value);

        // Whenever sorting changes,
        // go back to page 1.
        setPage(1);

    };


    const handleOrderChange = () => {

        setOrder(
            order === "asc"
                ? "desc"
                : "asc"
        );

        setPage(1);

    };


    
    const handlePageChange = (newPage) => {

        if (
            newPage < 1 ||
            newPage > totalPages
        ) {
            return;
        }

        setPage(newPage);

    };


    if (analyticsLoading) {

        return (

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">

                <Navbar />

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    <div className="animate-pulse">

                        <div className="mb-8 h-8 w-48 rounded bg-slate-200 dark:bg-slate-700" />

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <div className="h-28 rounded-xl bg-slate-200 dark:bg-slate-700" />

                            <div className="h-28 rounded-xl bg-slate-200 dark:bg-slate-700" />

                            <div className="h-28 rounded-xl bg-slate-200 dark:bg-slate-700" />

                            <div className="h-28 rounded-xl bg-slate-200 dark:bg-slate-700" />

                        </div>

                    </div>

                </main>

            </div>

        );

    }


    if (analyticsError) {

        return (

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">

                <Navbar />

                <main className="mx-auto max-w-7xl px-4 py-8">

                    <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 p-4 text-red-600 dark:text-red-400">

                        {analyticsError}

                    </div>

                </main>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">

            <Navbar />


            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


                {/* header */}

                <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">

                            Dashboard

                        </h1>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                            Manage your tasks and stay productive.

                        </p>

                    </div>

                    <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={() => setShowTaskForm(true)}
                        className="
                            rounded-lg
                            bg-slate-900
                            dark:bg-indigo-600
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-slate-700
                            dark:hover:bg-indigo-500
                            cursor-pointer
                        "
                    >

                        + New Task

                    </button>
                    </div>

                </section>



                {/*  ANALYTICS */}

                <section className="mb-10">

                    <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">

                        Analytics

                    </h2>


                    <AnalysticsCards
                        analytics={analytics}
                    />

                </section>



                {/* ANALYTICS CHART */}

                <section className="mb-10">

                    <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">

                        Task Overview

                    </h2>


                    <div className="
                        rounded-xl
                        border
                        border-slate-200
                        dark:border-slate-800
                        bg-white
                        dark:bg-slate-800
                        p-5
                        shadow-sm
                    ">

                        <AnalyticsChart
                            analytics={analytics}
                        />

                    </div>

                </section>



                {/* TASK SECTION*/}

                <section>


                    {/* TASK HEADER + SORTING */}

                    <div className="
                        mb-4
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">


                        <div>

                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">

                                My Tasks

                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                                {totalTasks} total task
                                {totalTasks !== 1 ? "s" : ""}

                            </p>

                        </div>



                        {/* SORT CONTROLS */}

                        <div className="flex items-center gap-2">


                            <label
                                htmlFor="sortTasks"
                                className="text-sm text-slate-500 dark:text-slate-400"
                            >

                                Sort by

                            </label>


                            <select
                                id="sortTasks"
                                value={sortBy}
                                onChange={(e) =>
                                    handleSortChange(
                                        e.target.value
                                    )
                                }
                                className="
                                    rounded-lg
                                    border
                                    border-slate-200
                                    dark:border-slate-700
                                    bg-white
                                    dark:bg-slate-800
                                    px-3
                                    py-2
                                    text-sm
                                    text-slate-700
                                    dark:text-slate-200
                                    outline-none
                                    focus:border-slate-400
                                    dark:focus:border-slate-500
                                "
                            >

                                <option value="createdAt">

                                    Created Date

                                </option>


                                <option value="dueDate">

                                    Due Date

                                </option>


                                <option value="priority">

                                    Priority

                                </option>

                            </select>


                            <button
                                type="button"
                                onClick={handleOrderChange}
                                className="
                                    rounded-lg
                                    border
                                    border-slate-200
                                    dark:border-slate-700
                                    bg-white
                                    dark:bg-slate-800
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    dark:text-slate-200
                                    hover:bg-slate-100
                                    dark:hover:bg-slate-700
                                    cursor-pointer
                                "
                                title={
                                    order === "asc"
                                        ? "Ascending"
                                        : "Descending"
                                }
                            >

                                {order === "asc"
                                    ? "↑"
                                    : "↓"}

                            </button>

                        </div>

                    </div>



                    {/* TASK LOADING*/}

                    {tasksLoading ? (

                        <div className="space-y-3">

                            {[1, 2, 3, 4, 5].map(
                                (item) => (

                                    <div
                                        key={item}
                                        className="
                                            h-20
                                            animate-pulse
                                            rounded-xl
                                            bg-slate-200
                                            dark:bg-slate-700
                                        "
                                    />

                                )
                            )}

                        </div>

                    ) : tasksError ? (


                        /* TASK ERROR */

                        <div className="
                            rounded-xl
                            border
                            border-red-200
                            dark:border-red-800
                            bg-red-50
                            dark:bg-red-900/30
                            p-4
                            text-sm
                            text-red-600
                        ">

                            {tasksError}

                        </div>


                    ) : (


                        /* TASK LIST*/

                        <>

                            <TaskList
                                tasks={tasks}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onComplete={handleCompleteTask}
                            />


                            {/* PAGINATION */}

                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />

                        </>

                    )}

                </section>

            </main>



            {showTaskForm && (

                <TaskForm

                    onClose={() =>
                        setShowTaskForm(false)
                    }

                    onTaskCreated={
                        handleTaskCreated
                    }

                />

            )}


            {taskToEdit && (

                <TaskForm

                    taskToEdit={taskToEdit}

                    onClose={() =>
                        setTaskToEdit(null)
                    }

                    onTaskUpdated={
                        handleTaskUpdated
                    }

                />

            )}

            {taskToDelete && (

                <DeleteModal

                    task={taskToDelete}

                    onClose={() =>
                        setTaskToDelete(null)
                    }

                    onConfirm={
                        confirmDeleteTask
                    }

                    loading={deleteLoading}

                />

            )}

        </div>

    );
}


export default Dashboard;