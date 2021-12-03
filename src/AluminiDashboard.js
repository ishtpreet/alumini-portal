import React from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'

import {firestore} from './Services/firebase'

export default function AluminiDashboard() {
    const appointmentRef = firestore.collection('appointments')
    const [appointments] = useCollectionData(appointmentRef.orderBy("date"), {idField: 'id'})
    console.log(appointments)
    const approveAppointment = async (id, e) => {
        e.preventDefault()
        await appointmentRef.doc(id).update({
            approverAction: true,
            approved: true
        })
    }
    const rejectAppointment = async (id, e) => {
        e.preventDefault()
        await appointmentRef.doc(id).update({
            approverAction: true,
            approved: false
        })
    }
    return (
        <Container>
            <Table striped bordered hover size="sm" variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions/Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments && appointments.map((appointment, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{appointment.bookedBy}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.timeSlot} PM</td>
                        <td>
                            {!appointment.approverAction ? (<><Button variant="primary" onClick={(e)=>approveAppointment(appointment.id, e)}>Approve</Button>{" "}<Button variant="danger" onClick={(e)=>rejectAppointment(appointment.id, e)}>Reject</Button></>) : (appointment.approved ? (<Button variant="success" disabled>Approved ✔️</Button>) : (<Button variant="danger" disabled>Rejected ❌</Button>))}
                            
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
        </Container>
    )
}
