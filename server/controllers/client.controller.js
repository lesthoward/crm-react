const { request, response } = require('express');
const mongoose = require('mongoose');
const Client = require('../models/Client');

exports.deleteClient = async (req = request, res = response) => {
	try {
		const client = await Client.findByIdAndDelete({
			_id: req.params.idClient,
		});
		res.json({ msg: `Cliente con id: ${client._id} eliminado` });
	} catch (error) {
		res.json({ msg: `Error al eliminar registro ${error}`, error: 1 });
	}
};

exports.updateClient = async (req = request, res = response) => {
	try {
		const client = await Client.findOneAndUpdate(
			{ _id: req.params.idClient },
			req.body,
			{ returnOriginal: false }
		);
		res.json(client);
	} catch (error) {
		res.json({ msg: `Error al actualizar ${error}`, error: 1 });
	}
};

exports.specificClient = async (req = request, res = response) => {
	const isValid = mongoose.Types.ObjectId.isValid(req.params.idClient);
	if (!isValid)
		return res.json({
			msg: 'El idCliente no corresponde a un ObjectId válido',
			error: 1,
		});

	const client = await Client.findById(req.params.idClient);
	if (!client) return res.json({ msg: 'Cliente no encontrado', error: 1 });
	res.json(client);
};

exports.getClients = async (req = request, res = response) => {
	try {
		const clientArr = await Client.find();
		res.json(clientArr);
	} catch (error) {
		res.json({ msg: `No se puedo obtener: ${error}`, error: 1 });
	}
};

exports.newClient = async (req = request, res = response) => {
	try {
		const client = await Client.create(req.body);
		res.json(client);
	} catch (error) {
		if (error.name === 'MongoServerError' && error.code === 11000) {
			return res.json({ msg: 'El correo ya está registrado', error: 1 });
		}
		res.json({ msg: `No se pudo crear: ${error}}`, error: 1 });
	}
};
