const express = require('express');
const fs = require("fs");
const multer = require('multer');
const path = require('path');
const config = require('../configuration.json');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directoryName = req.params.directoryName;
    const directoryPath = path.join(config.uploadsDirectory, directoryName);

    // Crear directorio si no existe
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(config.maxFileSize), // Tamaño máximo en bytes
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = config.allowedFileTypes || [];
    const fileType = path.extname(file.originalname).slice(1).toLowerCase();

    if (allowedFileTypes.includes(fileType)) {
      return cb(null, true);
    }

    const error = new Error('Tipo de archivo no permitido.');
    error.status = 400;
    cb(error);
  },
});

module.exports = upload;