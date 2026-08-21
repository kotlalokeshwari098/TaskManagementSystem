const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            dueDate,
            assignedTo
        } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }
        if (!dueDate) {
            return res.status(400).json({
                message: "Due date is required"
            });
        }

        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return res.status(400).json({
                message: "Due date cannot be before today"
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user.userId,
            assignedTo: assignedTo || null
        });

        const populatedTask = await Task.findById(task._id)
            .populate("user", "name email")
            .populate("assignedTo", "name email");

        res.status(201).json({
            message: "Task created successfully",
            task: populatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            $or: [
                { user: req.user.userId },
                { assignedTo: req.user.userId }
            ]
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found or unauthorized"
            });
        }

        const { title, description, status, priority, dueDate, assignedTo } = req.body;

        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.status = status ?? task.status;
        task.priority = priority ?? task.priority;
        task.dueDate = dueDate ?? task.dueDate;
        
        if (assignedTo !== undefined) {
            task.assignedTo = assignedTo || null;
        }

        await task.save();

        const updatedTask = await Task.findById(task._id)
            .populate("user", "name email")
            .populate("assignedTo", "name email");

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        // Only task creator can delete
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found or only the task creator can delete"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const completeTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            $or: [
                { user: req.user.userId },
                { assignedTo: req.user.userId }
            ]
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found or unauthorized"
            });
        }

        task.status = "done";
        await task.save();

        const updatedTask = await Task.findById(task._id)
            .populate("user", "name email")
            .populate("assignedTo", "name email");

        res.status(200).json({
            message: "Task marked as done",
            task: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const {
            scope = "all",
            search,
            status,
            priority,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let scopeFilter = {};
        if (scope === "created") {
            scopeFilter = { user: req.user.userId };
        } else if (scope === "assigned") {
            scopeFilter = { assignedTo: req.user.userId };
        } else {
            scopeFilter = {
                $or: [
                    { user: req.user.userId },
                    { assignedTo: req.user.userId }
                ]
            };
        }

        const filter = { ...scopeFilter };

        if (search) {
            const searchCondition = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ]
            };
            filter.$and = [searchCondition];
        }

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }

        const allowedSortFields = ["createdAt", "dueDate", "priority"];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
        const sortOrder = order === "asc" ? 1 : -1;
        const sortOptions = { [sortField]: sortOrder };

        const totalTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .populate("user", "name email")
            .populate("assignedTo", "name email")
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json({
            count: tasks.length,
            total: totalTasks,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(totalTasks / limitNumber),
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getTaskAnalytics = async (req, res) => {
    try {
        const userId = req.user.userId;
        const userFilter = {
            $or: [
                { user: userId },
                { assignedTo: userId }
            ]
        };

        const totalTasks = await Task.countDocuments(userFilter);

        const completedTasks = await Task.countDocuments({
            ...userFilter,
            status: "done"
        });

        const pendingTasks = await Task.countDocuments({
            ...userFilter,
            status: { $in: ["todo", "in-progress"] }
        });

        const completionPercentage = totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

        res.status(200).json({
            totalTasks,
            completedTasks,
            pendingTasks,
            completionPercentage
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    completeTask,
    getTaskAnalytics
};