import API from "../services/api";
import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import "../Register.css";
function Register(){
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("");
    const[name,setName]=useState("");
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await API.post("/auth/register",{name,email,password});
            navigate("/login");
        }
        catch (err) {
    console.log(err.response?.data);
    console.log(err.message);
}
    };
    return(
        <div className="page card">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <button type="submit">Register</button>
            </form>
            <p>Already have an account?
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
export default Register;