import React from 'react'
import Spinner from './spinner/spinner';
import Number from './number/number';
import './dashboard.css'

export default function Dashboard() {
  return (
    <div>
        <div className="container">
                <div className="row align-items-center">
                    <div className="col mb-3">
                        <Spinner percent={20} caption={"Approved Recipes"}></Spinner>
                    </div>
                    <div className="col mb-3">
                        <Spinner percent={90} caption={"New Contributions this month"}></Spinner>
                    </div>
                </div>
                <div className="row align-items-center mb-3">
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
            <div className="row justify-content-center mb-3">
                {/* Graph comes here */}
            </div>
            <div className="row justify-content-center mb-3">
                {/* Pending submissions come here */}
            </div>
            <div className="row justify-content-center mb-3">
                {/* Pending edits come here */}
            </div>

        </div>
        
    </div>
  )
}
