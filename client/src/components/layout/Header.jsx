import React, { useContext } from 'react';
import { CRMContext } from '../../contex/AuthContext';

const Header = () => {
	const [auth, setAuth] = useContext(CRMContext);
	const logout = () => {
        setAuth({
            token: '',
            isAuth: false
        })
    };

	return (
		<header className="barra">
			<div className="contenedor">
				<div className="contenido-barra">
					<h1>CRM - Administrador de clientes</h1>
					{auth.isAuth ? (
						<button className="btn btn-rojo" onClick={logout}>
							<i className="far fa-times-circle"></i>
							Cerrar sesión
						</button>
					) : null}
				</div>
			</div>
		</header>
	);
};
export default Header;
