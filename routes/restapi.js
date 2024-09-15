var express = require("express");
var router = express.Router();

const todos = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
  },
];

router.all("/", (req, res) => {
    res.send("It is up");
  });

// READ
router.get("/todos", (req, res) => {
  res.json(todos);
});

// CREATE
router.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json({
    message: "New Todo Added!",
  });
});

// UPDATE
router.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: todoParamId,
      ...newTodoData,
    };
    res.json({
      message: "Todo updated successfully!",
    });
  } else {
    res.status(400).json({
      message: "Todo Id does not exist!",
    });
  }
});

// DELETE
router.delete("/todos/:id", (req, res) => {
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }

  res.json({
    message: "Todo deleted successfully!",
  });
});

router.get("/name", function (req, res, next) {
  res.send({ name: "Ashish" });
});

module.exports = router;
