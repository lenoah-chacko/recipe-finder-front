import React from 'react' // rfc shortcut
import Logo from './Login3.png'
import './Login.css'
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

export default function Login() {
    return (
    <MDBContainer>
        <div className='d-flex mt-5'></div>
        <div className='d-flex mt-5'></div>
        <MDBContainer className='mt-5'>
    
            <MDBCard shadow="5" className='mt-5'>

                <MDBRow className='g-0'>
    
                <MDBCol md='6'>
                    <MDBCardImage src={Logo} alt="login form" width='610' height='550' className='rounded-start'/>
                </MDBCol>
    
                <MDBCol md='6'>
                    <MDBCardBody className='d-flex flex-column'>
    
                    <div className='d-flex flex-row mt-3'></div>
    
                    <div className="fs-2 fw-lighter mt-4 text-center">Login</div>
  
                    <div class="fs-5 mt-5 mb-2 fw-bold">Username</div>
                    <MDBInput wrapperClass='mb-4' label='Username' type='username' size="lg"/>
 
                    <div class="fs-5 mb-2 fw-bold">Password</div>
                    <MDBInput wrapperClass='mb-4' label='Password' type='password' size="lg"/>
    
                    <div className="text-center"><MDBBtn className="mt-4 px-5" color='dark' size='lg'>Login</MDBBtn></div>
    
                    </MDBCardBody>
                </MDBCol>
    
                </MDBRow>
            </MDBCard>
    
        </MDBContainer>
    </MDBContainer>
    );
}

