import React, { useEffect, useState } from 'react'
import axios from "axios";
import Project from '../project/Project';
import { useNavigate } from "react-router-dom";
import "./loginPage.scss"
import { json } from 'stream/consumers';
import {gapi} from 'gapi-script'
import Login from '../../components/login/Login';


const clientId = '885875161738-3518co9fk4acq16tgs29qgeru0vrshlp.apps.googleusercontent.com'

const LoginPage = () => {
    
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      function start(){
        gapi.client.init({
          clientId:clientId,
          scope:""
        })
      };
      gapi.load('client:auth2',start)
    })

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
      <Login />
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
