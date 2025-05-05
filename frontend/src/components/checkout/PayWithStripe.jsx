import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import Stripe from "./Stripe.jsx";


export default function PayWithStripe() {
    const location = useLocation();
    const fromCheckout = location.state?.fromCheckout;
    const { isLoggedIn } = useSelector(state=>state.user)
    const { cartItems } = useSelector(state=>state.cart)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        // ✅ Only allow access if they came from checkout
        if (!cartItems.length && !fromCheckout) {
            navigate("/");
            return;
        }
    }, [isLoggedIn, cartItems, fromCheckout]);


    return (
                <Stripe />
    )
}
