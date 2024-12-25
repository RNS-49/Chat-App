import { useState,useEffect } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Intro from './components/Intro'
import {Toaster} from 'react-hot-toast'
import Informations from './pages/informations/informations'

function App() {

  const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem('user')))  // authUser contains user credentials from localstorage(saved when user sihned in)

 // Event listener to update the authUser state
  useEffect(() => {
    const handleAuthChange = () => {
      setAuthUser(JSON.parse(localStorage.getItem('user')));
    };

    // Listen for authChange events
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

 
  return (
    <div>
     <Routes>
     
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path='/info' element={<Informations/>}/> 
      </Routes>
     <Toaster/>

    </div>
  )
}

export default App
