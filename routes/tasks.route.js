const express = require("express");
const router = express.Router();
const {
  validCreateTask,
  validIdTask,
  validUpdateTask,
  validPageAndLimitTask,
} = require("../middlewares/task.middleware");

const {
  getAllTasks,
  createTask,
  deleteTask,
  getSingleTask,
  updateTask,
} = require("../controllers/tasks.controller");

router
  .route(`/`)
  .get(validPageAndLimitTask(), getAllTasks)
  .post(validCreateTask(), createTask);
router
  .route("/:id")
  .all(validIdTask())
  .get(getSingleTask)
  .patch(validUpdateTask(), updateTask)
  .delete(deleteTask);
module.exports = router;
