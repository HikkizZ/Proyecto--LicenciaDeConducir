// Operaciones CRUD de Documentos

/*
Create
Read
Update
Delete
*/

// Importa el modelo de documentos
const Document = require("../models/document.model.js");

// Obtener todos los documentos
async function getAllDocuments(req, res) {
    try {
        const documents = await Document.find();
        res.send(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los archivos' });
    }
};

// Obtener un documento por su id
async function getDocumentById(req, res) {
    try {
        const document = await Document.findById(req.params.id);
        if(!document) {
            res.status(404).json({ message: 'El documento no existe' });
        }
        res.send(document);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el archivo' });
    }
};

// Crear un documento
async function createDocument(req, res) {
    try {
        const document = new Document({
            nombre: req.body.nombre,
            archivo: req.body.archivo,
            usuarioId: req.body.usuarioId,
            estado: req.body.estado,
        });
        const savedDocument = await document.save();
        res.status(201).json(savedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el archivo' });
    }
}

// Actualizar un documento
async function updateDocument(req, res) {
    try {
        const document = await Document.findById(req.params.id);
        if(!document) {
            res.status(404).json({ message: 'El documento no existe' });
        }
        const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el archivo' });
    }
}

// Eliminar un documento
async function deleteDocument(req, res) {
    try {
        const document = await Document.findById(req.params.id);
        if(!document) {
            res.status(404).json({ message: 'El documento no existe' });
        }
        await Document.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'El documento ha sido eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el archivo' });
    }
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument
};