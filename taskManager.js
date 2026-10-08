const data = require('./task.json');



var validateTask = function (body) {
    let errors = [];

    if (typeof body.title !== 'string' || body.title.trim() === '') {
        errors.push("title is required and must be a non-empty string");
    }
    if (typeof body.description !== 'string' || body.description.trim() === '') {
        errors.push("description is required and must be a non-empty string");
    }
    if (typeof body.completed !== 'boolean') {
        errors.push("completed is required and must be true or false");
    }
    return errors;
}

var getAllTasks = async function (req, res, next) {
    res.status(200).json(data.tasks);
}

var getTask = async function (req, res, next) {
    try {
        let taskId = Number(req.params.id);
        const task = data.tasks.find(task => task.id === taskId);

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        next(error);
    }
}

var addTask = async function (req, res, next) {
    try {
        let errors = validateTask(req.body);
        if (errors.length) {
            return res.status(400).json({ error: "Validation failed", details: errors });
        }

        
        let taskId = data.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

        let task = {
            "id": taskId,
            "title": req.body.title.trim(),
            "description": req.body.description.trim(),
            "completed": req.body.completed
        }

        data.tasks.push(task);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

var updateTask = async function (req, res, next) {
    try {
        let taskId = Number(req.params.id);
        const index = data.tasks.findIndex(task => task.id === taskId);

        if (index === -1) {
            return res.status(404).json({ error: "Task not found" });
        }

        let errors = validateTask(req.body);
        if (errors.length) {
            return res.status(400).json({ error: "Validation failed", details: errors });
        }

        data.tasks[index] = {
            "id": taskId,
            "title": req.body.title.trim(),
            "description": req.body.description.trim(),
            "completed": req.body.completed
        }
        res.status(200).json(data.tasks[index]);
    }
    catch (error) {
        next(error);
    }
}

var deleteTask = async function (req, res, next) {
    try {
        const id = Number(req.params.id);
        const index = data.tasks.findIndex(task => task.id === id);

        if (index === -1) {
            return res.status(404).json({ error: "Task not found" });
        }

        const deleted = data.tasks.splice(index, 1)[0];
        res.status(200).json({ message: "Task deleted successfully", task: deleted });
    }
    catch (error) {
        next(error);
    }
}


var taskModule = {
    addTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}

module.exports = taskModule;
