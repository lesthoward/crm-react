import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../config/axios';
import FormGetProduct from './FormGetProduct';
import FormQuantityProduct from './FormQuantityProduct';
const NewOrder = ({ match, history }) => {
	const { idClient } = match.params;
	const [client, setClient] = useState({});
	const { name, lastname, phone } = client;
	const [search, setSearch] = useState('');
	const [productArr, setProductArr] = useState([]);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		const getSpecificClient = async () => {
			const result = await axiosInstance.get(`/client/${idClient}`);
			setClient(result.data);
		};
		getSpecificClient();

        getTotal()
	}, [productArr]);

	const searchProduct = async (e) => {
		e.preventDefault();
		if (search == '') {
			return Swal.fire(
				'Error en la búsqueda',
				`Ingrese un dato real en la búsqueda`,
				'error'
			);
		}

		const result = await axiosInstance.post(`/product/search/${search}`);
		if (!result.data.length) {
			return Swal.fire(
				'Error en la búsqueda',
				`No hay resultados para: ${search}`,
				'error'
			);
		}

		const productResulting = result.data[0];
		productResulting.productID = result.data[0]._id;
		productResulting.quantity = 0;
		setProductArr([...productArr, productResulting]);
	};

	const getSearchData = (e) => {
		setSearch(e.target.value);
	};

	// UPDATE QUANTITY
	const newQuantity = (forSum, i) => {
		const allProduct = [...productArr];
		if (forSum === -1 && allProduct[i].quantity === 0) return;
		allProduct[i].quantity += forSum;
		setProductArr(allProduct);
	};

    const getTotal = () => {
        if(productArr.length === 0) return setTotal(0)
        let newTotal = 0
        productArr.map(product => newTotal += product.quantity * product.price)
        setTotal(newTotal)
    }

    const deleteProduct = idProduct => {
        const allProduct = productArr.filter(product => product.product !== idProduct)
        setProductArr(allProduct)
    }

	const makeOrder = async e => {
		e.preventDefault()
		const order = {
			clientID: idClient,
			order: productArr,
			total
		}
		await axiosInstance.post(`/order`, order)
		Swal.fire(
			'Has realizado un pedido',
			'success'
		)
		history.push('/order')
	}
	return (
		<Fragment>
			<h2>Nuevo Pedido</h2>
			<div className="ficha-cliente">
				<h3>Datos de Cliente</h3>
				<p>
					Nombre: {name} {lastname}
				</p>
				<p>Teléfono: {[phone]}</p>
			</div>
			<FormGetProduct
				searchProduct={searchProduct}
				getSearchData={getSearchData}
			/>

			<ul className="resumen">
				{productArr.map((product, index) => (
					<FormQuantityProduct
						key={index}
						product={product}
						newQuantity={newQuantity}
						index={index}
                        deleteProduct={deleteProduct}
					/>
				))}
			</ul>
			<div className="campo">
				<p className="total">Total a pagar: ${total}</p>
			</div>

			{total > 0 ? (
				<form
					onSubmit={makeOrder}
				>
					<input
						type="submit"
						className="btn btn-verde btn-block"
						value="Realizar pedido"
					/>
				</form>
			) : null}
		</Fragment>
	);
};

export default NewOrder;
