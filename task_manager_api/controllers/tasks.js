const Task = require('../models/task');
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require("../errors/custom-error");
//read all
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks});
})
//create
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
})
//read
const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id: taskID});
    if (!task) {
        return next(createCustomError(`Cant find task ${taskID}`, 404));
    }
    res.status(200).json({task});
})
//update
const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params

    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    });

    if (!task) {
        return next(createCustomError(`Cant find task ${taskID}`, 404));
    }

    res.status(200).json({task});
})
//delete
const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID});
    if (!task) {
        return next(createCustomError(`Cant find task ${taskID}`, 404));
    }
    res.status(200).json({task});
})

module.exports = {getAllTasks, deleteTask, createTask, updateTask, getTask};