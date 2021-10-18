import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2'
import axiosInstance from '../../config/axios';

const NewProduct = ({history}) => {
	const [product, setProduct] = useState({
		name: '',
		price: '',
		image: '',
	});

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

        const newProduct = await axiosInstance.post('product', formData, {
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
            'Product creado',
            newProduct.data.msg,
            'success'
        )
        history.push('/products')
    }
	return (
		<Fragment>
			<h2>Nuevo Producto</h2>

			<form onSubmit={addProduct}>
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input
						type="text"
						placeholder="Nombre de producto"
						name="name"
						onChange={handleChange}
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
					/>
				</div>

				<div className="campo">
					<label>Imagen:</label>
					<input type="file" name="image" onChange={handleImage} />
				</div>

				<div className="enviar">
					<input
						type="submit"
						className="btn btn-azul"
						value="Agregar Producto"
						disabled={isEmpty()}
					/>
				</div>
			</form>
		</Fragment>
	);
};

export default NewProduct;
