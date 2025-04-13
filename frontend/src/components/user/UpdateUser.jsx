import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {axiosRequest, getConfig} from "../../helpers/config.js";
import Spinner from "../layouts/Spinner.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../../redux/slices/userSlice.js";
export default function UpdateUser({profile}) {
    const { user, token } = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({
        phone_number: user?.phone_number,
        address: user?.address,
        city: user?.city,
        zip_code: user?.zip_code,
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const updateUserInfos= async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosRequest.put("/user/profile/update", userInfo ,getConfig(token))
            dispatch(setCurrentUser(response.data.user));
            setLoading(false);
            toast.success(response.data.message);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
            <div className="col-md-8">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">
                            {profile ? 'User Details': 'Billing Details'}
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className='mt-2' onSubmit={updateUserInfos}>
                            <div className="mb-3">
                                <label htmlFor="phone_number" className="form-label">Phone Number*</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={userInfo.phone_number || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    id="phone_number"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address*</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={userInfo.address || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    id="address"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City*</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={userInfo.city || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    id="city"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zip_code" className="form-label">Zip Code*</label>
                                <input
                                    type="text"
                                    name="zip_code"
                                    value={userInfo.zip_code || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    id="zip_code"
                                />
                            </div>
                            {
                                (!user?.profile_completed || profile) ? (
                                    <>
                                        <button type="submit" className="btn btn-dark btn-sm" disabled={loading}>
                                            {loading ? 'Updating...' : 'Update your profile'}
                                        </button>
                                        {loading && <Spinner animation="border" size="sm" />}
                                    </>
                                ) : null
                            }

                        </form>
                    </div>
                </div>
            </div>
    );
}
