"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = exports.todosRouter = void 0;
const express = require('express');
const path_1 = __importDefault(require("path"));
const server_1 = require("../server");
const mongodb_1 = require("mongodb");
// Json File Path
const dataFilePath = path_1.default.join(__dirname, '../../../db/todoData.json');
// Create Middleware Router
exports.todosRouter = express.Router();
exports.usersRouter = express.Router();
// Get All Todos Data From MongoDB
exports.todosRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield server_1.client.db("todoDB");
    const collection = yield db.collection("todos");
    const cursor = collection.find({});
    const todos = yield cursor.toArray();
    res.json(todos);
}));
// Post ToDo in mongoDB
exports.todosRouter.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, desc, priority } = req.body;
    const db = yield server_1.client.db("todoDB");
    const collection = yield db.collection("todos");
    yield collection.insertOne({
        title: title,
        desc: desc,
        priority: priority,
        isCompleted: false
    });
    const cursor = collection.find({});
    const todos = yield cursor.toArray();
    res.json(todos);
}));
// Get Single ToDo Through by id:
exports.todosRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield server_1.client.db("todoDB");
    const collection = yield db.collection("todos");
    const todo = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    res.json(todo);
}));
// Update a Single ToDo Through by id:
exports.todosRouter.put('/update-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield server_1.client.db("todoDB");
    const collection = yield db.collection("todos");
    const { title, desc, priority, isCompleted } = req.body;
    const fileter = { _id: new mongodb_1.ObjectId(id) };
    const updateTodo = yield collection.updateOne(fileter, { $set: { title, desc, priority, isCompleted } }, { upsert: true });
    res.json(updateTodo);
}));
// Delete a Single ToDo Through by id:
exports.todosRouter.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield server_1.client.db("todoDB");
    const collection = yield db.collection("todos");
    yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    res.json({ message: "ToDo Deleted Successfully" });
}));
