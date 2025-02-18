import React from 'react'
import { useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../../styles/login.css"
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function Login() {
  
  const [loginInput,setLoginInput] = useState({
    username:'',
    password:''
  })
  

  const navigate = useNavigate();

    // Check if user is already signed in
   /* useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        navigate('/'); // Redirect to homepage if user is signed in
        console.log("user data has been stored in the localstorage")
      }
      
      
    }, [navigate]); */


  const handleLogin=async(e)=>{
    e.preventDefault();
    console.log(loginInput);


    try {
      const response = await axios.post('https://chat-app-rosy-six.vercel.app/api/auth/login',loginInput);
      console.log(response);
     
      if(response.status === 201){
        toast.success("Login Successfull")
        navigate("/")
      }
       // Store user details in local storage
       const { username, password} = loginInput;
       localStorage.setItem('user', JSON.stringify({ username, password}));

       window.dispatchEvent(new Event('authChange')); // Notify App.js about the change
       navigate('/'); // Redirect to the homepage


    } catch (error) {

      console.log(error)
        if(error.response.status === 400){
    
        toast.error("Invalid Username or Password");
      }else{
        toast.error("Network Error");
      }
    }

  }
  

  return (
    <div className="login-container">
    <div className="login-box">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin} >
        <div className="input-group">
          <input type="text" placeholder="User Name" value={loginInput.username}
          onChange={(e)=>setLoginInput({...loginInput, username:e.target.value})}
          required />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" minLength={6} value={loginInput.password}
          onChange={(e)=>setLoginInput({...loginInput,password:e.target.value})}
          required />
        </div>
        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>
      <p className="signup-text">
        Not a member? <Link to ="/signup">Sign up now</Link>
      </p>
    </div>
  </div>
  )
}

export default Login
