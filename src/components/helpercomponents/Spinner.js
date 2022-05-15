import React from 'react'

function Spinner() {
  return (
<div className="d-flex justify-content-center" style={{height:'100%', verticalAlign: 'middle'}}>
      <div className="spinner-border" role="status" style={{width: '6rem', height: '6rem', verticalAlign: 'middle'}}>
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
  )
}

export default Spinner