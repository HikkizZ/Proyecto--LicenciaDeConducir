"use strict";


const express = require("express");
const solicitudController = require("../controllers/solicitud.controller.js");
const router = express.Router();


    router.get("/", solicitudController.getSolicitud);  
    
    module.exports = router;