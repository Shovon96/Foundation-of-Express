const express = require('express')
const app: Application = express()
import { Application, NextFunction, Request, Response } from "express"
import { todosRouter, usersRouter } from "./todos/todos-router"

// Middleware
app.use(express.json());
app.use('/todos', todosRouter);
app.use('/users', usersRouter);

// Main Route
app.get('/', (req: Request, res: Response) => {
  res.send('Learnig Express Js')
})



// Global Error Handeling
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: '404: Router Not Found' })
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("Error", error);
    res.status(400).json({ message: "Something went wrong from global error." })
  }
})


export default app;