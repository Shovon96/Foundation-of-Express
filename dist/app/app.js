"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express = require('express');
const app = express();
// Json File Path
const dataFilePath = path_1.default.join(__dirname, '../../db/todoData.json');
// Middleware
app.use(express.json());
// Main Route
app.get('/', (req, res) => {
    res.send('Learnig Express Js');
});
// Get All Todos Data
app.get('/all-todos', (req, res) => {
    const data = fs_1.default.readFileSync(dataFilePath, { encoding: 'utf-8' });
    res.json(data);
});
// Post Or Create New Todos
app.post('/create-todo', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send("todo created");
});
exports.default = app;
