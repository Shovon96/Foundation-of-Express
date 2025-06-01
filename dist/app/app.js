"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const todos_router_1 = require("./todos/todos-router");
// Middleware
app.use(express.json());
app.use('/todos', todos_router_1.todosRouter);
app.use('/users', todos_router_1.usersRouter);
// Main Route
app.get('/', (req, res) => {
    res.send('Learnig Express Js');
});
exports.default = app;
