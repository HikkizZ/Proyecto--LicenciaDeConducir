/* eslint-disable require-jsdoc */
// Controlador para la subida de archivos
"use strict";

// Modelo de archivos
const Document = require("../models/document.model.js");
// Esquema de archivos
const { documentBodySchema, documentUpdateSchema } = require("../schema/document.schema.js");

// Controlador get para obtener todos los documentos o archivos
async function getDocuments(req, res) {
    try {
        const { id } = req.params;
        const rows =
        (id === undefined) ? await Document.find() : await Document.findById(id);
        return res.status(200).json({ status: true, data: rows });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error] });
    }
}

// Controlador para subir un archivo
async function uploadDocument(req, res) {
    try {
        // Validar el body
        const { error, value } = documentBodySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, errors: error.details });
        }
        // Crear el documento en la base de datos
        const document = new Document(value);
        document.image = "../../public/uploads" + req.file.filename;
        const documentSaved = await document.save();
        return res.status(201).json({ status: true, data: documentSaved });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error] });
    }
}

// Controlador para actualizar un archivo
async function updateDocument(req, res) {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).send({ message: "Archivo no encontrado" });
        }

        const { error, value } = documentUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, errors: error.details });
        }
        
        const documentoActualizado = await Document.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true },
        );
        return res.status(200).json({ status: true, data: documentoActualizado });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error] });
    }
}

// Controlador para eliminar un archivo
async function deleteDocument(req, res) {
    try {
        const { id } = req.params;
        await Document.findByIdAndDelete(id);
        return res.status(200).json({ status: true, data: "Documento eliminado correctamente." });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error] });
    }
}


// exportar los controladores
module.exports = { getDocuments, uploadDocument, updateDocument, deleteDocument };
