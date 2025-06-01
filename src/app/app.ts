const express = require('express')
const app: Application = express()
import { Application, Request, Response } from "express"
import { todosRouter, usersRouter } from "./todos/todos-router"

// Middleware
app.use(express.json());
app.use('/todos', todosRouter);
app.use('/users', usersRouter);

// Main Route
app.get('/', (req: Request, res: Response) => {
  res.send('Learnig Express Js')
})

export default app;