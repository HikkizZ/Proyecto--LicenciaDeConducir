// Importamos el modelo de Storage
const Storage = require('../models/storage.model.js');

// Crear un archivo
async function createFile(req, res) {
    const { body, file } = req;
    console.log(file);
    const fileData = {
        filename: file.filename,
        usuarioId: body.usuarioId,
    }
    const data = await Storage.create(fileData);
    res.send({data});
};

// Obtener todos los archivos
async function getAllFiles(req, res) {
    try {
        const files = await Storage.find();
        res.send(files);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los archivos' });
    }
};

// Obtener archivos por id de usuario
async function getFilesByUserId(req, res) {
    try {
        const files = await Storage.find({usuarioId: req.params.id});
        res.send(files);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los archivos' });
    }
}

module.exports = {
    createFile,
    getAllFiles,
    getFilesByUserId,
}