const { request, response } = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const Product = require('../models/Product')

exports.removeProduct = async (req=request, res=response) => {
    const isObjectId = mongoose.Types.ObjectId.isValid(req.params.idProduct)
    if(!isObjectId) return res.json({msg: 'El idProduct no corresponde a un ObjectId válido'})
    const product = await Product.findById(req.params.idProduct)
    if(!product) return res.json({msg: 'Producto no encontrado'})
    
    if(product.image) {
        const previousFile = path.join(__dirname, `../uploads/product/${product.image}`)
        fs.unlinkSync(previousFile, function (error) {
            return res.json(`Error al borrar la imagen anterior: ${error}`)
        })
    }

    try {
        await product.remove()
        res.json({msg: `Producto ${req.params.idProduct} eliminado correctamente`})
    } catch (error) {
        res.json({msg: `No se pudo eliminar el producto: ${req.params.idProduct}`, isError: true})
    }
}

exports.updateProduct = async (req=request, res=response) => {
    const previousProduct  = await Product.findById(req.params.idProduct)
    let newProduct = req.body
    if(req.file) {
        newProduct = {
            ...req.body,
            image: req.file.filename
        }

        if(previousProduct.image) {
            const previousFile = path.join(__dirname, `../uploads/product/${previousProduct.image}`)
            fs.unlinkSync(previousFile, function (error) {
                return res.json(`Error al borrar la imagen anterior: ${error}`)
            })
        }
    }

    const product = await Product.findByIdAndUpdate(
        {_id: req.params.idProduct}, 
        newProduct, 
        {returnOriginal: false}
    )
    res.json(product)

}

exports.specificProduct = async (req=request, res=response) => {
    const isObjectId = mongoose.Types.ObjectId.isValid(req.params.idProduct) 
    if(!isObjectId) return res.json({msg: 'El idProduct no corresponde a un ObjectId válido', isError: true})
    const product = await Product.findById(req.params.idProduct)
    if(!product) return res.json({msg: 'Producto no encontrado', isError: true})
    res.json(product)
}

exports.getProducts = async (req=request, res=response) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.json({msg: 'Error al buscar', isError: true})
    }
}

exports.newProduct = async (req=request, res=response) => {
    try {
        let newProduct = req.body
        if(req.file) { 
            newProduct = {
                ...req.body, 
                image: req.file.filename 
            }
        }
        
        const product = await Product.create(newProduct)
        res.json(product)
    } catch (error) {
        const previousPath = path.join(__dirname, `../uploads/product/${req.file.filename}`)
        fs.unlinkSync(previousPath, function (error) {
            return res.json(`Error al borrar la imagen anterior: ${error}`)
        })

        if (error.name === 'MongoServerError' && error.code === 11000) {
			return res.json({ msg: 'El producto ya está registrado', isError: true });
		}
        res.json({ msg: `No se pudo crear: ${error}}`, isError: true});
    }
}

exports.searchProduct = async (req, res, bext) => {
    try {
        const { query } = req.params
        const product = await Product.find({name: new RegExp(query, "i")})
        res.json(product)
    } catch (error) {
        res.json({msg: 'Ha ocurrido un error en la búsqueda', isError: true})
    }
}