import React from 'react';
const FormQuantityProduct = ({ product, newQuantity, index, deleteProduct }) => {
	const { name, price, quantity} = product;
	return (
		<li>
			<div className="texto-producto">
				<p className="nombre">{name}</p>
				<p className="precio">${price}</p>
			</div>
			<div className="acciones">
				<div className="contenedor-cantidad">
					<i
						className="fas fa-minus"
						onClick={() => newQuantity(-1, index)}
					></i>
					<p>{quantity}</p>
					<i
						className="fas fa-plus"
						onClick={() => newQuantity(1, index)}
					></i>
				</div>
				<button type="button" className="btn btn-rojo" onClick={() => deleteProduct(product.product)}>
					<i className="fas fa-minus-circle"></i>
					Eliminar Producto
				</button>
			</div>
		</li>
	);
};
export default FormQuantityProduct;
