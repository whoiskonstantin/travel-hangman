import React from 'react'

export default function Question({ country, dash }) {
  return (
    <div>
      <h3>What is the capital of {country}?</h3>
      <ul>
        {dash.map((item, index) => (
          <li key={index} className='hidden-word'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
