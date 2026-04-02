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

