import React from "react";

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <div 
                className={`todo-checkbox ${todo.completed ? "checked" : ""}`}
                 onClick={() => onToggle(todo.id)}
            />
                <div className="todo-content">
                    <div className="todo-text">{todo.title}</div>
                        {todo.description && (
                            <div className="todo-desc">{todo.description}</div>
                        )}
                    </div>
            <div className="todo-actions">
                <button className="btn-delete" onClick={() => onDelete(todo.id)}>
                    Eliminar
                </button>
            </div>
        </li>
    );
}
 export default TodoItem;