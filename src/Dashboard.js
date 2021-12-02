import React from 'react'
import {useHistory} from 'react-router-dom'
// import {Button, Card, Container, Row, Col} from  'react-bootstrap'


import { useAuth } from './Context/AuthContext';
import StudentDashboard from './StudentDashboard';
import AluminiDashboard from './AluminiDashboard';
// import {firestore} from './Services/firebase'

export default function Dashboard() {
    // console.log(props)
    const { currentUser } = useAuth();
    let history = useHistory()
    if(currentUser)
    var isAlumini = currentUser.uid === process.env.REACT_APP_ALUMINI_UID ? true : false 
    if(!currentUser)
        history.push("/login")
    return (
    <>
    {isAlumini ? <AluminiDashboard /> : <StudentDashboard studentName={currentUser.displayName} />}
    </>
    )
}
