import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../config/axios';

const EditClient = ({ history, match }) => {
	const [client, setClient] = useState({
		name: '',
		lastname: '',
		email: '',
		phone: '',
		company: '',
	});
	const { idClient } = match.params;

	useEffect(() => {
        getSpecificClient();
        // eslint-disable-next-line
	}, []);
    
	const handleChange = (e) => {
        setClient({
			...client,
			[e.target.name]: e.target.value,
		});
	};
    
	const validateClient = () => {
        const clientValues = Object.values(client);
		const emptyClient = clientValues.every((field) => field !== '');
		return !emptyClient;
	};
    
	async function getSpecificClient() {
		const newClient = await axiosInstance.get(`/client/${idClient}`);
		setClient(newClient.data);
	}

	async function updateClient(e) {
		e.preventDefault();
		const updatedClient = await axiosInstance.put(
			`client/${client._id}`,
			client
		);

		if (updatedClient.data.error) {
			return Swal.fire({
				title: 'Ha ocurrido un error',
				text: updatedClient.data.msg,
				icon: 'error',
				timer: 2500,
			});
		}

		Swal.fire({
			title: 'Exito',
			text: updatedClient.data.msg,
			icon: 'success',
			timer: 2500,
		});
		history.push('/');
	}

	return (
		<>
			<h2>New Client</h2>
			<form onSubmit={updateClient}>
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input
						type="text"
						placeholder="Nombre de cliente"
						name="name"
						onChange={handleChange}
						value={client.name}
					/>
				</div>

				<div className="campo">
					<label>Apellido:</label>
					<input
						type="text"
						placeholder="Apellido de cliente"
						name="lastname"
						onChange={handleChange}
						value={client.lastname}
					/>
				</div>

				<div className="campo">
					<label>Empresa:</label>
					<input
						type="text"
						placeholder="Empresa de cliente"
						name="company"
						onChange={handleChange}
						value={client.company}
					/>
				</div>

				<div className="campo">
					<label>Correo:</label>
					<input
						type="text"
						placeholder="Correo de cliente"
						name="email"
						onChange={handleChange}
						value={client.email}
					/>
				</div>

				<div className="campo">
					<label>Teléfono:</label>
					<input
						type="text"
						placeholder="Teléfono de cliente"
						name="phone"
						onChange={handleChange}
						value={client.phone}
					/>
				</div>

				<div className="enviar">
					<input
						type="submit"
						className="btn btn-azul"
						value="Guardar cambios de cliente"
						disabled={validateClient()}
					/>
				</div>
			</form>
		</>
	);
};
export default EditClient;
