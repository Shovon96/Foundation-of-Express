import { Application, Request, Response } from "express"
import fs from 'fs'
import path from "path"
const express = require('express')
const app: Application = express()

// Json File Path
const dataFilePath = path.join(__dirname, '../../db/todoData.json');

// Middleware
app.use(express.json());

// Main Route
app.get('/', (req: Request, res: Response) => {
  res.send('Learnig Express Js')
})

// Get All Todos Data
app.get('/all-todos', (req: Request, res: Response) => {
  const data = fs.readFileSync(dataFilePath, { encoding: 'utf-8' });
  res.json(data);
})

// Post Or Create New Todos
app.post('/create-todo', (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log(title, body);
  res.send("todo created");
})

export default app;