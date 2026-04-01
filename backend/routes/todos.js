const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '../data/todos.json');

// Helper: Leer tareas desde el archivo
function readTodos() {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data || '[]');
}

// Helper: guardar tareas en el archivo
function saveTodos(todos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}   

// GET /api/todos - Obtener todas las tareas
router.get('/', (req, res) => {
    const todos = readTodos();
    res.json(todos);
}); 

// POST /api/todos - Crear una nueva tarea
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }
    const newtodo = {
        id: uuidv4(),
        title,
        description: description || '',
        completed: false,
        createdAt: new Date().toISOString(),
    };
    const todos = readTodos();
    todos.push(newtodo);
    saveTodos(todos);
    res.status(201).json(newtodo);
}); 

// Put /api/todos/:id - Actualizar una tarea
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    let todos = readTodos();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    todos[index] = {...todos[index], title, description, completed };
    saveTodos(todos);
    res.json(todos[index]);
});

// DELETE /api/todos/:id - Eliminar una tarea
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let todos = readTodos();
    const filtered = todos.filter((t) => t.id !== id);
    if (filtered.length === todos.length) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    saveTodos(filtered);
    res.status(204).send();
});

module.exports = router;

