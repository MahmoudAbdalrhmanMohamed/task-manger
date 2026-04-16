const Task = require("../models/task.model");
const appError = require("../utils/errorHelper");
const throwError = require("../utils/errorHelperWithoutValidtion");

const getAllTasks = async (req, res, next) => {
  await appError(req, res, next);

  const limit = Math.max(1, Number(req.query.limit || process.env.DEFAULT_LIMIT || 10));
  const page = Math.max(1, Number(req.query.page || 1));
  const skip = (page - 1) * limit;

  const [tasks, totalItems] = await Promise.all([
    Task.find().skip(skip).limit(limit),
    Task.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  res.status(200).json({
    tasks,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
};


const createTask = async (req, res, next) => {
  await appError(req, res, next);
  const createdTask = await Task.create({ ...req.body });
  res.status(201).json(createdTask);
};

const updateTask = async (req, res, next) => {
  await appError(req, res, next);
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (task) res.status(200).json({ task });
  else throwError("not found", next);
};

const editTask = async (req, res, next) => {
  await appError(req, res, next);
  const task = await Task.findOneAndReplace({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (task) res.status(200).json({ task });
  else throwError("not found", next);
};

const deleteTask = async (req, res, next) => {
  await appError(req, res, next);
  const task = await Task.findByIdAndDelete(req.params.id);
  if (task) res.status(200).json({ task });
  else throwError("not found", next);
};

const getSingleTask = async (req, res, next) => {
  await appError(req, res, next);
  const task = await Task.findById(req.params.id);
  if (task) res.status(200).json({ task });
  else throwError("not found", next);
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
};
