import React, { Component } from 'react'

export default class Keyboard extends Component {
  render() {
    return (
      <div className='container'>
        {this.props.keyboard.map(obj => (
          <ul className='keyboard flex' key={obj.row.toString()}>
            {obj.row.map(letter => (
              <li key={letter} onClick={() => this.props.onChoose(letter)}>
                <button>{letter.toUpperCase()}</button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    )
  }
}
