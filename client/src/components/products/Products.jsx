import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../config/axios';
import { CRMContext } from '../../contex/AuthContext';
import ProductBox from './ProductBox';

const Products = ({history}) => {
	const [productArr, setProductArr] = useState([]);
	const [auth] = useContext(CRMContext)
	useEffect(() => {
		if(auth.isAuth) {
			getProducts();
		} else {
			history.push('/login')
		}
	}, [productArr]);

	async function getProducts() {
		const products = await axiosInstance.get('/product', {
			headers: {
				'Authorization': `Bearer ${auth.token}`
			}
		});
		setProductArr(products.data);
	}

    

	return (
		<Fragment>
			<h2>Products</h2>
            
			<Link to={'/products/new'} className="btn btn-verde nvo-cliente">
				{' '}
				<i className="fas fa-plus-circle"></i>
				Nuevo Producto
			</Link>

			<ul className="listado-productos">
				{ productArr.length ? (
					productArr.map((product) => (
						<ProductBox key={product._id} product={product} />
					))
				) : (
					<h3>No hay productos registrados</h3>
				)}
			</ul>
		</Fragment>
	);
};

export default Products;
