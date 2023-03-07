const getAllTasks = (req, res) => {
    res.send('all items');
}

const getTask = (req, res) => {
    res.send('get task');
}

const createTask = (req, res) => {
    res.json(req.body);
}

const updateTask = (req, res) => {
    res.send('update');
}

const deleteTask = (req, res) => {
    res.send('delete');
}


module.exports = {getAllTasks, deleteTask, createTask, updateTask, getTask};