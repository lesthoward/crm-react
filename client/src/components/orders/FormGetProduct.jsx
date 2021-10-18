import React, { Fragment } from 'react';
const FormGetProduct = ({ searchProduct, getSearchData }) => {
	return (
		<Fragment>
			<form onSubmit={searchProduct}>
				<legend>Busca un Producto y agrega una cantidad</legend>

				<div className="campo">
					<label>Productos:</label>
					<input
						type="text"
						placeholder="Nombre Productos"
						name="productos"
						onChange={getSearchData}
					/>
				</div>

				<input
					type="submit"
					className="btn btn-azul btn-block"
					value="Buscar producto"
				/>
			</form>
		</Fragment>
	);
};

export default FormGetProduct;
