import {useEffect,useState,useContext} from "react";
import{useNavigate} from "react-router-dom";
import API from "../services/api";
import {AuthContext} from "../context/AuthContext"
import "../style.css"

function Dashboard(){
    const[details,setDetails]=useState([]);
    const[name,setName]=useState("");
    const[type,setType]=useState("");
    const[applied,setApplied]=useState("");
    const[important,setImportant]=useState("");
    const[result,setResult]=useState("");
    const[editingId,setEditingId]=useState(null);
    const{logout}=useContext(AuthContext);
    const navigate=useNavigate();
    const startEdit=(detail)=>{
        setEditingId(detail._id);
          setName(detail.name);
            setType(detail.type);
            setApplied(detail.applied);
            setImportant(detail.important);
            setResult(detail.result);
    }
    const fetchDetails=async()=>{
        try{
            const response=await API.get("/details");
            setDetails(response.data);
        }
        catch(err)
        {
          console.log(err);
        }
    };
    useEffect(()=>{
        fetchDetails();
    },[]);
    const createDetails=async(e)=>{
        e.preventDefault();
        try{
            const response=await API.post("/details",{name,type,applied,important,result});
            setDetails((prevDetails)=>[response.data,...prevDetails]);
            setName("");
            setType("");
            setApplied("");
            setImportant("");
            setResult("");
        }
        catch(err){
            console.log(err);
        }
    };
    const deleteDetails=async(id)=>{
        try{
            await API.delete(`/details/${id}`);
           setDetails(prevDetails =>prevDetails.filter(detail => detail._id !== id));}
       catch(err) {
            console.log(err);
        }
    };
    const updateDetails=async(e)=>{
        e.preventDefault();
        try{
            const response=await API.put(`/details/${editingId}`,{name,type,applied,important,result});
            setDetails(prevDetails=>prevDetails.map((detail)=>detail._id===editingId?response.data:detail));
            setEditingId(null);
            setName("");
            setType("");
            setApplied("");
            setImportant("");
            setResult("");

        }
        catch(err)
        {
            console.log(err);
        }
    };
    const handleLogout=()=>{
        logout();
        navigate("/login");
    }
    return(
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>All Application</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
                <form className="detail-form" onSubmit={editingId?updateDetails:createDetails}>
                    <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    <select value={type} onChange={(e)=>setType(e.target.value)}>
                         <option value="">Select Type</option>
                        <option value="Placement">Placement</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <input type="date" value={applied} onChange={(e)=>setApplied(e.target.value)}/>
                    <textarea placeholder="Content" value={important} onChange={(e)=>setImportant(e.target.value)}/>
                    <textarea placeholder="Result" value={result} onChange={(e)=>setResult(e.target.value)}/>
                       <button type="submit">{editingId?"Update":"Create"}</button>
                        </form>
                        <br/>
<div className="details-list">
    {details.length === 0 ? (
        <p>No applications found.</p>
    ) : (
        details.map((detail) => (
            <div className="detail-card" key={detail._id}>
                <h3>{detail.name}</h3>

                <p>
                    <strong>Type:</strong> {detail.type}
                </p>

                <p>
                    <strong>Applied:</strong> {detail.applied}
                </p>

                <p>
                    <strong>Important:</strong> {detail.important}
                </p>

                <p>
                    <strong>Result:</strong> {detail.result}
                </p>

                <button onClick={() => startEdit(detail)}>
                    Edit
                </button>

                <button
                    onClick={() => deleteDetails(detail._id)}
                >
                    Delete
                </button>
            </div>
        ))
    )}
</div>
                        
 </div>
        </div>
        
    );
}
export default Dashboard;