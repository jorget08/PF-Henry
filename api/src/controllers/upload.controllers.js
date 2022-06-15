const cloudinary = require('cloudinary').v2;
const { updateImageCloudinary } = require('../helpers/updateFile')
const fs = require('fs');

//? cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CL,  
    api_secret: process.env.API_SECRET_CL,  
    shorten: true,
    secure: true
});

const UploadCloud = async (req, res) => {
    const { tipo, id } = req.params;
    const tiposValidos = ['user', 'book'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo de archivo no es válido'
        })
    }
    console.log(req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No seleccionaste ningún archivo'
        })
    }
    const file = req.files.img
    const nombreCortado = file.name.split('.') //? ['nombre', 'extension']
    const extension = nombreCortado[nombreCortado.length - 1]
    //? validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extensión de archivo no es válida'
        })
    }
    //? mover a cloudinary
    try {
        // const nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: `${tipo}`,
            public_id: `${id}`,
            overwrite: true,
            resource_type: 'auto'
        })
        const url = result.secure_url
        const resp = await updateImageCloudinary(tipo, id, url)
        //? eliminar archivo temporal
        fs.unlinkSync(file.tempFilePath)
        //? respuesta
        if (resp) {
            return res.json({
                ok: true,
                msg: 'Imagen subida correctamente',
                url
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Error al actualizar imagen'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al subir imagen'
        })
    }


}

module.exports = { UploadCloud };