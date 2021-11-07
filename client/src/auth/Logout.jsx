import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import AuthContext from '../context/userContext'

const Logout = () => {
    const {getLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate()
    const loggedOut = async()=> {
        await axios.get('/users/logout')
        await getLoggedIn()
        navigate('/')
    }
    return (
       <button
            className='btn-logout'
            onClick={loggedOut}
            ><i class='bx bx-log-out'></i> Log out</button>
    )
}

export default Logout
