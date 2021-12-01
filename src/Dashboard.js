import React from 'react'
import {useHistory} from 'react-router-dom'
// import {Button, Card, Container, Row, Col} from  'react-bootstrap'


import { useAuth } from './Context/AuthContext';
// import {firestore} from './Services/firebase'

export default function Dashboard() {
    // console.log(props)
    const { currentUser } = useAuth();
    let history = useHistory()
    if(!currentUser)
        history.push("/login")
    return (
        <div>
            {currentUser ? currentUser.uid : null}
        </div>
            
        
    )
}
