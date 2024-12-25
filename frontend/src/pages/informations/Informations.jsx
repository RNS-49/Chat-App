import React from 'react'
import "../../styles/informations.css"
import { useNavigate } from 'react-router-dom'



function Informations() {

  const navigate = useNavigate();

  function goBack(){
  navigate('/');
  }
  return (
    <div>
      <section >
        <div className='info-section'>
        <h1>App Info</h1>
        <h6>App Name : ChatBridge</h6>
        <h6>Version : 1.0.0</h6>
        <h6>Developer : Renjith N S</h6>

        <h5>Description</h5>
        <p>ChatBridge is a dynamic chat platform built for seamless communication. Whether you're catching up with friends or collaborating with a team, ChatBridge ensures a secure, fast, and intuitive messaging experience.</p>
        <h5>Features</h5>
        <p>Real-time Messaging: Communicate instantly without delays. <br />

Elegant Design: A clean and responsive interface for all devices. <br />

Privacy-first: Your data stays confidential and secure. <br />

Offline Functionality: Access your recent chats anytime, anywhere. <br />

Cross-Device Sync: Stay connected on mobile and desktop seamlessly.
</p>
        <h5>Credits</h5>
        <p>Special thanks to everyone who contributed to the creation and testing of ChatBridge.</p>

        <button onClick={goBack}  className='btn btn-warning'>Go Back</button>
        </div>
      </section>
      
    </div>
  )
}

export default Informations
