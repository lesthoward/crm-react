const { request, response } = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');

exports.deleteOrder = async (req = request, res = response) => {
	try {
		await Order.findByIdAndDelete({ _id: req.params.idOrder });
		res.json({
			msg: `La orden con idOrder: ${req.params.idOrder} ha sido suprimida`,
		});
	} catch (error) {
		res.json({ msg: `Error la orden: ${error}` });
	}
};

exports.updateOrder = async (req = request, res = response) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.idOrder,
			req.body,
			{ returnOriginal: false }
		);
		res.json(order);
	} catch (error) {
		res.json({ msg: `Error al actualizar la orden: ${error}` });
	}
};

exports.specificOrder = async (req = request, res = response) => {
	const isObjectId = mongoose.Types.ObjectId.isValid(req.params.idOrder);
	if (!isObjectId)
		return res.json({
			msg: 'El idOrder no corresponde a un ObjectId válido',
		});
	const order = await Order.findById(req.params.idOrder)
		.populate('clientID')
		.populate({
			path: 'order.productID',
			model: 'product',
		});
	if (!order) return res.json({ msg: 'No se pudo encontrar la orden' });
	res.json(order);
};

exports.getOrders = async (req = request, res = response) => {
	try {
		const orders = await Order.find().populate('clientID').populate({
			path: 'order.productID',
			model: 'product',
		});
		res.json(orders);
	} catch (error) {
		res.json({ msg: `Ha ocurrido un error con la búsqueda: ${error}` });
	}
};

exports.newOrder = async (req = request, res = response) => {
	try {
		const order = await Order.create(req.body);
		res.json(order);
	} catch (error) {
		res.json({ msg: `No se pudo crear la orden: ${error}` });
	}
};
