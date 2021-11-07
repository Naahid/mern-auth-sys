import React, { useState, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";


const SignUp = () => {
    const [username, setUsername] = useState()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const user = {username,email, password, confirmPassword}
            await axios.post('/users/register/', user)
            navigate('/login')

            

        }catch(err){
            console.error(err)
        }

    }

    return (
        <div className='sign-container'>
            <h1>Sign up</h1>

            <form onSubmit={handleSubmit} className="form-center">
                <div className="from-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='enter your username'
                        onChange={(e)=> setUsername(e.target.value)}
                     />
                </div>

                <div className="from-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='enter your email'
                        onChange={(e)=> setEmail(e.target.value)}
                     />
                </div>

                <div className="from-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        onChange={(e)=> setPassword(e.target.value)}
                     />
                </div>

                <div className="from-control">
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <input type="password" 
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                     />
                </div>
                

                <button type='submit' className="submit-btn">Sign Up</button>

            </form>

            <p>Already have an account ? 
            <Link to='/login' className='toggle-btn'>Login here</Link>
            </p>
        </div>
    )
}

export default SignUp
