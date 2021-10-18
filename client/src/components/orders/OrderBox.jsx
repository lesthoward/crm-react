import React from 'react';
import axiosInstance from '../../config/axios';
const OrderBox = ({ order }) => {
	const { _id,clientID } = order;

    const deleteOrder = async () => {
        await axiosInstance.delete(`order/${_id}`)
    }

	return (
		<li className="pedido">
			<div className="info-pedido">
				{/* <p className="id">ID: {order.productID._id}</p> */}
				<p className="nombre">
					Cliente: {clientID.name} {clientID.lastname}
				</p>

				<div className="articulos-pedido">
					<p className="productos">Artículos Pedido: </p>
					<ul>
						{order.order.map((product) => (
							<li
                                key={product.productID._id}
                            >
								<p>{product.productID.name}</p>
								<p>Precio: ${product.productID.price}</p>
								<p>Cantidad: {product.quantity}</p>
							</li>
						))}
					</ul>
				</div>
				<p className="total">Total: ${order.total} </p>
			</div>
			<div className="acciones">
				<button type="button" className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteOrder()}
                >
					<i className="fas fa-times"></i>
					Eliminar Pedido
				</button>
			</div>
		</li>
	);
};

export default OrderBox;
