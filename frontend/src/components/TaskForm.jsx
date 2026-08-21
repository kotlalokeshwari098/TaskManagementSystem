import { useEffect, useState } from "react";
import api from "../services/api";

function TaskForm({
    onClose,
    onTaskCreated,
    taskToEdit,
    onTaskUpdated
}) {

    const isEditMode = Boolean(taskToEdit);


    // =========================
    // FORM STATE
    // =========================

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
        assignedTo: ""
    });

    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    // =========================
    // FETCH USERS FOR ASSIGNMENT
    // =========================

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/auth/users");
                setUsers(response.data.users || []);
            } catch (error) {
                console.error("Failed to fetch users list:", error);
            }
        };
        fetchUsers();
    }, []);

    // =========================
    // EDIT MODE
    // =========================

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title || "",
                description: taskToEdit.description || "",
                status: taskToEdit.status || "todo",
                priority: taskToEdit.priority || "medium",
                assignedTo: taskToEdit.assignedTo?._id || taskToEdit.assignedTo || "",
                dueDate: taskToEdit.dueDate
                    ? new Date(taskToEdit.dueDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
            });
        }
    }, [taskToEdit]);


    // =========================
    // TODAY'S DATE
    // =========================

    const today = new Date()
        .toISOString()
        .split("T")[0];


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));


        // Remove error when user starts fixing it

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));


        setServerError("");

    };


    // =========================
    // VALIDATION
    // =========================

    const validateForm = () => {

        const newErrors = {};


        // TITLE

        if (!formData.title.trim()) {

            newErrors.title =
                "Task title is required.";

        }


        // TITLE LENGTH

        else if (formData.title.trim().length < 3) {

            newErrors.title =
                "Title must be at least 3 characters.";

        }


        // STATUS

        if (!formData.status) {

            newErrors.status =
                "Please select a status.";

        }


        // PRIORITY

        if (!formData.priority) {

            newErrors.priority =
                "Please select a priority.";

        }


        // DUE DATE

        if (!formData.dueDate) {

            newErrors.dueDate =
                "Please select a due date.";

        }


        // DATE CANNOT BE BEFORE TODAY

        else if (formData.dueDate < today) {

            newErrors.dueDate =
                "Due date cannot be before today.";

        }


        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;

    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Validate before API call

        const isValid = validateForm();


        if (!isValid) {

            return;

        }


        try {

            setLoading(true);

            setServerError("");


            if (isEditMode) {

                // =========================
                // UPDATE
                // =========================

                await api.put(
                    `/tasks/${taskToEdit._id}`,
                    formData
                );


                if (onTaskUpdated) {

                    onTaskUpdated();

                }

            } else {

                // =========================
                // CREATE
                // =========================

                await api.post(
                    "/tasks",
                    formData
                );


                if (onTaskCreated) {

                    onTaskCreated();

                }

            }

        } catch (error) {

            console.error(
                "Failed to save task:",
                error
            );


            setServerError(
                error.response?.data?.message ||
                "Failed to save task."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-xs
            px-4
        ">


            <div className="
                w-full
                max-w-lg
                rounded-2xl
                bg-white
                dark:bg-slate-800
                border
                border-slate-100
                dark:border-slate-700
                p-6
                shadow-xl
                transition-colors duration-200
            ">


                {/* =========================
                    HEADER
                ========================= */}

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">

                            {isEditMode
                                ? "Edit Task"
                                : "Create Task"}

                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                            {isEditMode
                                ? "Update your task details."
                                : "Add a new task to your list."}

                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            text-slate-400
                            hover:bg-slate-100
                            dark:hover:bg-slate-700
                            hover:text-slate-600
                            dark:hover:text-slate-200
                            cursor-pointer
                        "
                    >

                        ✕

                    </button>

                </div>



                {/* =========================
                    SERVER ERROR
                ========================= */}

                {serverError && (

                    <div className="
                        mb-4
                        rounded-lg
                        border
                        border-red-200
                        dark:border-red-800
                        bg-red-50
                        dark:bg-red-900/30
                        px-4
                        py-3
                        text-sm
                        text-red-600
                        dark:text-red-400
                    ">

                        {serverError}

                    </div>

                )}



                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >


                    {/* =========================
                        TITLE
                    ========================= */}

                    <div>

                        <label className="
                            mb-1.5
                            block
                            text-sm
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        ">

                            Title
                            <span className="text-red-500">
                                *
                            </span>

                        </label>


                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            className={`
                                w-full
                                rounded-lg
                                border
                                bg-white
                                dark:bg-slate-700
                                text-slate-900
                                dark:text-white
                                placeholder-slate-400
                                px-3
                                py-2.5
                                text-sm
                                outline-none

                                ${
                                    errors.title
                                        ? "border-red-400 focus:border-red-500"
                                        : "border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-indigo-500"
                                }
                            `}
                        />


                        {errors.title && (

                            <p className="mt-1 text-xs text-red-500">

                                {errors.title}

                            </p>

                        )}

                    </div>



                    {/* =========================
                        DESCRIPTION
                    ========================= */}

                    <div>

                        <label className="
                            mb-1.5
                            block
                            text-sm
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        ">

                            Description

                        </label>


                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter task description"
                            rows={3}
                            className="
                                w-full
                                resize-none
                                rounded-lg
                                border
                                border-slate-200
                                dark:border-slate-600
                                bg-white
                                dark:bg-slate-700
                                text-slate-900
                                dark:text-white
                                placeholder-slate-400
                                px-3
                                py-2.5
                                text-sm
                                outline-none
                                focus:border-slate-400
                                dark:focus:border-indigo-500
                            "
                        />

                    </div>



                    {/* =========================
                        STATUS + PRIORITY
                    ========================= */}

                    <div className="
                        grid
                        gap-4
                        sm:grid-cols-2
                    ">


                        {/* STATUS */}

                        <div>

                            <label className="
                                mb-1.5
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                dark:text-slate-300
                            ">

                                Status
                                <span className="text-red-500">
                                    *
                                </span>

                            </label>


                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-slate-200
                                    dark:border-slate-600
                                    bg-white
                                    dark:bg-slate-700
                                    text-slate-900
                                    dark:text-white
                                    px-3
                                    py-2.5
                                    text-sm
                                    outline-none
                                    focus:border-slate-400
                                    dark:focus:border-indigo-500
                                "
                            >

                                <option value="todo">
                                    To Do
                                </option>

                                <option value="in-progress">
                                    In Progress
                                </option>

                                <option value="done">
                                    Done
                                </option>

                            </select>


                            {errors.status && (

                                <p className="mt-1 text-xs text-red-500">

                                    {errors.status}

                                </p>

                            )}

                        </div>



                        {/* PRIORITY */}

                        <div>

                            <label className="
                                mb-1.5
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                dark:text-slate-300
                            ">

                                Priority
                                <span className="text-red-500">
                                    *
                                </span>

                            </label>


                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-slate-200
                                    dark:border-slate-600
                                    bg-white
                                    dark:bg-slate-700
                                    text-slate-900
                                    dark:text-white
                                    px-3
                                    py-2.5
                                    text-sm
                                    outline-none
                                    focus:border-slate-400
                                    dark:focus:border-indigo-500
                                "
                            >

                                <option value="low">
                                    Low
                                </option>

                                <option value="medium">
                                    Medium
                                </option>

                                <option value="high">
                                    High
                                </option>

                            </select>


                            {errors.priority && (

                                <p className="mt-1 text-xs text-red-500">

                                    {errors.priority}

                                </p>

                            )}

                        </div>

                    </div>


                    {/* =========================
                        ASSIGN TO (COLLABORATOR)
                    ========================= */}

                    <div>

                        <label className="
                            mb-1.5
                            block
                            text-sm
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        ">

                            Assign To (Collaborator)

                        </label>


                        <select
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            className="
                                w-full
                                rounded-lg
                                border
                                border-slate-200
                                dark:border-slate-600
                                bg-white
                                dark:bg-slate-700
                                text-slate-900
                                dark:text-white
                                px-3
                                py-2.5
                                text-sm
                                outline-none
                                focus:border-slate-400
                                dark:focus:border-indigo-500
                            "
                        >

                            <option value="">
                                Personal (Only Me)
                            </option>

                            {users.map((user) => (

                                <option key={user._id} value={user._id}>
                                    {user.name} ({user.email})
                                </option>

                            ))}

                        </select>

                    </div>



                    {/* =========================
                        DUE DATE
                    ========================= */}

                    <div>

                        <label className="
                            mb-1.5
                            block
                            text-sm
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        ">

                            Due Date
                            <span className="text-red-500">
                                *
                            </span>

                        </label>


                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            min={today}
                            className={`
                                w-full
                                rounded-lg
                                border
                                bg-white
                                dark:bg-slate-700
                                text-slate-900
                                dark:text-white
                                px-3
                                py-2.5
                                text-sm
                                outline-none

                                ${
                                    errors.dueDate
                                        ? "border-red-400 focus:border-red-500"
                                        : "border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-indigo-500"
                                }
                            `}
                        />


                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-400">

                            Due date must be today or a future date.

                        </p>


                        {errors.dueDate && (

                            <p className="mt-1 text-xs text-red-500">

                                {errors.dueDate}

                            </p>

                        )}

                    </div>



                    {/* =========================
                        BUTTONS
                    ========================= */}

                    <div className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-slate-100
                        dark:border-slate-700
                        pt-5
                    ">

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
                                py-2.5
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
                            type="submit"
                            disabled={loading}
                            className="
                                rounded-lg
                                bg-slate-900
                                dark:bg-indigo-600
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                                hover:bg-slate-700
                                dark:hover:bg-indigo-500
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                cursor-pointer
                            "
                        >

                            {loading
                                ? "Saving..."
                                : isEditMode
                                    ? "Update Task"
                                    : "Create Task"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default TaskForm;