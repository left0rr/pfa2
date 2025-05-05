import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import './Header.css'; // You'll create this for custom styles
import logo from '/darling-shop-logo2.png';
import {axiosRequest, getConfig} from "../../helpers/config.js";
import {setCurrentUser, setLoggedInOut, setToken} from "../../redux/slices/userSlice.js";
import {toast} from "react-toastify";

export default function Header() {
    const  cartItems  = useSelector(state => state.cart?.cartItems || []);

    const { isLoggedIn, token, user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await axiosRequest.get('user',getConfig(token))
                dispatch(setCurrentUser(response.data.user));
            }
            catch (error) {
                if(error.response.status === 401) {
                    dispatch(setCurrentUser(null));
                    dispatch(setToken(''));
                    dispatch(setLoggedInOut(false))
                }
                console.log(error)

            }
        }
        if(token) getLoggedInUser()
    },[token])

    const logoutUser = async () => {
        try {
            const response = await axiosRequest.post('user/logout',null,getConfig(token))
            dispatch(setCurrentUser(null));
            dispatch(setToken(''));
            dispatch(setLoggedInOut(false))
            toast.success(response.data.message)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="synthwave-header">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={logo}
                            height={90}
                            width={90}
                            alt="ダーリン Shop"
                            className="logo-image"
                        />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <i className="bi bi-house"></i> Home
                                </Link>
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                          <Link className="nav-link" to='/profile'>
                                            <i className="bi bi-person-circle"></i> {user?.name}
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/"
                                        onClick={()=>logoutUser()}>
                                            <i className="bi bi-box-arrow-right"></i> Logout
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            <i className="bi bi-pen"></i> Register
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            <i className="bi bi-key"></i> Login
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${cartItems.length > 0 ? 'cart-has-items' : ''}`}
                                    to="/cart"
                                >
                                    <i className="bi bi-cart"></i> Cart ({cartItems.length})
                                </Link>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

