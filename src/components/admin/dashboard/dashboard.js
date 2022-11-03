import React from 'react'
import Spinner from './spinner/spinner';
import Number from './number/number';
import './dashboard.css'
import { Graph } from './graph/graph';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-sm-12 col-xl-7">
                    <div className="inner-shadow d-flex flex-column p-4 h-100 justify-content-center">
                            <div className="row align-items-center">
                                <div className="col mb-3">
                                    <Spinner percent={20} caption={"Approved Recipes"}></Spinner>
                                </div>
                                <div className="col mb-3">
                                    <Spinner percent={90} caption={"New Contributions this month"}></Spinner>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col mb-3">
                                    <Number number={150} caption={"Total contributions"}></Number>
                                </div>
                                <div className="col mb-3">
                                    <Number number={20} caption={"Pending submissions"}></Number>
                                </div>
                                <div className="col mb-3">
                                    <Number number={15} caption={"Pending edits"}></Number>
                                </div>
                            </div>
                    </div>

                </div>
                <div className="col-sm-12 col-xl-5" style={{minHeight: "400px"}}>
                        {/* Buttons come here */}
                        <div className="inner-shadow row p-4 h-100">
                            <div className="col-sm-12 col-md-6 col-xl-12 mb-3">
                                <Link to='/pending/submissions' className="btn btn-dark pending-btn h-100 d-flex flex-column justify-content-center">
                                    <div className="row">
                                        <div id="sub" className="req" alt="" />
                                    </div>
                                    <div className="row">
                                        <p className='pending-text fs-4'>See Pending Submission Requests</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-12 mb-3">
                                <Link to='/pending/edits' className="btn btn-dark pending-btn h-100 d-flex flex-column justify-content-center">

                                    <div className="row">
                                        <div id="edit" className="req" alt="" />
                                    </div>
                                    <div className="row">
                                        <p className='pending-text fs-4'>See Pending Edit Requests</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                </div>
            </div>

            <div className="row">
                <div className="inner-shadow col-md-6 mt-3 p-4 mx-auto">
                    {/* Graph comes here */}
                    <Graph></Graph>
                </div>
            </div>
        </div>
    </div>
  )
}
