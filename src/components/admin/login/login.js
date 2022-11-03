import React from 'react'
import './Login.css'
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';

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
        if (data.auth && (data.auth===true)) {
            setInvalidCred(false);
            localStorage.setItem("auth", data.auth);
            localStorage.setItem("token", data.token);
        }
        else {
            setInvalidCred(true);
        }
    }

    //add user input validation buha
    return (
        <>
    <div id="loginBg" className='container-fluid d-flex flex-grow-1 flex-column'>
        <div className="row d-flex flex-grow-1">
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
                <div id="loginImage" className="d-none d-lg-block my-auto"></div>
            </div>
            <div className="col-12 col-lg-6 p-3">
                <MDBContainer className='p-3 h-100 d-flex flex-column justify-content-center'>
                            <MDBCard className='mh-75 d-flex flex-column justify-content-center py-3 px-5'>
                            <MDBRow className='g-0'>
                            <MDBCardBody className='d-flex flex-column'>
                                <form>

                                    <div className="fs-2 fw-lighter text-center">Login</div>

                                    <div className="fs-5 mt-5 mb-2 fw-bold">Username</div>
                                    <MDBInput wrapperClass='mb-4' label='Username' type='username' onChange={handleChangeUsername} value={valueUsername} size="lg" />
                                    {(valueUsername === '' && showUsernameWarning) && <span className="text-danger">Please enter valid username</span>}
                                    <div className="fs-5 mb-2 fw-bold">Password</div>
                                    <MDBInput wrapperClass='mb-4' label='Password' type='password' onChange={handleChangePassword} value={valuePassword} size="lg" />
                                    {(valuePassword === '' && showPassWarning) && <span className="text-danger">Please enter valid password</span>}

                                    {invalidCred && <div className="alert alert-danger" role="alert">
                                        Incorrect Email/Password
                                    </div>}
                                    <div className="text-center"><MDBBtn className="mt-4 px-5" color='warning text-dark' size='xl' onClick={submit}>Login</MDBBtn></div>
                                    <div className="form-row">
                                    </div>
                                </form>
                            </MDBCardBody>

                    </MDBRow>
                    </MDBCard>
                </MDBContainer>
            </div>
        </div>
        </div>
        <div className="doodles"></div>
        </>        
    );
}

/* 

<MDBContainer>
            <div className='d-flex mt-5'></div>
            <div className='d-flex mt-5'></div>
            <MDBContainer className='mt-5'>

                <MDBCard shadow="5" className='mt-5'>

                    
                </MDBCard>
            </MDBContainer>
        </MDBContainer>

*/

