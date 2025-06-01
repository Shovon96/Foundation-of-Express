"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = exports.todosRouter = void 0;
const express = require('express');
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Json File Path
const dataFilePath = path_1.default.join(__dirname, '../../../db/todoData.json');
exports.todosRouter = express.Router();
exports.usersRouter = express.Router();
exports.todosRouter.get('/', (req, res) => {
    const data = fs_1.default.readFileSync(dataFilePath, { encoding: 'utf-8' });
    // console.log("From Todos router!");
    res.json({
        message: 'From todos router json',
        data
    });
});
exports.todosRouter.post('/create-todo', (req, res) => {
    const { title, body } = req.body;
    //   console.log(title, body);
    res.send("todo created");
});
