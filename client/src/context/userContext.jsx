import axios from "axios";
import { createContext, useState,useEffect } from "react";


const AuthContext = createContext();


const AuthContextProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState()
    const [user, setUser] = useState('')



    const getLoggedIn = async () => {
        const res = await axios.get('/users/loggedIn')
        setLoggedIn(res.data)
    }
    useEffect(() => {
        getLoggedIn()
    },[])

   
    const getUser = async()=> {
        const res = await axios.get('/users/current-user')
        setUser(res.data)
    }
    useEffect(()=> {
        getUser()
    },[ ])

    return ( 
        <AuthContext.Provider value={{loggedIn, getLoggedIn, user, getUser}}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContext;
export {AuthContextProvider}