"use strict";

const multer = require("multer");
const path = require("path");

/**
 * Configuración de multer para subir archivos
 * @type {import("multer").StorageEngine}
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathStorage = path.join(__dirname, "../../uploads");
        cb(null, pathStorage);
    },
    filename: function(req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
