import { Request } from 'express'
import HttpException from '@errors/httpException'
import multer from 'multer'
import fs from 'fs'
const jwt = require('jsonwebtoken');
import { JWT_AUTH_SECRET } from '@envs/index'
import  UserModel from '@models/user'

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png']

// Configuring first the type of the storage
const multerStorage = multer.diskStorage({
	// Define the destination
	destination: async (req: Request, file: Express.Multer.File, callback) => {
		const token = req.headers?.authorization?.split(' ')[1]
		const decodedToken = jwt.verify(token, JWT_AUTH_SECRET())
		const verifyUser = await UserModel.findById(decodedToken.id)
		if (!verifyUser) throw 'Usuario no encontrado'
		req.body.user = verifyUser

		const directory = `public/uploads`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}

		callback(null, directory);
	},
	filename: (req: Request, file: Express.Multer.File, callback) => {

		// Extracting the extension.
		const extension = file.mimetype.split('/')[1];
		callback(null, `image-${Date.now()}.${extension}`);
	},
});


// Filtering for only images files
const multerFilter = (
	req: Request,
	file: Express.Multer.File,
	callback: any
) => {
	const extension = file.mimetype.split('/')[1]
	if (ALLOWED_EXTENSIONS.includes(extension)) {
		callback(null, true);
	} else {
		callback(
			new HttpException('El formato del archivo es incorrecto.', 404),
			false
		);
	}
};


const uploadFile = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

export { uploadFile };