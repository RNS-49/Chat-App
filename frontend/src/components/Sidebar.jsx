import React, { useState,useEffect } from 'react'
import "../styles/sidebar.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Conversation from './Conversation'
import Intro from './Intro'


function Sidebar({setSelectedUser}) {  //   setSelectedUser from home component


  const[users,getUsers]=useState([]);
 


  useEffect(()=>{
  
    const fetchUser = async()=>{
      try {
       
        axios.defaults.withCredentials = true;
        const response =await axios.get("https://chat-app-kw4y.onrender.com/api/users");
         console.log(response)
         getUsers(response.data)  // react does,nt immediatly update the state using setState.instead, it schedules the update
         console.log(users)
       } catch (error) {
    
       toast.error("Network Error");
      console.error("error fetching users data:",error);
      }
    }
    fetchUser();

  },[]);       


  useEffect(()=>{                      // this useState for monitoring the 'users' state . to confirm that the usersbeing updated correctly.
    console.log("users state updated",users);
  },[users]);
  

   const navigate = useNavigate();

   function handleSelectedUser(user){
     setSelectedUser(user);
   }


   function handleLogout(){
   localStorage.removeItem('user');
   window.dispatchEvent(new Event('authChange')); // Notify App.js about the change
    navigate('/login'); // Redirect to the login page
    toast.success("LogOut Succesfull")
    console.log("LogOut Success");
   }

   const handleAccountDeletion = async()=>{
    try {
      const response =await axios.delete('https://chat-app-kw4y.onrender.com/api/auth/drop');
     
      console.log(response)
      if(response.status === 200){
        toast.success("Account Deleted");
        getUsers([]);
        navigate("/login");
      }else{
        toast.error("Network Error")
      }
    } catch (error) {
      console.log("Error in account deletion", error)
        }
   } 

   function handleInfo(){
    navigate("/info");
   }


   const handleShare = async () => {
    const shareData = {
      title: "ChatBridge",
      text: "Check out ChatBridge, a modern chat application for seamless communication!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
        alert("Sharing canceled or failed.");
      }
    } else {
      // Fallback for unsupported browsers
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard! Share it with your friends.");
      } catch (error) {
        console.error("Failed to copy link:", error);
        alert("Your browser doesn't support sharing. Link copy failed.");
      }
    }
  };



 const isSelected = false;
  return (
   <div className="chat-app">
   <div className="search-bar">
     <input type="text" placeholder="Search users..." />
     <button>
       <i className="fas fa-search"></i>
     </button>
   </div>
   <hr />

  
   <div className="user-list"  >
   {users.map((user)=>(
     <div onClick={()=>handleSelectedUser(user)} className="user-card">
       <img className='profile' src={user.profilePic} alt="profile" />
      
       <span>{user.fullName}</span>
    
     </div> 
        ))}
   </div>
  

<hr />
   <div className='bottombar-icons'>
   <i title='LogOut' onClick={handleLogout} class="fa-solid fa-right-from-bracket"></i>
   <i title='Delete Account' onClick={handleAccountDeletion} class="fa-solid fa-trash"></i>
   <i title='App Info' onClick={handleInfo}  class="fa-regular fa-circle-question"></i>
   <i title='invite a friend' onClick={handleShare} class="fa-solid fa-user-group"></i>
   </div>
 </div>
  )
}

export default Sidebar
