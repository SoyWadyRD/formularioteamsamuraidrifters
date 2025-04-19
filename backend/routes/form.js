// backend/routes/form.js
const express = require('express');
const router = express.Router();
const Submission = require('../models/submissions');  // Asegúrate de que la ruta sea correcta

router.post('/', async (req, res) => {
  const { realName, gameName, age, country, playingTime, activeTime, activePerson } = req.body;
  const newSubmission = new Submission({
    realName,
    gameName,
    age,
    country,
    playingTime,
    activeTime,
    activePerson,
  });

  try {
    await newSubmission.save();
    console.log(`📝 Formulario enviado por el jugador: ${realName} (${gameName})`);
    res.status(201).send('Formulario recibido');
  } catch (error) {
    console.error('Error al guardar el formulario', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

module.exports = router;
