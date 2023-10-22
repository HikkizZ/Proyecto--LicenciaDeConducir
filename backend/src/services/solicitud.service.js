"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");


const Solicitud = require("../models/solicitud.model.js");
const {handleError} = require("../utils/errorHandler.js");


async function getSolicitud(req, res) {
    try {
        const solicitud = await Solicitud.find().exec();
        if (!solicitud) return [null,"No hay solicitudes"]
        return [products,null];

    } catch (error) {
        handleError(error,"solicitud.service -> getSolicitud");
    }
};

async function createSolicitud(solicitud) {
try {
    const {idUsuario, nombre, rut, correo, fechaInicio, estado} = solicitud;
    const solicitudFound = await Solicitud.findOne({correo}).exec();
    if(solicitudFound) return [null,"El correo ya está registrado"];
    
    const newSolicitud = new Solicitud({idUsuario, nombre, rut, correo, fechaInicio, estado});

    const mySolicitud = await newSolicitud.save();
    return [mySolicitud,null];

} catch (error) {
    handleError(error,"solicitud.service -> createSolicitud");
}
};

module.exports = {
getSolicitud,
createSolicitud,
};