// Rutas para el CRUD de documentos o archivos
"use strict";
const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/docHandler.js");
const {
    enviarDocumento,
} = require("../controllers/document.controller.js");

router.post("/", uploadMiddleware.single("file"), enviarDocumento);

module.exports = router;
