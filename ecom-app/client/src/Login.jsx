import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showError,setShowError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !username) {
            setShowError(true);
        }
        try {
            const res = await axios.post("http://localhost:3000/login",{
                email,
                password
            });
            const data = res.data;
            const userId = data.user.id;
            const username = data.user.name;
            localStorage.setItem("userid",userId);
            localStorage.setItem("username",username);
            toast.success('Login sucessfull..')
            navigate('/');
        } catch (error) {
            toast.error('ERROR!!')
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} />
                <input type="text"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {showError && (
                <span>Please fill all the required fields!</span>
            )}
            <ToastContainer/>
        </div>
    );
}