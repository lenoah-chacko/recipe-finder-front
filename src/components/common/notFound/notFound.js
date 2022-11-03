import React from 'react'
import Logo from './notFound.png'
import '../../visitor/visitorSearch/visitorSearch.css'
import { MDBContainer, MDBCardImage, MDBRow, MDBCol} from 'mdb-react-ui-kit';

export default function NotFound() {
  return (
    <>
    <div className="height" style={{marginTop:"100px"}}>

    <MDBContainer className='d-flex justify-content-center mt-5'>

            <MDBRow width="100" className="g-1 d-flex justify-content-center">

            <MDBCol md='6' className="d-flex justify-content-center">
                <MDBCardImage src={Logo} alt="login form" width='540' height='520' className='img-fluid rounded-start'/>
            </MDBCol>

            <MDBCol md='5'>
                <div className='d-flex justify-content-center mt-5'></div>
                <div className='d-flex justify-content-center mt-5'></div>
                <h2 className='d-flex fw-light text-center display-4 justify-content-center mt-5'>Recipe Not Found</h2>
                <p className='d-flex fw-lighter text-center fs-5 justify-content-center mt-5'>The page you are looking for no longer exists. Perhaps you can return back to the site's homepage and see if you can find what you are looking for.</p>
            </MDBCol>

            </MDBRow>

    </MDBContainer>
    <div className="doodles d-flex justify-content-center"></div>
    </div>
    </>
  )
}
