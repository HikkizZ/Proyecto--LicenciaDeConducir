// Controlador de la subida de documentos o archivos
"use strict";
const Document = require("../models/document.model.js");
const { PUBLIC_URL } = require("../config/configEnv.js");

// const { documentBodySchema,
//         documentIdSchema,
//         documentUpdateSchema
//     } = require("../schema/document.schema.js");

// Enviar un documento o archivo
async function enviarDocumento(req, res) {
    try {
        const { body, file } = req;
        console.log(file);
        const fileData = {
            // nombre: body.nombre,
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
            // usuarioId: body.usuarioId,
        };
        const data = await Document.create(fileData);
        res.send({ data });
        res.status(201).send({ message: "Documento enviado" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al enviar el documento" });
    }
};

module.exports = {
    enviarDocumento,
};
