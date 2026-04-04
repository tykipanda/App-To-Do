const API_URL = 'http://localhost:30001/api/todos';

// Estados de la app

let todos = [];
let currentFilter = 'all';

//  ELementos del DOM

const form = document.getElementById('todo-form');
const titleInput = document.getElementById('todo-title');
const descInput = document.getElementById('todo-desc');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const filterBtns = document.querySelectorAll('.filter-btn');

// Funciones de la API

async function fetchTodos() {
    const res = await fetch(API_URL);
    todos = await res.json();
    renderTodos();
}

async function addTodo(title, description) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });
    const newTodo = await res.json();
    todos.push(newTodo);
    renderTodos();
}

async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    await fetch(`${API_URL}/${id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
    });
    todo.completed = !todo.completed;
    renderTodos();
} 

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    todos = todos.filter((t) => t.id !== id);
    renderTodos();
}

// Renderizado

function renderTodos() {
    const filtered = todos.filter((t) => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });


    todosList.innerHTML = filtered.map((t) => `
    <li class="todo-item ${t.completed ? 'completed' : ''}">
        <div class="todo-checkbox" ${t.completed ? 'checked' : ""}" onclick="toggleTodo(${t.id})"></div>
        <div class="todo-content">
        <div class="todo-text">${t.title}</div>
        ${t.description ? `<div class="todo-desc">${t.description}</div>` : ''}
        </div>
        <div class="todo-actions">
        <button class="btn-delete" onclick="deleteTodo(${t.id})">Eliminar</button>
        </div>
    </li>
    `).join('');

    const active = todos.filter((t) => !t.completed).length;
    todoCount.textContent = `${active} tarea${active !== 1 ? 's' : ''} pendiente${active !== 1 ? 's' : ''}`;
}

// Event listeners

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    if (title) {
        addTodo(title, desc);
        titleInput.value = '';
        descInput.value = '';
    }
});

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Inicializar 
fetchTodos();