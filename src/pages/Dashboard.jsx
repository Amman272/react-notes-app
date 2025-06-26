
import Nav from "../components/Nav"
import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';
function Dashboard(){
    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    
    return(
        <div className="dashboard-root">
         <Nav />
         <div className="dashboard-content">
       <h1>Welcome, {user.name}!</h1>
     <p>you have written so far(some num) notes  and (some number here) letters</p>
         <button className="dashboard-btn" onClick={() => navigate('/Notes')}>Go to Notes</button>
        </div>
      </div>
    )
}

export default Dashboard