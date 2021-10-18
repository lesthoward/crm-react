import React from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../config/axios'
import Swal from 'sweetalert2'

const ClientBox = ({client}) => {
    const {name, company, lastname, email, phone, _id} = client

    const deleteClient = async id => {
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
                axiosInstance.delete(`client/${id}`)
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
    }
    return (
        <>
            <li className="cliente">
                <div className="info-cliente">
                    <p className="nombre">{name} {lastname}</p>
                    <p className="empresa">{company}</p>
                    <p>{email}</p>
                    <p>Tel: {phone}</p>
                </div>
                <div className="acciones">
                    <Link to={`/client/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Cliente
                    </Link>
                    <Link to={`/orders/new/${_id}`} className="btn btn-amarillo">
                        <i className="fas fa-plus"></i>
                        Solicitar Pedido
                    </Link>
                    <button type="button" className="btn btn-rojo btn-eliminar"
                        onClick={() => deleteClient(_id)}
                    >
                        <i className="fas fa-times"></i>
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </>
    )
}

export default ClientBox