require("dotenv").config();

const express = require("express");
const tasks = require("./routes/tasks.route");
const globalErrorFormat = require("./controllers/error.controller");
const notFoundRouteErrorHandler = require("./controllers/notFound.controller");

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.use(`/${process.env.API_URL}/tasks`, tasks);
const mongoose = require("mongoose");

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MOGOOSE_DB_URL).then(() => {
      console.log("connected");
    });
    console.log("Task Manager App");
  } catch (error) {
    console.error(error);
  }
});

app.use(globalErrorFormat);
app.use(notFoundRouteErrorHandler);
