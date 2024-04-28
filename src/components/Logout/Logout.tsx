import React from 'react'
import {GoogleLogout} from 'react-google-login'
import { useNavigate } from 'react-router-dom';

const clientId = '885875161738-3518co9fk4acq16tgs29qgeru0vrshlp.apps.googleusercontent.com'

const Logout = () => {
  const navigate = useNavigate();
  const onSuccess = () =>{
    navigate("/");
    console.log("LOGOUT SUCCESS")
  }

  return (
    <div id='signOutButton'>
      <GoogleLogout 
      clientId={clientId}
      buttonText={"Logout"}
      onLogoutSuccess={onSuccess}/>
    </div>
  )
}

export default Logout