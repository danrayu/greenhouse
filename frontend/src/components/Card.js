import React from 'react'

const Card = (props) => {
  return (
    <div className='card mx-auto my-3 p-2 bg-light'>{props.children}</div>
  )
}

export default Card