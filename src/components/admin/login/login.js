import React from 'react'
import Logo from './Login3.png'
import './Login.css'
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { Form } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Login() {
    const [showPassWarning, setShowPassWarning] = useState(false);
    const [showUsernameWarning, setShowUsernameWarning] = useState(false);

    const [invalidCred, setInvalidCred] = useState(false);

    const [valueUsername, setValueUsername] = useState('');
    const handleChangeUsername = (event) => {
        setValueUsername(event.target.value);
        setShowUsernameWarning(false)
    };

    const [valuePassword, setValuePassword] = useState('');

    const handleChangePassword = (event) => {
        setValuePassword(event.target.value);
        setShowPassWarning(false)
    };

    function submit(event) {
        event.preventDefault()
        if (valueUsername === '' || valuePassword === '') {
            setShowPassWarning(true)
            setShowUsernameWarning(true)
        }
        else {
            console.log(valueUsername, valuePassword)
            Login()
        }
    }
    async function Login() {
        var request = { 'username': valueUsername, 'password': valuePassword }
        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json' // The type of data you're sending
            },
            body: JSON.stringify(request) // The data
        })
        const data = await response.json();
        console.log(data)
        if (data.auth && (data.auth==true)) {
            setInvalidCred(false);
            localStorage.setItem("token", data.token);
        }
        else {
            setInvalidCred(true);
        }
    }

    //add user input validation buha
    return (
        <MDBContainer>
            <div className='d-flex mt-5'></div>
            <div className='d-flex mt-5'></div>
            <MDBContainer className='mt-5'>

                <MDBCard shadow="5" className='mt-5'>

                    <MDBRow className='g-0'>

                        <MDBCol md='6'>
                            <MDBCardImage src={Logo} alt="login form" width='610' height='550' className='rounded-start' />
                        </MDBCol>

                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>
                                <form>
                                    <div className='d-flex flex-row mt-3'></div>

                                    <div className="fs-2 fw-lighter mt-4 text-center">Login</div>

                                    <div className="fs-5 mt-5 mb-2 fw-bold">Username</div>
                                    <MDBInput wrapperClass='mb-4' label='Username' type='username' onChange={handleChangeUsername} value={valueUsername} size="lg" />
                                    {(valueUsername === '' && showUsernameWarning) && <span className="text-danger">Please enter valid username</span>}
                                    <div className="fs-5 mb-2 fw-bold">Password</div>
                                    <MDBInput wrapperClass='mb-4' label='Password' type='password' onChange={handleChangePassword} value={valuePassword} size="lg" />
                                    {(valuePassword === '' && showPassWarning) && <span className="text-danger">Please enter valid password</span>}

                                    {invalidCred && <div className="alert alert-danger" role="alert">
                                        Incorrect Email/Password
                                    </div>}
                                    <div className="text-center"><MDBBtn className="mt-4 px-5" color='dark' size='lg' onClick={submit}>Login</MDBBtn></div>
                                    <div className="form-row">
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        </MDBContainer>
    );
}

