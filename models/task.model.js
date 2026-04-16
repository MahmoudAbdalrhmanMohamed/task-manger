const mongoose = require("mongoose");

const taskSchemca = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name for task"],
    trim: true,
    maxLength: [20, "max length is 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

taskSchemca.set("toJSON", {
  transform: (_, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Task", taskSchemca);
