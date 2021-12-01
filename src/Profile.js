import React from 'react'
import {Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import { useAuth } from './Context/AuthContext';


export default function Profile() {
    let history = useHistory();
    const { currentUser, signout } = useAuth();
    if(!currentUser)
        history.push('/login')
    const logout = (e) =>{
        e.preventDefault();
        signout();
        history.push("/login")
    }
    return (
        <div>
            {currentUser ? (
                <>
                <h1>Email: {currentUser.email}</h1>
                <br />
                {currentUser.photoURL}
                <h1>Name: {currentUser.displayName}</h1>
                <Button variant="warning" onClick={(e)=>logout(e)}>Log Out</Button>
                </>
            ): null}
        </div>
    )
}
