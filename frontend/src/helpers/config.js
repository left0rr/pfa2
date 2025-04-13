import axios from "axios";

export const axiosRequest = axios.create({
    baseURL: 'http://pfa2.test/api/',
})

export const getConfig = (token, contentType) => {
    const config = {
        headers: {
            'Content-Type': contentType || 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    return config
}
