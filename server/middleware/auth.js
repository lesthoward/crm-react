const { request, response } = require('express');
const jwt = require('jsonwebtoken');
exports.isAuth = (req = request, res = response, next) => {
	const authHeader = req.get('Authorization');
	
	if (!authHeader) {
		const error = new Error('Sin autorización')
        error.statusCode = 401
        throw error
	}

	const token = authHeader.split(' ')[1]
	let checkToken
	try {
		checkToken = jwt.verify(token, 'shh')
	} catch (error) {
		error.statusCode = 500
		throw error
	}

	// Si es válido pero un error
	if(!checkToken) {
		const error = new Error('Sin autorización')
		error.statusCode = 401
		throw error
	}
	next()
};
