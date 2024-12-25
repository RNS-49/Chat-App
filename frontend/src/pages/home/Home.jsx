import React, { useState } from 'react'
import "../../styles/home.css"
import Sidebar from '../../components/Sidebar'
import Conversation from '../../components/Conversation'

function Home() {
  const [selectedUser,setSelectedUser]= useState(null);  // sending state and setState as props to diffrent components, so they can update it.
  return (
    <div className='home-page '>
      <Sidebar setSelectedUser={setSelectedUser}/> 
      <Conversation selectedUser={selectedUser}/>
    </div>
  )
}

export default Home
