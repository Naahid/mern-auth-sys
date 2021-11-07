import React, { useContext } from 'react'

import AuthContext from '../context/userContext'

const Dashboard = () => {
    

    const {user} = useContext(AuthContext)
   
  
    return (
        <div className='dashboard-container'>
            <h1>Welcome to dashboard: {user?.username}</h1>
            <p>You are logged in from: <strong>{user?.email}</strong></p>
            
        </div>
    )
}

export default Dashboard
