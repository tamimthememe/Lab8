const express = require("express");

const app = express();
app.use(express.json());

const events = [];
const users = [];

app.post("/create-event", async (req, res) => {
  const event = req.body;
  events.push(event);
  res.status(200).json({ message: "Event added successfully", events });
});

app.post("/categorize", (req, res) => {
  try {
    const { category, name } = req.body;
    let event = events.find((item) => item.name == name);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.category = category;
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/view-event", (req, res) => {
  try {
    const { category } = req.body;
    const eventsList = events.filter((item) => item.category == category);
    res.json(eventsList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/users", (req, res) => {
  try {
    const { email, password } = req.body;
    users.push({ email, password });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app; 
