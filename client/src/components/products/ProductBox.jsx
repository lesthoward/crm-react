import React, { Fragment } from 'react';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import axiosInstance from '../../config/axios';

const ProductBox = ({ product }) => {
	const { _id, name, price, image } = product;
	
	const deleteProduct = () => {
		Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`product/${_id}`)
                .then(result => {
                    if(result.data.error) {
                        return Swal.fire({
                            title: 'Ha ocurrido un error',
                            text: result.data.msg,
                            icon: 'error',
                            timer: 2500,
                        });
                    }
                    Swal.fire(
                      'Eliminado!',
                      result.data.msg,
                      'success'
                    )
                })
            }
          })
	};

	return (
		<Fragment>
			<li className="producto">
				<div className="info-producto">
					<p className="nombre">{name}</p>
					<p className="precio">${price}</p>
					{image ? (
						<img
							src={`${window.location.protocol}//${window.location.hostname}:8000/product/${image}`}
							alt={name}
						/>
					) : null}
				</div>
				<div className="acciones">
					<Link to={`/products/edit/${_id}`} className="btn btn-azul">
						<i className="fas fa-pen-alt"></i>
						Editar Producto
					</Link>

					<button
						type="button"
						className="btn btn-rojo btn-eliminar"
						onClick={() => deleteProduct()}
					>
						<i className="fas fa-times"></i>
						Eliminar Producto
					</button>
				</div>
			</li>
		</Fragment>
	);
};

export default ProductBox;
