const express = require('express');
const router = express.Router();

let task = require('./taskManager');


router.post('/', task.addTask);
router.get('/', task.getAllTasks);
router.get('/:id', task.getTask);
router.put('/:id', task.updateTask);
router.delete('/:id', task.deleteTask);

module.exports = router;
