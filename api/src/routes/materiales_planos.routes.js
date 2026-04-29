const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const MaterialesPlanosController = require('../controllers/materiales_planos.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const uploadDir = path.resolve(__dirname, '../../uploads/dxf');

const normalizarNombreArchivo = (nombreArchivo) => {
    const nombreBase = path.parse(nombreArchivo).name;
    const nombreSeguro = nombreBase
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 80);

    return nombreSeguro || 'plano';
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const nombreSeguro = normalizarNombreArchivo(file.originalname);
        const sufijoUnico = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

        cb(null, `${nombreSeguro}-${sufijoUnico}.dxf`);
    }
});

const uploadDxf = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname).toLowerCase() !== '.dxf') {
            const error = new Error('Solo se permiten archivos .dxf');
            error.statusCode = 400;
            return cb(error);
        }

        cb(null, true);
    }
});

function eliminarArchivosSubidos(files = {}) {
    Object.values(files).flat().forEach((file) => {
        if (file?.path) {
            try {
                fs.unlinkSync(file.path);
            } catch (error) {
                // Ignore cleanup failures; the request still returns the validation error.
            }
        }
    });
}

function cargarDxf(req, res, next) {
    uploadDxf.fields([
        { name: 'archivo', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ])(req, res, (error) => {
        if (error) {
            const statusCode = error.statusCode || (error instanceof multer.MulterError ? 400 : 500);

            return res.status(statusCode).json({
                mensaje: error.message || 'Error al cargar archivo DXF'
            });
        }

        const archivos = [
            ...(req.files?.archivo || []),
            ...(req.files?.file || [])
        ];

        if (archivos.length > 1) {
            eliminarArchivosSubidos(req.files);

            return res.status(400).json({
                mensaje: 'Envia solo un archivo DXF'
            });
        }

        next();
    });
}

router.get('/', verificarToken, MaterialesPlanosController.obtenerMaterialesPlanos);
router.post('/dxf', verificarToken, cargarDxf, MaterialesPlanosController.subirArchivoDxf);
//router.get('/:id', MaterialesPlanosController.obtenerMaterialPlano);
router.get('/:id/capas', verificarToken, MaterialesPlanosController.obtenerCapasPlano);
//router.post('/', MaterialesPlanosController.insertarMaterialPlano);
//router.put('/:id/capas', MaterialesPlanosController.actualizarCapasPlano);
//router.put('/:id/capas/:nombreCapa/mediciones', MaterialesPlanosController.actualizarMedicionesCapa);
//router.put('/:id/capas/:nombreCapa/materiales', MaterialesPlanosController.actualizarMaterialesCapa);

module.exports = router;
