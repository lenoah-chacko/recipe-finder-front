import React, { useEffect, useState } from 'react'
import Spinner from './spinner/spinner';
import Number from './number/number';
import './dashboard.css'
import { Graph } from './graph/graph';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [stats,setStats]=useState({"ApprovedRecipes":0,"NewContributionsThisMonth":0,"TotalContributions":0,"PendingSubmissions":0,"PendingEdits":0})
    async function getStats(){
        console.log("getting data")
          const response = await fetch("http://localhost:4000/api/admin/get-stats")
          await response.json().then((data)=>{            
          console.log("got",data)
          setStats(data)
        })
      }
      useEffect(()=>{
        getStats()
      },[])
  return (
    <div>
        <div id="dashboardbg" className='h-100'>
            <div id="dashboardcontent" className="container-fluid p-3 h-100">
                    <div className="row">
                        <div className="col-sm-12 col-xl-7">
                            <div className="inner-shadow d-flex flex-column p-4 h-100 justify-content-center">
                                    <div className="row align-items-center">
                                        <div className="col mb-4">
                                            <Spinner numerator={stats.ApprovedRecipes} denominator={stats.TotalContributions} caption={"Approved Recipes"}></Spinner>
                                        </div>
                                        <div className="col mb-4">
                                            <Spinner numerator={stats.NewContributionsThisMonth} denominator={stats.TotalContributions} caption={"New Contributions in the last 30 days"}></Spinner>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col mb-4">
                                            <Number number={stats.TotalContributions} caption={"Total contributions"}></Number>
                                        </div>
                                        <div className="col mb-4">
                                            <Number number={stats.PendingSubmissions} caption={"Pending submissions"}></Number>
                                        </div>
                                        <div className="col mb-4">
                                            <Number number={stats.PendingEdits} caption={"Pending edits"}></Number>
                                        </div>
                                    </div>
                            </div>

                        </div>
                        <div className="col-sm-12 col-xl-5" style={{minHeight: "400px"}}>
                                {/* Buttons come here */}
                                <div className="inner-shadow row p-4 h-100">
                                    <div className="col-sm-12 col-md-6 col-xl-12 mb-3">
                                        <Link to='/pending/submissions' className="btn btn-light pending-btn h-100 d-flex flex-column justify-content-center">
                                            <div className="row">
                                                <div id="sub" className="req" alt="" />
                                            </div>
                                            <div className="row">
                                                <p className='pending-text fs-4'>See Pending Submission Requests</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-xl-12 mb-3">
                                        <Link to='/pending/edits' className="btn btn-light pending-btn h-100 d-flex flex-column justify-content-center">

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
    </div>
  )
}
