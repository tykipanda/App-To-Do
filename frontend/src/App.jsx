import React, { useState, useEffect} from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

const API_URL = "http://localhost:3001/api/todos";

function App() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
} // provicional 

// Cargar tareas al iniciar

useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
}, []);

// Agregar tarea

const addTodo = async (title, description) => {
    const res = await axios.post(API_URL, { title, description });
    setTodos([...todos, res.data]);
};

// Marcar como completada

const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    const updated = { ...todo, completed: !todo.completed };
    await axios.put(`${API_URL}/${id}`, updated);
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
};

// Eliminar tarea

const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
};

// Filtrar tareas

const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
});

const activeTodos = todos.filter((t) => !t.completed).length;

return (
    <div className="app-container">
        <header className="app-header">
        <h1>Mis Tareas</h1>
        <p className="subtitle">Organiza tu día con React</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <div className="filters">
        {["all", "active", "completed"].map((f) => (
            <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
            >
            {f === "all" ? "Todas" : f === "active" ? "Activas" : "Completadas"}
            </button>
        ))}
        </div>

        
        </div>