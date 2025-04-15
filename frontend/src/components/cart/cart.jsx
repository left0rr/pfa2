import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import Alert from "../layouts/Alert.jsx";
import {decrementQty, incrementQty, removeFromCart} from "../../redux/slices/cartSlice.js";
import {Link} from "react-router-dom";
import { ChevronUp, ChevronDown } from "lucide-react";
export default function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    return (
        <div className='row my-4 '>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        {
                            cartItems.length > 0 ?
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={index}>

                                                <td>{index +1}</td>
                                                <td>
                                                    <img src={item.image}
                                                         alt={item.name}
                                                    width={60}
                                                    height={60}
                                                    className="img-fluid rounded"/>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <ChevronUp
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => dispatch(incrementQty(item))}
                                                    />

                                                    <span>{item.qty}</span>

                                                    <ChevronDown
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => dispatch(decrementQty(item))}
                                                    />

                                                </td>
                                                <td>{item.price} TND</td>
                                                <td>{typeof item.color === 'object' ? item.color?.name : item.color}
                                                    <div
                                                        className="me-1 border border-light-subtle border-2"
                                                        style={{
                                                            backgroundColor: typeof item.color === 'object'
                                                                ? item.color?.name?.toLowerCase()
                                                                : item.color?.toLowerCase(),
                                                            height: '20px',
                                                            width: '20px',
                                                        }}
                                                    >
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="bg-light text-dark me-2 px-2 py-1 fw-bold border border-secondary rounded-pill">
                                                            <small>{item.size}</small>
                                                    </span>


                                                </td>
                                                <td>{item.qty*item.price} TND</td>
                                                <td>
                                                    <i
                                                        className="bi bi-trash text-danger"
                                                        onClick={() => dispatch(removeFromCart(item))}
                                                        style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                                    ></i>

                                                </td>
                                            </tr>
                                            ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-items-center">
                                    <div className="border border-dark border-2 fw-bold p-2 rounded">
                                        TOTAL: {cartItems.reduce((total, item) => total + (item.qty * item.price), 0)}
                                    </div>
                                </div>
                            </>
                                :
                                <Alert content='Your cart is Empty'
                                type='primary'/>
                        }
                    </div>
                    <div className="my-3 d-flex justify-content-end">
                        <Link
                            to="/"
                            className="btn rounded-0 mx-2 text-white fw-semibold"
                            style={{
                                background: 'linear-gradient(135deg, #d4a5ff, #a6c1ee)',
                                border: '1px solid #c28fff',
                                boxShadow: '0 4px 12px rgba(180, 140, 255, 0.4)',
                                color: '#fff',
                                fontWeight: '600',
                                padding: '10px 20px',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease-in-out',
                                filter: 'brightness(1)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                        >
                            Continue Shopping
                        </Link>

                        {cartItems.length > 0 && (
                            <Link
                                to="/checkout"
                                className="btn rounded-0 mx-2 text-white fw-semibold"
                                style={{
                                    background: 'linear-gradient(135deg, #ffb6b9, #fae3d9)',
                                    border: '1px solid #ff9aa2',
                                    boxShadow: '0 4px 12px rgba(255, 182, 185, 0.4)',
                                    color: '#fff',
                                    fontWeight: '600',
                                    padding: '10px 20px',
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.3s ease-in-out',
                                    filter: 'brightness(1)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                            >
                                Checkout
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
