import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../auth/Logout'
import AuthContext from '../context/userContext'

const Navbar = () => {

    const {loggedIn, user} = useContext(AuthContext)
    
    
    
    return (
        <div className='nav-center flex'>
            <div className="logo">
               <Link to='/'> <h1>authsys</h1></Link>
            </div>
           
            <nav className="nav">
                <ul className="links flex">
                {
                    !loggedIn ?(
                        <>
                        <li>
                        <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/signup'>Sign up</Link>
                        </li>
                        <li className='logout-item'>
                            
                            <Link to='/login'>Login</Link>
                        </li>
                        </>
                    ):(
                       <> 
                       <li className='user-info'><i class='bx bxs-user-circle'></i>{user?.username}</li>

                        <li>
                            <Logout/>
                        </li>
                    </>
                    )
                }
                   
                </ul>
            </nav>
            
        </div>
    )
}

export default Navbar
