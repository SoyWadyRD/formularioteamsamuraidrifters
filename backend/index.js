const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

// Importar las rutas
const formRoutes = require('./routes/form');   // Asegúrate de que la ruta es correcta
const adminRoutes = require('./routes/admin'); // Si tienes alguna ruta de administración

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/form', formRoutes);  // Asegúrate de que esta ruta esté registrada
app.use('/api/admin', adminRoutes); // Asegúrate de que esta ruta esté registrada también

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas para servir las páginas HTML directamente
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'admin.html'));
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
  })
  .catch(err => console.error('Error al conectar MongoDB:', err));
