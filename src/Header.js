import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Button} from 'react-bootstrap'

import { useAuth } from './Context/AuthContext';
export default function Header() {
    const { currentUser, signout } = useAuth();
    const logout = (e) =>{
        e.preventDefault();
        signout();
    }
    return (
        <div>
            <Navbar
            collapseOnSelect
            expand="sm"
            style={{ backgroundColor: "rgb(38,39,48)",marginBottom:"1rem" }}
            className="px-2 shadow-sm"
            bg="dark" variant="dark"
            >
      <Navbar.Brand className="navbar-head" href="/" style={{color:"#faebd7", fontWeight: "bold"}}>
        Alumini Portal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav className="d-flex align-items-center">
          {!currentUser ? (<>
            <Link as={Link} className="nav-link" to="/login">
              Login
            </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <Link className="nav-link" to="/profile">{currentUser.displayName}</Link>
                <Button onClick={(e)=>logout(e)}>Log Out</Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        </div>
    )
}
