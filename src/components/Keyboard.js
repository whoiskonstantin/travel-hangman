import React, { Component } from 'react'

export default class Keyboard extends Component {
  render() {
    return (
      <div className='container'>
        {this.props.keyboard.map(obj => (
          <ul className='keyboard flex' key={obj.row.toString()}>
            {obj.row.map(letter => (
              <button key={letter}>
                <li onClick={() => this.props.onChoose(letter)}>
                  {letter.toUpperCase()}
                </li>
              </button>
            ))}
          </ul>
        ))}
      </div>
    )
  }
}
