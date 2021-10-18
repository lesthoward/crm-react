import React, { useState } from 'react';
import Swal from 'sweetalert2'
import axiosInstance from '../../config/axios';


const ClientForm = ({history}) => {
	const [client, setClient] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        company: ''
    });
	const handleChange = (e) => {
		setClient({
			...client,
			[e.target.name]: e.target.value,
		});
	};

    const validateClient = () => {
        const clientValues = Object.values(client)
        const emptyClient = clientValues.every(field => field !== '')
        return !emptyClient
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const newClient = await axiosInstance.post('/client', client)
        if(newClient.data.error) {
            return Swal.fire({
                title:'Ha ocurrido un error',
                text: newClient.data.msg,
                icon: 'error',
                timer: 2500
            })
        }
        history.push('/')
    }

	return (
		<>
			<h2>New Client</h2>
			<form
                onSubmit={handleSubmit}
            >
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input
						type="text"
						placeholder="Nombre de cliente"
						name="name"
                        onChange={handleChange}
					/>
				</div>

				<div className="campo">
					<label>Apellido:</label>
					<input
						type="text"
						placeholder="Apellido de cliente"
						name="lastname"
                        onChange={handleChange}
					/>
				</div>

				<div className="campo">
					<label>Empresa:</label>
					<input
						type="text"
						placeholder="Empresa de cliente"
						name="company"
                        onChange={handleChange}
					/>
				</div>

				<div className="campo">
					<label>Correo:</label>
					<input
						type="text"
						placeholder="Correo de cliente"
						name="email"
                        onChange={handleChange}
					/>
				</div>

				<div className="campo">
					<label>Teléfono:</label>
					<input
						type="text"
						placeholder="Teléfono de cliente"
						name="phone"
                        onChange={handleChange}
					/>
				</div>

				<div className="enviar">
					<input
						type="submit"
						className="btn btn-azul"
						value="Agregar Cliente"
                        disabled={ validateClient() }
					/>
				</div>
			</form>
		</>
	);
};
export default ClientForm
