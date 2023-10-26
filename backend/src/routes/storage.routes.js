const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/storage.handle.js');
const { createFile, getAllFiles, getFilesByUserId } = require('../controllers/storage.controller.js');

router.post('/', uploadMiddleware.single('file'), createFile);

// Obtener todos los archivos
router.get('/', getAllFiles);

// Obtener archivos por id de usuario
router.get('/:id', getFilesByUserId);

module.exports = router;
