import {useNavigate,Link} from "react-router-dom";
import {useState} from "react";
import API from"../services/api";
import {useContext} from "react";
import{AuthContext} from "../context/AuthContext";
import "../Login.css";
function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const Navigate=useNavigate();
    const {login}=useContext(AuthContext);
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const response=await API.post("/auth/login",{email,password});
            login(response.data);
            Navigate("/dashboard");
        }
        catch(err)
        {
            console.log(err);
        }
    };
    return(
        <div className="page">
            <div className="card">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <br/>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account?
                    <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}
export default Login;