import React from 'react'

export default function Question(props) {
  console.log(props.dash)

  return (
    <div>
      <h3>What is the capital of {props.country}?</h3>
      <ul>
        {props.dash.map((item, index) => (
          <li key={index} className='hidden-word'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
