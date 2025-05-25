import axios from 'axios'
import React from 'react'
import { useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Signup() {

  const [inputs,setInputs] = useState({
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:''
  });



  const navigate = useNavigate();
 
  // Check if user is already signed in
 /* useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/'); // Redirect to homepage if user is signed in
      console.log("user data has been stored in the localstorage")
    }
  
  }, [navigate]); */
    
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);

    if(inputs.password !== inputs.confirmPassword){       // verifying password on the frontend
      toast.error("Passwords does'nt match")
    }

    if(!inputs.gender){
      toast.error("Please select your gender")
    }

    try {
      const response = await axios.post('https://chat-app-kw4y.onrender.com/api/auth/signup',inputs,{
        withCredentials:true
      });   // sending post request to the signup route using axios
      console.log(response);

      if(response.status === 201){
        toast.success("Signup Successfull")
        navigate("/")    // if signup was successful, navigating to homepage
      }

        
       // Store user details in local storage
       const { username, fullName, gender } = inputs;
       localStorage.setItem('user', JSON.stringify({ username, fullName, gender }));

       
       window.dispatchEvent(new Event('authChange')); // Notify App.js about the change
       navigate('/'); // Redirect to the homepage

    } catch (error) {

        if(error.response.status === 409){
        console.log("user exixts")
        toast.error("username already exists")
      }else{
        toast.error("Network Error");
      }
      console.log(error);
    }
  }

  return (
    <div className="login-container">
    <div className="login-box">
      <h2>SIGNUP</h2>
      <form  onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="Full Name" value={inputs.fullName} 
          onChange={(e)=>setInputs({...inputs, fullName:e.target.value})}
          required />
        </div>

        <div className="input-group">
          <input type="text" placeholder="User Name" value={inputs.username} 
          onChange={(e)=>setInputs({...inputs, username:e.target.value})}
          required />
        </div>

       

        <div className="input-group">
          <input type="password" placeholder="Password" minLength={6} value={inputs.password}
          onChange={(e)=>setInputs({...inputs,password:e.target.value})}
          required />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Confirm Password" minLength={6} value={inputs.confirmPassword}
          onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
          required />
        </div>

        <div className="gender-option">
          <input type="radio" id="male" name="gender" value="male" onChange={(e)=>setInputs({...inputs,gender:e.target.value})} />
          <label>Male</label>
        </div>
        <div className="gender-option">
          <input type="radio" id="female" name="gender" value="female" onChange={(e)=>setInputs({...inputs,gender:e.target.value})}  />
          <label  >Female</label>
        </div>

        <button type="submit" className="login-button">
          SIGNUP
        </button>
      </form>
      <p className="signup-text">
        Already a member? <Link to="/login">Login now</Link>
      </p>
    </div>
  </div>
  )
}

export default Signup
