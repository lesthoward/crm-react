const { nanoid } = require('nanoid');
const multer = require('multer');
const path = require('path');

exports.multerSingle = (req, res, next, allowedExtensions = [], foldername, maxSize=250_000) => {
	const multer = require('multer');
	const multerConfig = {
		limits: { fileSize: maxSize },
		fileFilter: (req, file, cb) => {
			const extension = file.mimetype.split('/')[1];
			if (allowedExtensions.includes(extension)) {
				cb(null, true);
			} else {
				cb(new Error('NOT_VALID_FORMAT'));
			}
		},
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, path.join(__dirname, `../uploads/${foldername}`));
			},
			filename: function (req, file, cb) {
				const fileExtension = file.mimetype.split('/')[1];
				cb(null, `${nanoid(10)}.${fileExtension}`);
			},
		}),
	};
	const upload = multer(multerConfig);

	const isOk = upload.single('image')(req, res, function (error) {
		if (error instanceof multer.MulterError) {
			if (error.code === 'LIMIT_FILE_SIZE') {
				return res.json({
					msg: 'El archivo no corresponde al tamaño permitido (250kb)',
				});
			}

			return res.json({
				msg: 'Se produjo un error al subir el archivo (instanceof Multer Error)',
			});
		} else if (error) {
			if (error.message === 'NOT_VALID_FORMAT') {
				return res.json({
					msg: `La imagen no cumple con los formatos permitidos (${ allowedExtensions.join(',') })`,
				});
			}
			res.json({
				msg: `Ha ocurrido un error al subir el archivo: Multer Error (ELSE). ${error}`,
			});
		}
		// If everything goes well then continue
		next();
	});
};
