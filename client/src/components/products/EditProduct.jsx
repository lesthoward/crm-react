import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import axiosInstance from '../../config/axios';

const EditProduct = ({history, match}) => {
	const [product, setProduct] = useState({
		name: '',
		price: '',
		image: '',
	});

	const { idProduct } = match.params
	const [defaultImage, setDefaultImage] = useState('')
	useEffect(() => {
		const getSpecificProduct = async () => {
			const specificProduct = await axiosInstance.get(`product/${idProduct}`)
			setProduct(specificProduct.data)
			setDefaultImage(specificProduct.data.image)
		}
		getSpecificProduct()
	}, [])
	const {name, price } = product


	const handleChange = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};

	const handleImage = (e) => {
		setProduct({
			...product,
			image: e.target.files[0],
		});
	};

	const isEmpty = () => {
		const productValues = Object.values(product);
		const isEmptyField = productValues.every((field) => field !== '');
		return !isEmptyField;
	};

    const addProduct = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('price', product.price)
        formData.append('image', product.image)

        const newProduct = await axiosInstance.put(`product/${idProduct}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if(newProduct.data.isError) {
            return Swal.fire(
                'Ha ocurrido un error',
                newProduct.data.msg,
                'error'
            )
        }

        Swal.fire(
            'Producto Editado',
            newProduct.data.msg,
            'success'
        )
        history.push('/products')
    }
	return (
		<Fragment>
			<h2>Editar Producto</h2>

			<form onSubmit={addProduct}>
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input
						type="text"
						placeholder="Nombre de producto"
						name="name"
						onChange={handleChange}
						defaultValue={name}
					/>
				</div>

				<div className="campo">
					<label>Precio:</label>
					<input
						type="number"
						name="price"
						min="0.00"
						step="5"
						placeholder="Precio de producto"
						onChange={handleChange}
						defaultValue={price}
					/>
				</div>

				{
					defaultImage 
					? <img src={`http://localhost:8000/product/${defaultImage}`} alt={name}/>
					: null
				}
				<div className="campo">
					
					<label>Imagen:</label>
					<input type="file" name="image" onChange={handleImage} />
				</div>


				<div className="enviar">
					<input
						type="submit"
						className="btn btn-azul"
						value="Guardar cambios de producto"
						disabled={isEmpty()}
					/>
				</div>
			</form>
		</Fragment>
	);
};

export default EditProduct;
