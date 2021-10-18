import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../config/axios';
import { CRMContext } from '../../contex/AuthContext';
const Login = ({ history }) => {
	const [credential, setCredential] = useState({});
	const [auth, setAuth] = useContext(CRMContext);
	const handleChange = (e) => {
		setCredential({
			...credential,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axiosInstance.post('/login', credential);
			if (res.data.isError) {
				return Swal.fire('Ha ocurrido un error', '', 'error');
			}
			Swal.fire('Has iniciado sesión', 'success');
			setAuth({
				isAuth: true,
				token: res.data.msg,
			});
			history.push('/');
		} catch (error) {
			return Swal.fire('Ha ocurrido un error de CORS', '', 'error');
		}
	};

	return (
		<div className="login">
			<h2>Iniciar sesión</h2>
			<div className="contenedor-formulario">
				<form onSubmit={handleSubmit}>
					<div className="campo">
						<label>Correo</label>
						<input
							type="text"
							name="email"
							placeholder="Correo para iniciar sesión"
							onChange={handleChange}
						/>
					</div>
					<div className="campo">
						<label>Contraseña</label>
						<input
							type="password"
							name="password"
							placeholder="Contraseña personal"
							onChange={handleChange}
						/>
					</div>

					<input
						type="submit"
						value="Iniciar sesión"
						className="btn btn-verde btn-block"
					/>
				</form>
			</div>
		</div>
	);
};
export default Login;
