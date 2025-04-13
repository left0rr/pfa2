import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import { axiosRequest } from "../../helpers/config.js";
import Alert from "../layouts/Alert.jsx";
import Spinner from "../layouts/Spinner.jsx";
import { Parser } from "html-to-react";
import Slider from '../products/images/Slider.jsx'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice.js";

export default function Product() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [qty, setQty] = useState(1)
    const [error, setError] = useState('')
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate=useNavigate()

    useEffect(() => {
        const fetchProductBySlug = async () => {
            setLoading(true)
            try {
                const response = await axiosRequest.get(`product/${slug}/show`)
                setProduct(response.data.data)
                setLoading(false)
            }
            catch (error) {
                if (error.response?.status === 404) {
                    setError('Product not found');
                    // Redirect to home after 1 second
                    setTimeout(() => {
                        navigate('/'); // Navigate to home page
                    }, 1000); // 1000ms = 1 second
                }
                console.log(error)
                setLoading(false)
            }
        }
        fetchProductBySlug()
    }, [slug])

    const makeUniqueId = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter++
        }
        return result
    }

    const handleQtyChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value)); // Prevent qty from being less than 1
        setQty(value);
    }

    return (
        <div className='card my-5'>
            {
                error ?
                    <Alert content={error} type='danger' />
                    :
                    loading ?
                        <Spinner />
                        :
                        <>
                            <div className="row g-0">
                                <div className="col-md-4 p-2">
                                    <div>
                                        <Slider product={product} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 className='text-dark'>{product.name}</h5>
                                            <h6 className='badge bg-danger p-2'>${product?.price}</h6>
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        {Parser().parse(product?.description)}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex justify-content-start align-items-center mb-3">
                                            {
                                                product.sizes?.map(size => (
                                                    <span key={size.id}
                                                          onClick={() => setSelectedSize(size)}
                                                          style={{ cursor: 'pointer' }}
                                                          className={`bg-light text-dark me-2 p-1 fw-bold ${selectedSize?.id === size?.id ? 'border border-dark-subtle border-2' : ''}`}
                                                    >
                                                        <small>{size.name}</small>
                                                    </span>
                                                ))
                                            }
                                        </div>
                                        <div className='me-2'>
                                            {
                                                 product?.status <= 0 ?
                                                    <span className="badge bg-danger p-2">
                                                        Out Of Stock
                                                    </span>
                                                    :
                                                     <span className="badge bg-success p-2">
                                                        In Stock
                                                    </span>
                                            }
                                        </div>

                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                        {
                                            product.colors?.map(color => (
                                                <div
                                                    key={color.id}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`me-1 ${selectedColor?.id === color?.id ? 'border border-dark-subtle border-2' : ''}`}
                                                    style={{
                                                        backgroundColor: color.name.toLowerCase(),
                                                        height: '20px',
                                                        width: '20px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-6 mx-auto">
                                            <div className="mb-4">
                                                <input type="number" className='form-control'
                                                       placeholder="Quantity"
                                                       value={qty}
                                                       onChange={handleQtyChange}
                                                       min={1}
                                                       max={product?.qty > 1 ? product?.qty : 1}
                                                />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-dark"
                                                    disabled={!selectedColor || !selectedSize || product?.status == 0 || product?.qty == 0}
                                                    onClick={() => {
                                                        dispatch(addToCart({
                                                            product_id: product.id,
                                                            ref: makeUniqueId(10),
                                                            slug: product.slug,
                                                            name: product.name,
                                                            qty: parseInt(qty),
                                                            price: parseInt(product.price),
                                                            color: selectedColor?.name,
                                                            size: selectedSize?.name,
                                                            maxQty: parseInt(product.qty),
                                                            image: product.thumbnail,
                                                            coupon_id: null
                                                        }))
                                                        setSelectedColor(null)
                                                        setSelectedSize(null)
                                                        setQty(1)
                                                    }}
                                            >
                                                <i className="bi bi-cart-plus-fill"></i>{" "}
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </div>
    )
}
