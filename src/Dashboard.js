import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-date-picker';
// import {Button, Card, Container, Row, Col} from  'react-bootstrap'


import { useAuth } from './Context/AuthContext';
// import {firestore} from './Services/firebase'

export default function Dashboard() {
    // console.log(props)
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const { currentUser } = useAuth();
    let history = useHistory()
    console.log(new Date())
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

console.log(maxDate);
    if(!currentUser)
        history.push("/login")
    return (
        <div>
             <DatePicker
            onChange={setAppointmentDate}
            value={appointmentDate}
            minDate={new Date()}
            maxDate={maxDate}
         />
         {/* Make a dropdown with time slots */}
        </div>
            
        
    )
}
