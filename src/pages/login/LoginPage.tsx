import React, { useState } from 'react'
import axios from "axios";
import Project from '../project/Project';
import { useNavigate } from "react-router-dom";
import "./loginPage.scss"
import { json } from 'stream/consumers';

const LoginPage = () => {
    
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:5000/api/login",{username, password})
            setUser(response.data);
            localStorage.setItem("token", JSON.stringify({token:response.data.accessToken}));
            // console.log(response.data.accessToken);
            navigate("/app/projects");
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="container">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <span className="formTitle">Login</span>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submitButton">
            Login
          </button>
        </form>
      </div>
  </div>
  )
}

export default LoginPage
