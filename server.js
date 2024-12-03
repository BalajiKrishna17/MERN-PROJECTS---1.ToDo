const express = require('express');
const app = express();

// sample in-memory storage for todo items
let todos = [];


//create a new todo item
app.post('/todos', (req, res) => {
    const {title, description} = req.body;
    const newTodo = {
        id: todos.length + 1,
        title,
        description
    };
    todos.push(newTodo);
    console.log(todos);
    res.status(201).json(newTodo);
})

const port = 3000;

app.listen(port, () => {
    console.log("Server is listening to port" + port);
})