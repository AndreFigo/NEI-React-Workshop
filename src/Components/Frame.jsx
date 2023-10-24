import React from 'react'

function Frame(props) {
  return (
    <div className='frame'>
      <div className='left-rect'></div>
      <div className='right-rect'></div>
      <div className='container'>
        {props.children}
      </div>
    </div>
  )
}

export default Frame