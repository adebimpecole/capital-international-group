import React from 'react'
import "./styles.css"

const Card = ({title, body}) => {
  return (
    <div className='card'>
        <div className='card_title'>{title}</div>
        <div className='card_text'>{body}</div>
        <div className='card_button'>Learn more</div>
    </div>
  )
}

export default Card