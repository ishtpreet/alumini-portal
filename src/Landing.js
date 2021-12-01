import React from 'react'
import {useHistory} from 'react-router-dom'
// import {Button, Card, Container, Row, Col} from  'react-bootstrap'


import { useAuth } from './Context/AuthContext';

export default function Landing(){
    const { currentUser } = useAuth();
    let history = useHistory()
    if(!currentUser)
        history.push("/login")
    else
        history.push("/dashboard")
    return <></>
}