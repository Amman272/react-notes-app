
import Nav from "../components/Nav"
import React from "react";
import { useNavigate } from "react-router-dom";
function Dashboard(){
    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    console.log(user)
    return(
        <div> <Nav />
       <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
         <button onClick={() => navigate('/Notes')}>Go to Notes</button>
        </div>
      
    )
}

export default Dashboard