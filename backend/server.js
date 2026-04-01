const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/todos', todosRouter);

//Rutas de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API de Tareas funcionando' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});