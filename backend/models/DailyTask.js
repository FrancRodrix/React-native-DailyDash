const mongoose = require("mongoose");

const dailyTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  repeatMode: {
    type: String,

    enum: ["daily", "weekly"],
    default: "daily",
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.model("Task", dailyTaskSchema);

module.exports = Task;
