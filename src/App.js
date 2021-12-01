import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {Container} from 'react-bootstrap'

import {AuthProvider} from './Context/AuthContext'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './Dashboard';
import Header from './Header'
import Profile from './Profile';

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <AuthProvider>
      <Header />
      <Container fluid className="App-header">
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile" component={Profile} />
    </Container>
      </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
