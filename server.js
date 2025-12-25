const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/student");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://kebdv:kebdv010@student-system.7kkkzmt.mongodb.net/?appName=student-system")
.then(() => console.log("Mongo CoMongo Atlas Connected"))
.catch(err => console.log(err));

// CREATE
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// READ
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});


// UPDATE
app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(student);
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Student Deleted");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Student System API is running");
});
