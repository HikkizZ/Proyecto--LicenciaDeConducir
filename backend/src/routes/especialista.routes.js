/*"use strict";

const express = require("express");
const especialistaController = require("../controllers/especialista.controller.js");
const router = express.Router();
router.get("/", especialistaController.getEspecialista);
router.post("/", especialistaController.createEspecialista);

module.exports = router;
