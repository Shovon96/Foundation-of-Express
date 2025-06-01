const express = require('express')
import { Request, Response } from "express"
import fs from 'fs'
import path from "path"
import { client } from "../server";

// Json File Path
const dataFilePath = path.join(__dirname, '../../../db/todoData.json');

export const todosRouter = express.Router();
export const usersRouter = express.Router();

todosRouter.get('/', async (req: Request, res: Response) => {
    
    const db = await client.db("todoDB");
    const collection = await db.collection("todos");

    const cursor = collection.find({});
    const todos = await cursor.toArray();

    res.send(todos);
    
});

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

    res.send(todos);
})