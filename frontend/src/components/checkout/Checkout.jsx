import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Coupon from "../coupon/Coupon.jsx";
import { toast } from "react-toastify";
import { setValidCoupon} from "../../redux/slices/cartSlice.js";
import {Link, useNavigate} from "react-router-dom";
import Alert from "../layouts/Alert.jsx";
import UpdateUser from "../user/UpdateUser.jsx";

export default function Checkout() {
    const { cartItems, validCoupon } =useSelector(state => state.cart)
    const { user, isLoggedIn } = useSelector(state => state.user)
    const total = cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0)
    const discount = () => {
        return validCoupon?.discount && total * validCoupon?.discount / 100
    }
    const finalTotal = () => {
        return total - discount()
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedIn) navigate("/login")
    },[isLoggedIn])
    const removeCoupon = () => {
        dispatch(setValidCoupon({
            'name': '',
            'discount': 0
        }))
        toast.success('Coupon Removed')

    }

    return (
        <div className='card mb-5'>
            <div className="card-body">
                <div className="row my-5">
                    <div className="col-md-7">
                        {/*user information */ }
                        <UpdateUser profile={false}/>
                    </div>
                    <div className="col-md-5">
                        {/*coupon */}
                        <Coupon/>

                        <ul className="list-group">
                            {
                                cartItems.map((item) => (
                                    <li key={item.ref} className="list-group-item d-flex">
                                        <img src={item.image}
                                             width={60}
                                             height={60}
                                             className="card img-fluid rounded me-2"
                                             alt={item.name}/>
                                             <div className="d-flex flex-column">
                                                 <h5>
                                                    <strong>{item.name}</strong>
                                                 </h5>
                                                 <span className="text-muted">
                                                     <strong>Color : {item.color}</strong>
                                                 </span>
                                                 <span className="text-muted">
                                                     <strong>Size: {item.size}</strong>
                                                 </span>
                                             </div>
                                        <div className="d-flex flex-column ms-auto">
                                            <span className='text-muted'>
                                                {item.price}<i>x</i>{item.qty}
                                            </span>
                                            <span className='text-danger fw-bold'>
                                                {item.price}*{item.qty} TND
                                            </span>
                                        </div>
                                    </li>
                                ))
                            }
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="fw-bold">
                                    Discount {validCoupon?.discount}%
                                </span>
                                {
                                    validCoupon?.name && <span className="fw-normal text-danger">
                                                           {validCoupon?.name} <i className="bi bi-trash"
                                                           style={{cursor:'pointer'}}
                                                           onClick={() => removeCoupon()}
                                                         ></i></span>

                                }

                                <span className="fw-bold text-danger">
                                    - { discount() } TND
                                </span>
                            </li>
                            <li className="list-group-item d-flex d-flex justify-content-between">
                                <span className="fw-bold">
                                    Total
                                </span>
                                <span className="fw-bold">
                                    { finalTotal() } TND
                                </span>
                            </li>
                        </ul>
                        <div className="my-3">
                            {
                                user?.profile_completed ? (
                                    <Link
                                        to="/pay/order"
                                        state={{ fromCheckout: true }}
                                        className="btn btn-primary rounded-0"
                                    >
                                        Proceed to payment
                                    </Link>
                                ) : (
                                    <Alert content="Add your billing details" type="warning" />
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
