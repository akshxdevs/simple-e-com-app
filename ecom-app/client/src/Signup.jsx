import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const Signup = () => {
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
            const res = await axios.post("http://localhost:3000/signup",{
                username,
                email,
                password
            });
            
            toast.success('Signup sucessfull..')
            navigate('/login');
        } catch (error) {
            toast.error('ERROR!!')
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)} />
                <input type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} />
                <input type="text"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
            {showError && (
                <span>Please fill all the required fields!</span>
            )}
            <ToastContainer/>
        </div>
    );
}