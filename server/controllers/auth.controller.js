const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req = request, res = response) => {
	const user = new User(req.body);
	user.password = await bcrypt.hash(req.body.password, 12);
	try {
		await user.save();
		res.json({
			msg: 'Bienvenido a nuestra comunidad, es un placer tu visita',
		});
	} catch (error) {
		res.json({ msg: 'Ha ocurrido un error', isError: true });
	}
};

exports.login = async (req = request, res = response) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.json({ msg: 'La cuenta no se encuentra registrada', isError: true });
	} else {
		const checkPassword = bcrypt.compareSync(password, user.password);
		if (!checkPassword) {
			res.json({ msg: 'La contrasena es incorrecta', isError: true });
		} else {
            const userObj = {
                email,
                password,
                id: user._id
            }
			const tokenJWT = jwt.sign(userObj, 'shh', { expiresIn: '1h' });
            res.json({msg: tokenJWT})
		}
	}
};
