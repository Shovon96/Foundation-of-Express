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
// Global Error Handeling
app.use((req, res, next) => {
    res.status(404).json({ message: '404: Router Not Found' });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("Error", error);
        res.status(400).json({ message: "Something went wrong from global error." });
    }
});
exports.default = app;
