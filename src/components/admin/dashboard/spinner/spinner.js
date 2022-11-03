import './spinner.css'
import { SpinnerStyle } from './spinnercss';

export default function Spinner({numerator,denominator,caption}) {
  return (
    <SpinnerStyle numerator={numerator} denominator={denominator}>
      <div className="box">
        <div className="percent">
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70"></circle>
          </svg>
          <div className="number">
            <h2>{numerator}
            </h2>
          </div>
        </div>
        <h3 className="text">{caption}</h3>
      </div>
    </SpinnerStyle>
  )
  
}
