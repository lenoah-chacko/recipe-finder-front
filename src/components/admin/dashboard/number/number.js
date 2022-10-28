import './number.css'

export default function Number({number,caption}) {
  return (
      <div className="box">
        <div className="number">
            <h2>{number}
            </h2>
        </div>
        <h3 className="text">{caption}</h3>
      </div>
  )
  
}
