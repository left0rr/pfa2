import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "./partials/ProfileSidebar.jsx";
import Alert from '../layouts/Alert.jsx';

export default function Orders() {
    const { user, isLoggedIn } = useSelector(state => state.user)
    const navigate = useNavigate();
    const [ordersToShow, setOrdersToShow] = useState(5);

    useEffect(() => {
        if (!isLoggedIn) navigate('/login');
    }, [isLoggedIn]);

    const loadMoreOrders = async () => {
        if (ordersToShow >= user?.orders?.length) {
            return;
        } else {
            setOrdersToShow(prevOrdersToShow => prevOrdersToShow + 5);
        }
    }

    return (
        <div className="row my-5 p-5">
            <ProfileSidebar />
            <div className="col-md-8">
                <div className="card-body">
                    {/* Check if user has orders, otherwise show the alert */}
                    {user?.orders?.length > 0 ? (
                        <table className="table">
                            <thead>
                            <tr>
                                <th> # </th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Order Date</th>
                                <th>Delivered</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                user?.orders?.slice(0, ordersToShow).map((order, index) => (
                                    <tr key={order.index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="d-flex flex-column">
                                                {
                                                    order?.products?.map((product, productIndex) => (
                                                        <span
                                                            key={product.id || productIndex}
                                                            className="badge pastel-info my-1 rounded-0"
                                                            style={{
                                                                backgroundColor: '#B4F8C8',
                                                                color: '#1A1A40',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                                {product?.name}
                                                            </span>
                                                    ))
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column">
                                                {
                                                    order?.products?.map((product, productIndex) => (
                                                        <span
                                                            key={product.id || productIndex}
                                                            className="badge pastel-primary my-1 rounded-0"
                                                            style={{
                                                                backgroundColor: '#FBE7C6',
                                                                color: '#1A1A40',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                                {product?.price} TND
                                                            </span>
                                                    ))
                                                }
                                            </div>
                                        </td>
                                        <td>{order.qty}</td>
                                        <td>{order.total} TND</td>
                                        <td>{order?.created_at}</td>
                                        <td>
                                            {
                                                order.delivered_at ? (
                                                    <span
                                                        className="badge text-bg-light pastel-success my-1 rounded-0"
                                                        style={{
                                                            backgroundColor: '#A0E7E5',
                                                            color: '#1A1A40',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                            Delivered {new Date(order.delivered_at).toLocaleDateString()}
                                                        </span>
                                                ) : (
                                                    <span
                                                        className="badge text-bg-light pastel-warning my-1 rounded-0"
                                                        style={{
                                                            backgroundColor: '#FFAEBC',
                                                            color: '#1A1A40',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                            Pending
                                                        </span>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <Alert content='You did not pass any orders yet!' type='primary' />
                    )}
                    {
                        user?.orders?.length > 0 && ordersToShow < user?.orders?.length && (
                            <div className="d-flex justify-content-center my-3">
                                <button className="btn btn-sm btn-dark" onClick={loadMoreOrders}>
                                    <i className="bi bi-arrow-clockwise"></i> Load More
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
