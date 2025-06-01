const express = require('express')
import { Request, Response } from "express"
import fs from 'fs'
import path from "path"

// Json File Path
const dataFilePath = path.join(__dirname, '../../../db/todoData.json');

export const todosRouter = express.Router();
export const usersRouter = express.Router();

todosRouter.get('/', (req: Request, res: Response) => {
    const data = fs.readFileSync(dataFilePath, {encoding: 'utf-8'});
    // console.log("From Todos router!");
    res.json({
        message: 'From todos router json',
        data
    })
});

todosRouter.post('/create-todo', (req: Request, res: Response) => {
  const { title, body } = req.body;
//   console.log(title, body);
  res.send("todo created");
})