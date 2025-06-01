const express = require('express')
import { Request, Response } from "express"
import fs from 'fs'
import path from "path"
import { client } from "../server";
import { ObjectId } from "mongodb";

// Json File Path
const dataFilePath = path.join(__dirname, '../../../db/todoData.json');

// Create Middleware Router
export const todosRouter = express.Router();
export const usersRouter = express.Router();

// Get All Todos Data From MongoDB
todosRouter.get('/', async (req: Request, res: Response) => {

    const db = await client.db("todoDB");
    const collection = await db.collection("todos");

    const cursor = collection.find({});
    const todos = await cursor.toArray();

    res.json(todos);

});

// Post ToDo in mongoDB
todosRouter.post('/create-todo', async (req: Request, res: Response) => {

    const { title, desc, priority } = req.body;
    const db = await client.db("todoDB");
    const collection = await db.collection("todos");
    await collection.insertOne({
        title: title,
        desc: desc,
        priority: priority,
        isCompleted: false
    })

    const cursor = collection.find({});
    const todos = await cursor.toArray()

    res.json(todos);
});

// Get Single ToDo Through by id:
todosRouter.get('/:id', async (req: Request, res: Response) => {

    const id = req.params.id
    const db = await client.db("todoDB");
    const collection = await db.collection("todos");

    const todo = await collection.findOne({ _id: new ObjectId(id) })

    res.json(todo);
})

// Update a Single ToDo Through by id:
todosRouter.put('/update-todo/:id', async (req: Request, res: Response) => {

    const id = req.params.id
    const db = await client.db("todoDB");
    const collection = await db.collection("todos");

    const { title, desc, priority, isCompleted } = req.body;
    const fileter = { _id: new ObjectId(id) };

    const updateTodo = await collection.updateOne(fileter,
        { $set: { title, desc, priority, isCompleted } },
        { upsert: true }
    )

    res.json(updateTodo);
});

// Delete a Single ToDo Through by id:
todosRouter.delete('/delete-todo/:id', async (req: Request, res: Response) => {

    const id = req.params.id
    const db = await client.db("todoDB");
    const collection = await db.collection("todos");

    await collection.deleteOne({ _id: new ObjectId(id) })

    res.json({ message: "ToDo Deleted Successfully" });
});