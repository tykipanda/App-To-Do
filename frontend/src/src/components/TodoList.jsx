import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return (
        <div className="empty-state">
            <p>No hay tareas. ¡Agrega una nueva tarea para empezar!</p>
        </div>;
        );
    }

  