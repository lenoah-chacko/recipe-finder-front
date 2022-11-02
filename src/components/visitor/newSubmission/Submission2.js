import React from 'react'
import './Submission.css'
import Logo from './Submission2.jpeg'
import { MDBBtn, MDBRadio, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

export default function Submission() {
  return (
    <>
    <div className='d-flex mt-5'></div>
    <div className='d-flex mt-3'></div>
    <MDBContainer className='mt-5'>
    
            <MDBCard className='mt-5'>

                <MDBRow className='g-0'>
    
                <MDBCol md='6'>
                    <MDBCardImage src={Logo} alt="login form" width='650' height='700' className='rounded-start'/>
                </MDBCol>
    
                <MDBCol md='6'>
                    <MDBCardBody className='d-flex flex-column'>
    
                    <div className="d-flex flex-row mt-3"></div>
    
                    <div className="fs-3 fw-lighter text-center">Add a Recipe</div>
                    
                    <div className="mb-2 mt-4 fw-bold">Author</div>
                    <MDBInput wrapperClass='mb-4' id='formControlLg' type='author' size="lg"/>
 
                    <div className="mb-2 fw-bold">Title</div>
                    <MDBInput wrapperClass='mb-4' id='formControlLg' type='title' size="lg"/>
                    <div className='mb-2'>
                        <div className="mr-5 d-inline">
                            <input className="radio mr-1" type="radio" name="food_type" value="veg" />
                            <label className="radio-inline" for="flexRadioDefault1">
                                Veg
                            </label>
                        </div>
                        <div className="d-inline">
                            <input className="radio mr-1" type="radio" name="food_type" value="non_veg" />
                            <label className="radio-inline" for="flexRadioDefault2">
                                Non-Veg
                            </label>
                        </div>
                    </div>
                    <div className="mb-2 fw-bold">Ingredients</div>
                    <MDBTextArea rows={2} />

                    <div className="mb-2 mt-4 fw-bold">Preparation</div>
                    <MDBTextArea rows={3} />

                    <div className='d-flex flex-row mt-2'></div>
    
                    <div className="text-center"><MDBBtn className="mt-4 px-4" color='dark' size='lg'>Submit</MDBBtn></div>
    
                    </MDBCardBody>
                </MDBCol>
    
                </MDBRow>
            </MDBCard>
    
        </MDBContainer>
        </>
  )
}
