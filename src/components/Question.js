import React from 'react'

export default function Question(props) {
  console.log()

  return (
    <div>
      <h3>What is the capital of {props.country}?</h3>
      <ul>
        {/* {props.capital.map(item => (
          <li key={props.capital.indexOf(item)}>_</li>
        ))} */}
      </ul>
    </div>
  )
}
