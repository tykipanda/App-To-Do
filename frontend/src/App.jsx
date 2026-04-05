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
}

