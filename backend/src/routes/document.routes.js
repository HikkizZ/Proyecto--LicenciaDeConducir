// Rutas para el CRUD de documentos o archivos
"use strict";
const express = require("express");
const router = express.Router();
const { getDocuments,
        uploadDocument,
        updateDocument,
        deleteDocument } = require("../controllers/document.controller.js");
const uploadImage = require("../utils/docHandler.js");

// Ruta para enviar un documento o archivo
router.post("/", uploadImage, uploadDocument);
// Ruta para obtener todos los documentos o archivos
router.get("/", getDocuments);
// Ruta para obtener un documento o archivo
router.get("/:id", getDocuments);
// Ruta para eliminar un documento o archivo
router.delete("/:id", deleteDocument);
// Ruta para actualizar un documento o archivo
router.put("/:id", updateDocument);
// Exportar el post
module.exports = router;
