

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckForm from './CheckForm';
import { axiosRequest , getConfig } from "../../helpers/config.js";
import { useSelector } from "react-redux";

export default function Stripe() {
    const stripePromise = loadStripe('pk_test_51RCVn8CfavnUvjPWaVovvzfWJ1M0hx4R8v7jONcPv3BjcLnORqqUSk25WjDeruyABfcxMdcOlPUZaHjgmFSJcDGS00WmM6vwca');
    const [clientSecret, setClientSecret] = useState("");
    const { cartItems } = useSelector(state => state.cart);
    const { token } = useSelector(state => state.user);

    useEffect(() => {
        fetchClientSecret();
    }, []);

    const fetchClientSecret = async () => {
        try {
            const response = await axiosRequest.post('pay/order', {
                cartItems,
            },getConfig(token));
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                stripePromise && clientSecret &&
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckForm />
                </Elements>
            }
        </>
    );
}




