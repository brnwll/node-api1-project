const express = require("express");
const User = require("./users/model");

const server = express();
server.use(express.json());

// GET /api/users
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

// GET /api/users/:id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: `The user with the specified ID does not exist` });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved" });
    });
});

// POST /api/users
server.post("/api/users", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    const newUser = await User.insert(user);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    }
  }
});

// PUT /api/users/:id
server.put("/api/users/:id", async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    const updatedUser = await User.update(id, changes);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res
        .status(404)
        .json({ message: `The user with the specified ID does not exist` });
    }
  }
});

// DELETE /api/users/:id
server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.remove(id);
  if (deletedUser) {
    res.status(200).json(deletedUser);
  } else {
    res
      .status(404)
      .json({ message: `The user with the specified ID does not exist` });
  }
});

module.exports = server;
