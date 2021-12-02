import React, {useState} from 'react'
import DatePicker from 'react-date-picker';
import {Button, Card, Container, Row, Col, Alert, Spinner} from  'react-bootstrap'
import firebase from 'firebase'

import {firestore} from './Services/firebase'

export default function StudentDashboard(props) {
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    console.log(new Date())
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const appointmentRef = firestore.collection('appointments')

    const onChangeAppointmentTime = (e) =>{
        setAppointmentTime(e.target.value)
    }
    const bookAppointment = async (e) => {
        e.preventDefault();
        if(!appointmentTime){
            console.log(appointmentDate, appointmentTime)
            setError("All Fields are required")
            return
        }
        setError(null)
        setLoading(true)
        await appointmentRef.add({
            date: appointmentDate,
            timeSlot: appointmentTime,
            student: props.studentName,
            approved: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setLoading(false)
        setSuccess("Appointment booked successfully")
        console.log("Date",appointmentDate)
        console.log("Time",appointmentTime)
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card bg="dark"> 
                        <Card.Header>
                            <h3>Book Appointment</h3>
                        </Card.Header>
                        <Card.Title>
                        {error ? (<Alert style={{marginLeft: "25px", marginRight:"25px"}} variant="danger">{error}</Alert>) : null}
                        {success ? (<Alert style={{marginLeft: "25px", marginRight:"25px"}} variant="success">{success}</Alert>) : null}
                            </Card.Title>
                        <Card.Body>
             <form>
                <div className="form-group">
                    <label htmlFor="appointmentDate">Select a Date</label>
                    <DatePicker
                        className="form-control"
                        onChange={setAppointmentDate}
                        value={appointmentDate}
                        minDate={new Date()}
                        maxDate={maxDate}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="timeSlot">Time Slot</label>
                   <select className="form-control" id="timeSlot" required onChange={onChangeAppointmentTime} value={appointmentTime} defaultValue="">
                        <option value="" disabled>Select Time Slot</option>
                        <option value="1-2">1:00 PM - 2:00 PM</option>
                        <option value="4-5">4:00 PM - 5:00 PM</option>
                        <option value="6-7">6:00 PM - 7:00 PM</option>
                    </select>
                </div>
                <br />
                <Button type="submit" className="btn btn-primary" onClick={bookAppointment}>{loading && <Spinner animation="border"/>} Book Appointment</Button>
            </form>
                        </Card.Body>    
                    </Card>
                </Col>
            </Row>
        </Container>
            
        
    )
}
