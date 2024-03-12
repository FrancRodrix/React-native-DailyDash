const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://franc:franc@cluster0.4joqybh.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server running on Port 3000");
});

// endpoint to create a Task in the backend

const Task = require("./models/DailyTask");

app.post("/tasks", async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;

    const newTask = new Task({
      title,
      color,
      repeatMode,
      reminder,
    });

    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Network Error" });
  }
});

// Fetch Tasks
app.get("/taskslist", async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to task compleeted on that particular day

app.put("/tasks/:taskId/completed", async (req, res) => {
  const taskId = req.params.taskId;
  const updatedCompletion = req.body.completed;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: updatedCompletion },
      { new: true }
    );
    // const {taskId,day}=req.params
    // const task=await Task.findById(taskId)

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }


    console.log(updatedTask,'VALL')

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error.message });
  }
});


app.delete("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Habit deleted succusfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the habit" });
  }
});
