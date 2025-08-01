
import Nav from "../components/Nav"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';
import axios from "axios";

function Dashboard(){
    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    let [title,settitle]=useState("")
    let [content,setcontent]=useState("")
   async function getNumber(){
      try{
     const result= await axios.post("http://localhost:3000/notes/getNumtitle",{
userID:user.id
     })
     console.log(result.data.count);
settitle(result.data.count);
      }
      catch(e){
        console.log(e);
      }
      try {
         const result= await axios.post("http://localhost:3000/notes/getall",{
              userID:user.id});
        setcontent(result.data.totalLetters)
      } catch (error) {
        
      }
    }
    useEffect(()=>{
      getNumber();
    },[]);
    return(
        <div className="dashboard-root">
         <Nav />
         <div className="dashboard-content">
           <div className="dashboard-card">
             <h1>Welcome, {user.name}!</h1>
             <div className="dashboard-stats">
               <p>You have written <span className="stats-highlight">{title}</span> notes and <span className="stats-highlight">{content}</span> characters so far!</p>
             </div>
             <button className="dashboard-btn" onClick={() => navigate('/Notes')}>Go to Notes</button>
           </div>
        </div>
      </div>
    )
}

export default Dashboard