const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

// sample in-memory storage for todo items
let todos = [];

// Connecting mongodb
mongoose.connect('mongodb://localhost:27017/Balaji')
.then(() => {
    console.log('DB connected!')
})
.catch((err) => {
    console.log(err);
})


// Creating schema
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String
})

// Creating model
const todoModel = mongoose.model('Todo', todoSchema);


//create a new todo item
app.post('/todos', async (req, res) => {
    const {title, description} = req.body;
    // const newTodo = {
    //     id: todos.length + 1,
    //     title,
    //     description
    // };
    // todos.push(newTodo);
    // console.log(todos);
    
    try {
        const newTodo = new todoModel({title, description});
        await newTodo.save();
        res.status(201).json(newTodo);
    }

    catch(error) {
        console.log(error);
        res.send(500).json({message: error.message});

    }

    
})

//Get all items
// app.get('/todos', (req, res) => {
//     res.json(todos);
// })

const port = 3000;

app.listen(port, () => {
    console.log("Server is listening to port" + port);
})