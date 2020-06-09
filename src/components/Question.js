import React from 'react'

export default function Question(props) {
  console.log(props.dash)

  return (
    <div>
      <h3>What is the capital of {props.country}?</h3>
      <ul>
        {props.capital.map(item => (
          <li key={props.dash.indexOf(item)} className='hidden-word'>
            _
          </li>
        ))}
      </ul>
    </div>
  )
}
