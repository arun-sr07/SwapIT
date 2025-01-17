import { Link,useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');


    const handleApi = () => {
        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                toast.success('Signup successful!', {
                    onClose: () => navigate('/login') // Navigate when the toast closes
                });
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
                <h3> Welcome to Signup Page </h3>
                <br></br>
                USERNAME
                <input className="form-control" type="text" value={username}
                    onChange={(e) => {
                        setusername(e.target.value)
                    }} />
                <br></br>
                MOBILE
                <input className="form-control" type="text" value={mobile}
                    onChange={(e) => {
                        setmobile(e.target.value)
                    }} />
                <br></br>
                EMAIL
                <input className="form-control" type="text" value={email}
                    onChange={(e) => {
                        setemail(e.target.value)
                    }} />
                <br></br>
                PASSWORD
                <input className="form-control" type="text" value={password}
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }} />
                <br></br>
                <button className="btn btn-primary mr-3" onClick={handleApi}> SIGNUP </button>
                <Link className="m-3" to="/login">  LOGIN </Link>
            </div>
        </div>
    )
}

export default Signup;