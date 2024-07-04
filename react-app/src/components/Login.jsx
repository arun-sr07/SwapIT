import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                       
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        toast.success('Logged in successfully!', {
                            onClose: () => navigate('/') // Navigate when the toast closes
                        });
                       // navigate('/');
                    }else {
                        toast.error('Invalid credentials!');
                    }
                }else {
                    toast.error('Invalid credentials!');
                }
            })
            .catch((err) => {
                toast.error('Server error!');
            })
    }

    return (
        <div>
            <Header />
            <ToastContainer />
            <div className="p-3 m-3">
                <h3> Welcome to Login Page </h3>
                <br></br>
                USERNAME
                <input className="form-control" type="text" value={username}
                    onChange={(e) => {
                        setusername(e.target.value)
                    }} />
                <br></br>
                PASSWORD
                <input className="form-control" type="text" value={password}
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }} />
                <br></br>
                <button className="btn btn-primary mr-3" onClick={handleApi}> LOGIN </button>
                <Link className="m-3" to="/signup">  SIGNUP </Link>
            </div>
        </div>
    )
}

export default Login;