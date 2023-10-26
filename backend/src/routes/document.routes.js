const express = require('express');
const router = express.Router();

const {getAllDocuments, createDocument, getDocumentById, updateDocument, deleteDocument} = require('../controllers/document.controller.js');

// Ruta para obtener todos los documentos
router.get('/', getAllDocuments);
// Ruta para obtener un documento por su id
router.get('/:id', getDocumentById);
// Ruta para crear un documento
router.post('/', createDocument);
// Ruta para actualizar un documento
router.put('/:id', updateDocument);
// Ruta para eliminar un documento
router.delete('/:id', deleteDocument);

module.exports = router;