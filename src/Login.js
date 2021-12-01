import React, {useRef, useState} from 'react'
import {Button, Card, Form, Alert} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import { useAuth } from './Context/AuthContext';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const { signin } = useAuth();

    const handleSignin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signin(email, password)
          .then((ref) => {
            setLoading(false);
            history.push('/dashboard');
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      };

    return (
        <div>
            <Card style={{ width: '25rem' }} bg="dark">
            <Card.Body>
                <Card.Title style={{textAlign:'center'}}>Login</Card.Title>
                {error ? (<Alert variant="danger">{error}</Alert>) : null}
             <Form>
               <Form.Group controlId="email">
                <Form.Label>
                  Email Address
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
               </Form.Group>
               <Form.Group controlId="password">
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control type="password" placeholder="Enter password" ref={passwordRef}/>
               </Form.Group>
               <br></br>
                <Button  disabled={loading} onClick={(e)=>handleSignin(e)}>Log In</Button>
            </Form>
            
            </Card.Body>
            </Card>
        </div>
    )
}
