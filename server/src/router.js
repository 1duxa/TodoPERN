const express = require("express");
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedin')
const todoRoutes = require("./routes/todoRoutes");

router.get("/todos",isLoggedIn, todoRoutes.todoGet);
router.get("/todos/:id",isLoggedIn, todoRoutes.todoGetId);

router.put("/todos/:id",isLoggedIn, todoRoutes.todoPutId);
router.post("/todos",isLoggedIn, todoRoutes.todoPost);

router.delete("/todos/:id",isLoggedIn, todoRoutes.todoDeleteId);
router.delete("/todos", isLoggedIn, async (req, res) => {
  try {
    await todoRoutes.todoDeleteAll();
    await todoRoutes.todoReindex(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
});


router.post("/login",require("./routes/authRoutes"));

module.exports = router;
