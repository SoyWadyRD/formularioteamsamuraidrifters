const express = require('express');
const router = express.Router();

const ADMIN_USERNAME = ['wady', 'jeeruel', 'yensen', 'brayan', 'walter', 'carlos'];
const ADMIN_PASSWORD = [
  'Andreslopez26131620',
  'jeeruel342068',
  'yensen603950',
  'brayan306937',
  'walter044858',
  'carlos894267'
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar que el nombre de usuario y la contraseña sean correctos
  const adminIndex = ADMIN_USERNAME.indexOf(username);
  if (adminIndex === -1) {
    return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
  }

  if (ADMIN_PASSWORD[adminIndex] !== password) {
    return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
  }

  // Si el login es exitoso
  console.log(`👤 El administrador ${username} ha iniciado sesión`);

  return res.status(200).json({ success: true, message: 'Login exitoso' });
});







const Submission = require('../models/submissions');

// ...

// Ruta para obtener todas las submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error('Error al obtener submissions:', err);
    res.status(500).json({ error: 'Error al obtener submissions' });
  }
});



module.exports = router;



