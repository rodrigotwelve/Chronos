const express = require('express');
const db = require('./database.js');
const app = express();
const PORT = 5001;

// 1. Middleware - This MUST come before the routes
app.use(express.json());

// 2. API Routes

// GET all tasks
app.get('/api/tasks', (req, res) => {
    const sql = "select * from tasks";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        });
      });
});

// POST a new task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({"error": "Missing title"});
        return;
    }
    const sql = 'INSERT INTO tasks (title) VALUES (?)';
    const params = [title];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, title: title, completed: 0 }
        });
    });
});

// PATCH a task's completed status
app.patch('/api/tasks/:id', (req, res) => {
    const { completed } = req.body;
    const sql = `UPDATE tasks set completed = ? WHERE id = ?`;
    db.run(sql, [completed, req.params.id], function (err, result) {
        if (err){
            res.status(400).json({"error": res.message});
            return;
        }
        res.json({ message: "Task updated successfully." });
    });
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, req.params.id, function (err, result) {
        if (err){
            res.status(400).json({"error": res.message});
            return;
        }
        res.json({"message":"deleted", changes: this.changes});
    });
});

// 3. Start the server - This should be at the end
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});