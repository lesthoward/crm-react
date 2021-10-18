import React, { Fragment, useContext, useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import { CRMContext } from '../../contex/AuthContext';
import OrderBox from './OrderBox';

const Orders = ({history}) => {
	const [orderArr, setOrderArr] = useState([]);
	const [auth] = useContext(CRMContext)
	useEffect(() => {
		const getOrder = async () => {
			const result = await axiosInstance.get('/order', {
				headers: {
					'Authorization': `Bearer ${auth.token}`
				}
			});
			setOrderArr(result.data);
		};
		if(auth.isAuth) {
			getOrder();
		} else {
			history.push('/login')
		}
	}, [orderArr]);


	return (
		<Fragment>
			<h2>Pedidos</h2>

			<ul className="listado-pedidos">
                {   
                    orderArr.length
                    ? orderArr.map(order => (
                        <OrderBox
                            key={order._id}
                            order={order}
                        />
                    ))
                    : <h3>No hay pedidos</h3>
                }
            </ul>
		</Fragment>
	);
};

export default Orders;
