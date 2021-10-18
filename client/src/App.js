import React, { Fragment } from 'react';
// Functional Imports
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// All Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
// Client
import Clients from './components/clients/Clients';
import NewClient from './components/clients/NewClient'
import EditClient from './components/clients/EditClient';
// Products
import Products from './components/products/Products';
import EditProduct from './components/products/EditProduct';
import NewProduct from './components/products/NewProduct';
// Order
import Orders from './components/orders/Orders';
import NewOrder from './components/orders/NewOrder';
// Auth
import Login from './components/auth/Login';
import { CRMProvider, CRMContext } from './contex/AuthContext';



const App = () => {
	

    return  (
		<BrowserRouter>
			<Fragment>
				<CRMProvider>
					<Header/>
					<div className="grid contenedor contenido-principal">
						<Sidebar/>		

						<main className="caja-contenido col-9">
							<Switch>
								<Route exac path="/login" component={Login}/>

								<Route exac path="/orders/new/:idClient" component={NewOrder}/>
								<Route exac path="/orders" component={Orders}/>
									
								<Route exac path="/products/edit/:idProduct" component={EditProduct}/>
								<Route exac path="/products/new" component={NewProduct}/>
								<Route exac path="/products" component={Products}/>
								
								<Route exac path="/client/new" component={NewClient}/>
								<Route exac path="/client/:idClient" component={EditClient}/>
								<Route exac path="/" component={Clients}/>
							</Switch>
						</main>
					</div>
				</CRMProvider>
			</Fragment>
		</BrowserRouter>
	)
}
 
export default App;