
import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

import'../styles/Login.css';

function Login(){
     const [isres,setisres]=useState(true)
const navigate = useNavigate();



 async function handlesubmit(event){
    event.preventDefault();
     const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
     //console.log(email,password,name)
    const data ={
        email,password,...(name&& {name})
    };
    try {
        const response = await axios.post('http://localhost:3000/login',data);
        const user= response.data;
        console.log(`this is the recived data --`,user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/Dashboard')

    } catch (error) {
        console.error(error);
        alert("Error: " + (error.response?.data || "Server error"));
    }
 

}
    return(
       
        <div>
       <form onSubmit={handlesubmit}>
            <div className="login-window">
             <p>{isres?"welcome back":"resgister yourself"}</p>

      <div>{isres?null: <><p>enter your name</p>
            <input type="text" name="name" /></>}</div>              
                <p>enter your email</p>
                <input type="text" name="email"placeholder="enter here"/>
                <p>enter your password</p>
                <input type="password"name="password" placeholder="enter here" />
                <br />
                
                <button type="submit" >{isres?'Login':'Register'}</button>
                
                <p>{isres?"no account ?":"already resgistred? ?"}</p>
                     <p className="switch-link" onClick={()=>{
                setisres(!isres)
            }}>click here</p>
            </div>
            </form>
        </div>
    )
}

export default Login