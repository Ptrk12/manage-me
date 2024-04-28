import React from 'react';
import {GoogleLogin} from 'react-google-login'
import { useNavigate } from 'react-router-dom';

const clientId = '885875161738-3518co9fk4acq16tgs29qgeru0vrshlp.apps.googleusercontent.com'

function Login() {
  const navigate = useNavigate();
  const onSuccess = (res:any)=>{
    navigate("/app/projects");
    console.log("SUCCESS");
  }

  const onFailure = (res:any)=>{
    console.log("FAILED");
  }

  return(
    <div id='signInButton'>
      <GoogleLogin 
      clientId={clientId}
      buttonText='Login'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}/>
    </div>
  )
}

export default Login;