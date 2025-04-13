import React from 'react';
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosRequest, getConfig} from "../../helpers/config.js";
import {toast} from "react-toastify";
import {addCouponToCart, setValidCoupon} from "../../redux/slices/cartSlice.js";

export default function Coupon() {
    const { token } = useSelector((state) => state.user);
    const [coupon, setCoupon] = useState({
        'name': '',
    })

    const dispatch = useDispatch();

    const apply = async () => {
        try {
            const response  = await axiosRequest.post('apply/coupon', coupon,
                getConfig(token))
            if (response.data.error) {
                toast.error(response.data.error)
                setCoupon({
                    name: ''
                })
            }else {
                dispatch((setValidCoupon(response.data.coupon)))
                dispatch((addCouponToCart(response.data.coupon.id)))
                setCoupon({
                    'name': '',
                })
                toast.success(response.data.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='row mb-3'>
            <div className="col-md-12">
                <div className="d-flex">
                    <input type="text"
                    value={coupon.name}
                    onChange={(e) =>
                        setCoupon({
                            ...coupon, name: e.target.value,
                        })}
                    className="form-control rounded-0"
                           placeholder='Enter a promo code'
                    />
                    <button className="btn btn-primary rounded-0"
                    disabled={!coupon.name}
                            onClick={apply}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}
