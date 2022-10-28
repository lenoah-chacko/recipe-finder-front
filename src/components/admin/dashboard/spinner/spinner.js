import './spinner.css'
import { SpinnerStyle } from './spinnercss';

export default function Spinner({percent,caption}) {
  return (
    <SpinnerStyle percent={percent}>
      <div className="box">
        <div className="percent">
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70"></circle>
          </svg>
          <div className="number">
            <h2>{percent}
            </h2>
          </div>
        </div>
        <h3 className="text">{caption}</h3>
      </div>
    </SpinnerStyle>
  )
  
}
