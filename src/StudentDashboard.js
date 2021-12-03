import React, {useState} from 'react'
import DatePicker from 'react-date-picker';
import {Button, Card, Container, Row, Col, Alert, Spinner, Toast} from  'react-bootstrap'
import firebase from 'firebase'
import {useCollectionData} from 'react-firebase-hooks/firestore'

import {firestore} from './Services/firebase'

export default function StudentDashboard(props) {
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [show, setShow] = useState(false);
    // console.log(new Date())
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    var appointmentCount = 0;
    const appointmentRef = firestore.collection('appointments')
    const [appointmentDetails, isLoading] = useCollectionData(appointmentRef.where("approverAction","==",false).orderBy('createdAt','desc'), {idField: 'id'})
    const [appointmentDetails2] = useCollectionData(appointmentRef, {idField: 'id'})
    if(appointmentDetails2){
        appointmentDetails2.forEach((appointment) => {
            if(appointment.bookedBy === props.studentName){
                appointmentCount++
            }
        })
    }
    // console.log(appointmentDetails)
    // console.log(err)
    const onChangeAppointmentTime = (e) =>{
        setAppointmentTime(e.target.value)
    }
    const bookAppointment = async (e) => {
        e.preventDefault();
        if(!appointmentTime){
            // console.log(appointmentDate.toDateString, appointmentTime)
            setError("All Fields are required")
            return
        }
        setError(null)
        setLoading(true)
        await appointmentRef.add({
            date: appointmentDate.toJSON().slice(0,10).replace(/-/g,'/'),
            timeSlot: appointmentTime,
            bookedBy: props.studentName,
            approved: false,
            approverAction: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setShow(true)
        setLoading(false)
        setSuccess("Appointment booked successfully")
    }
    return (
        <Container>
            <Row>
                <Col>
                <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body>Appointment Booked Successfully</Toast.Body>
                    </Toast>
                {isLoading ? <Spinner animation="border" style={{alignSelf: "center" }} /> : 
                (appointmentDetails && appointmentDetails.length > 0) ? <Alert style={{marginLeft: "25px", marginRight:"25px"}} variant="warning">Appointment Booking under approval. Please check by later</Alert> : (
                    (appointmentCount >= 2) ? <Alert style={{marginLeft: "25px", marginRight:"25px"}} variant="danger">You have reached the maximum number a student can book an appointment.</Alert> :
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
                )}
                </Col>
            </Row>
        </Container>
            
        
    )
}
