import React, {useEffect, useState} from 'react'
import ProductsList from "./products/ProductsList.jsx";
import { axiosRequest } from "../helpers/config.js";
import {useDebounce} from "use-debounce";
import Alert from "./layouts/Alert.jsx";
import Spinner from "./layouts/Spinner.jsx";


export default function Home() {
    const [products, setProducts] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [searchTerm, setsearchTerm] = useState('')
    const [message, setMessage] = useState('')
    const debouncedsearchTerm = useDebounce(searchTerm, 500)

    const handleColorSelectBox= (e)=> {
        setSelectedSize('')
        setsearchTerm('')
        setSelectedColor(e.currentTarget.value)
    }

    const handleSizeSelectBox= (e)=> {
        setSelectedColor('')
        setsearchTerm('')
        setSelectedSize(e.currentTarget.value)
    }

    const clearFilters= ()=> {
        setSelectedColor('')
        setSelectedSize('')
    }


    useEffect(() => {
        const fetchProducts = async () => {
            setMessage('')
            setLoading(true)
            try {
                if(selectedColor)
                {
                    const response=await axiosRequest(`products/${selectedColor}/color`)
                    setProducts(response.data.data)
                    setColors(response.data.colors)
                    setSizes(response.data.sizes)
                    setLoading(false)


                }else if(selectedSize) {
                    const response = await axiosRequest.get(`products/${selectedSize}/size`)
                    setProducts(response.data.data)
                    setColors(response.data.colors)
                    setSizes(response.data.sizes)
                    setLoading(false)

                }else if(debouncedsearchTerm[0]) {
                    const response = await axiosRequest.get(`products/${searchTerm}/find`)
                    if(response.data.data.length > 0) {
                        setProducts(response.data.data)
                        setColors(response.data.colors)
                        setSizes(response.data.sizes)
                        setLoading(false)

                    }else {
                        setProducts([])
                        setMessage("No products found")
                        setLoading(false)

                    }
                }else {
                    const response = await axiosRequest.get('products')
                    setProducts(response.data.data)
                    setColors(response.data.colors)
                    setSizes(response.data.sizes)
                    setLoading(false)


                }
            }
            catch (error) {
                console.log(error)
                setLoading(false)

            }
        }
        fetchProducts()
    },[selectedColor, selectedSize, debouncedsearchTerm[0]])
    return (
        <div className="row my-5">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="row">
                            {/*filter by color*/}
                            <div className="col-md-4 mb-2">
                                <div className="mb-2">
                                    <span className="fw-bold">
                                        Filter By color:
                                    </span>
                                </div>
                                <select name="color_id" id="color_id"
                                    defaultValue=""
                                    onChange={(e)=> handleColorSelectBox(e)}
                                    disabled={selectedSize || searchTerm}
                                    className='form-select'
                                >
                                    <option value="" disabled={!selectedColor}
                                    onChange={()=>clearFilters()}
                                    >
                                        All Colors
                                    </option>
                                    {
                                        colors.map(color=>(
                                            <option value={color.id}
                                                    key={color.id}
                                            >
                                                {color.name}
                                            </option>

                                        ))
                                    }
                                </select>
                            </div>
                            {/*filter by size*/}
                            <div className="col-md-4 mb-2">
                                <div className="mb-2">
                                    <span className="fw-bold">
                                        Filter By size:
                                    </span>
                                </div>
                                <select name="size_id" id="size_id"
                                        defaultValue=""
                                        onChange={(e)=> handleSizeSelectBox(e)}
                                        disabled={selectedColor || searchTerm}
                                        className='form-select'
                                >
                                    <option value="" disabled={!selectedSize}
                                            onChange={()=>clearFilters()}
                                    >
                                        All Sizes
                                    </option>
                                    {
                                        sizes.map(size=>(
                                            <option value={size.id}
                                                    key={size.id}
                                            >
                                                {size.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            {/*//filter by search searchTerm*/}
                            <div className="col-md-4 mb-2">
                                <div className="mb-2">
                                    <span className="fw-bold">
                                        Search:
                                    </span>
                                </div>
                                <form  className="d-flex">
                                    <input  className="form-control me-2"
                                            value={searchTerm}
                                            disabled={selectedColor || selectedSize}
                                            onChange={(e)=> setsearchTerm(e.target.value)}
                                            type="search"
                                            placeholder="Search..."
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    message ?
                        <Alert type='primary' content={message} />
                    :
                    loading
                    ?
                        <Spinner/>
                    :
                        <ProductsList products={products} />
                }
            </div>
        </div>

    )
}
