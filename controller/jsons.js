const fs = require("fs");
const multer = require('multer');
const path = require('path');
const config = require("../configuration.json")

exports.postDirectories = async (req, res, next) =>
{
    console.log(req.file);
    res.json({
      message: 'Archivo subido exitosamente.',
      fileName: req.file ? req.file.originalname : 'N/A',
      directoryPath: path.join(config.uploadsDirectory, req.params.directoryName)
    });
}


exports.getDirectories = async (req, res, next) =>{
    const directoryName = req.params.directoryName;
    const directoryPath = path.join(config.uploadsDirectory, directoryName);

    if (!fs.existsSync(directoryPath)) {
        return res.status(404).json({ error: 'Directorio no encontrado.' });
    }

    const subdirectories = fs.readdirSync(directoryPath, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name);

    const jsonFiles = fs.readdirSync(directoryPath)
        .filter(file => file.endsWith('.json'));

    res.json({
        subdirectories: subdirectories,
        jsonFiles: jsonFiles
    });
    
}



exports.getDir = async (req, res, next) =>{
    res.send('s');
}

