import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {axiosRequest} from "../../helpers/config.js";
import Spinner from "../layouts/Spinner.jsx";
import renderValidationErrors from "../custom/renderValidationErrors.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser, setLoggedInOut, setToken} from "../../redux/slices/userSlice.js";

export default function Login() {
    const { isLoggedIn } = useSelector(state => state.user);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    },[isLoggedIn])

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setValidationErrors([])
        setLoading(true);
        try {
            const response = await axiosRequest.post("/user/login", user);
            toast.success(response.data.message);
            console.log('Submitting:', user);
            // Simulate success
            setTimeout(() => {
                setLoading(false);
                if(response.data.error) {
                    toast.error(response.data.message);

                }else {
                    dispatch(setCurrentUser(response.data.user))
                    dispatch(setToken(response.data.access_token))
                    dispatch(setLoggedInOut(true));
                    toast.success(response.data.message);
                    navigate('/');
                }
            }, 1000);
        } catch (err) {
            if(err?.response?.status === 422) {
                setValidationErrors(err.response.data.errors);
            }
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className='row my-5'>
            <div className="col-md-6 mx-auto">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">Login</h5>
                    </div>
                    <div className="card-body">
                        <form className='mt-2' onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                />
                                { renderValidationErrors(validationErrors, 'email') }

                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password*</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="password"
                                />
                                { renderValidationErrors(validationErrors, 'password') }

                            </div>
                            <button type="submit" className="btn btn-dark btn-sm" disabled={loading}>
                                {loading ? 'Connecting...' : 'Connect'}
                            </button>
                            {loading && <Spinner animation="border" size="sm" />}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
