import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import {axiosRequest} from "../../helpers/config.js";
import Spinner from "../layouts/Spinner.jsx";
import renderValidationErrors from "../custom/renderValidationErrors.jsx";
import {useSelector} from "react-redux";
export default function Register() {
    const { isLoggedIn } = useSelector((state) => state.user);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [validationErrors, setValidationErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) {
            navigate('/')
        }
    },[isLoggedIn]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors([]);
        setLoading(true);
        try {
            const response = await axiosRequest.post("/user/register", user);
            toast.success(response.data.message);
            console.log('Submitting:', user);
            // Simulate success
            setTimeout(() => {
                setLoading(false);
                navigate('/login'); // redirect to login after successful register
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
                        <h5 className="text-center mt-2">Register</h5>
                    </div>
                    <div className="card-body">
                        <form className='mt-2' onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="name"
                                />
                                { renderValidationErrors(validationErrors, 'name') }
                            </div>
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
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
                                {loading ? 'Registering...' : 'Submit'}
                            </button>
                            {loading && <Spinner animation="border" size="sm" />}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
