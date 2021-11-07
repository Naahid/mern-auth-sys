import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import AuthContext from '../context/userContext';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')

    const {getLoggedIn} = useContext(AuthContext)
    

    const navigate = useNavigate()

const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(e.state);

    try{
        const user = {username,password}
        await axios.post('/users/login/', user)
        await getLoggedIn()
        navigate('/dashboard')        

    }catch(err){
        console.error(err)
    }

}
    return (
        <div className='sign-container'>
            <h1>Login</h1>

            <form onSubmit={handleSubmit} className="form-center">
                <div className="from-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='enter your username'
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                     />
                </div>

                
                <div className="from-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                     />
                </div>

               

                <button type='submit' className="submit-btn">Login</button>

            </form>
            <p>Don't you have an account ? 
            <Link to='/signup' className='toggle-btn'>sign-up here</Link>
 
            </p>
        </div>
    )
}

export default Login
