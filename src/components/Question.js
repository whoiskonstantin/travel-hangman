import React from 'react'

export default function Question({ country, dash }) {
  return (
    <div className='question'>
      <h2>What is the capital of {country}?</h2>
      <ul className='border'>
        {dash.map((item, index) => (
          <li
            key={index}
            className={`hidden-word ${item === ' ' ? 'space' : ''}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
