import React, { Fragment, useContext, useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import { Link } from 'react-router-dom'
import ClientBox from './ClientBox';
import { CRMContext } from '../../contex/AuthContext';


const Clients = ({history}) => {


    const [clientsArr, setClientsArr] = useState([]);
	const [auth, setAuth] = useContext(CRMContext)

	useEffect(() => {
		if(auth.isAuth) {
			getClients();
		} else {
			history.push('/login')
		}
	}, [clientsArr]);

	async function getClients() {
		const clients = await axiosInstance.get('/client', {
			headers: {
				'Authorization': `Bearer ${auth.token}`
			}
		});
		setClientsArr(clients.data);
	}

	return (
		<Fragment>
			<h2>Clients</h2>

			<Link to={"/client/new"} className="btn btn-verde nvo-cliente">
				<i className="fas fa-plus-circle"></i>
				Nuevo Cliente
			</Link>

			<ul className="listado-clientes">
				{
				clientsArr.length 
				? clientsArr.map((client) => (
					<ClientBox key={client._id} client={client} />
				))
				: <h3>No hay clientes registrados</h3>
				}
			</ul>
		</Fragment>
	);
};

export default Clients;
