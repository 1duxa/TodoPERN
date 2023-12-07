const pool = require("../db");

module.exports.todoPost =
  ("/todos",
  async (req, res) => {
    try {
      const { desc, completed } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo_table(todo_desc,todo_completed) VALUES($1,$2) RETURNING *",
        [desc, completed]
      );
      res.json({ newTodo, msg: "todo added", success: true });
    } catch (error) {
      console.log(error);
    }
  });

module.exports.todoGet =
  ("/todos",
  async (req, res) => {
    try {
      const todos = await pool.query("SELECT * FROM todo_table");

      res.json(todos.rows);
    } catch (error) {
      console.log(error);
    }
  });
module.exports.todoGetId =
  ("/todos/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query(
        "SELECT * FROM todo_table WHERE todo_id = $1",
        [id]
      );
      res.json(todo.rows);
    } catch (error) {
      console.log(error);
    }
  });
module.exports.todoPutId =
  ("/todos/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const { desc, completed } = req.body;
      const todo = await pool.query(
        "UPDATE todo_table SET todo_desc =$1, todo_completed = $2 WHERE todo_id = $3",
        [desc, completed, id]
      );

      res.json(todo.rows);
    } catch (error) {
      console.log(error);
    }
  });
module.exports.todoDeleteId =
  ("/todos/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const deleteTodo = await pool.query(
        "DELETE FROM todo_table WHERE todo_id = $1",
        [id]
      );

      res.json(deleteTodo.rows);
    } catch (error) {
      console.log(error);
    }
  });
module.exports.todoDeleteAll =
  ("/todos/",
  async (req, res) => {
    try {
      await pool.query("DELETE FROM todo_table");

    } catch (error) {
      console.log(error);
    }
  });

//Reindex after deleting all the rows

  const resetSequence = async () => {
    try {
      await pool.query("SELECT setval(pg_get_serial_sequence('todo_table', 'todo_id'), 1, false)");
      await pool.query("ALTER SEQUENCE todo_table_todo_id_seq RESTART WITH 1");
      console.log("Sequence reset successfully");
    } catch (error) {
      console.error("Error resetting sequence:", error);
    }
  };
  
module.exports.todoReindex =
  ("/todos/",
  async (req, res) => {
    try {
   await(resetSequence());
   res.json({ msg: "Todos deleted and sequence reset", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error", success: false });
    }
  });
