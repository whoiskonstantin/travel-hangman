import React, { Component } from 'react'
import { keyboard } from '../resources/specialCharacters'

export default class Keyboard extends Component {
  state = {
    keyboardRows: [
      { row: keyboard.slice(0, 10) },
      { row: keyboard.slice(10, 19) },
      { row: keyboard.slice(19, 26) }
    ]
  }
  toggleClass(letter) {
    let toggledClass
    this.props.keyClicks.forEach(key => {
      if (key === letter) {
        return (toggledClass = 'disabled')
      }
      return toggledClass
    })
    return toggledClass
  }

  render() {
    return (
      <div className='container'>
        {this.state.keyboardRows.map(obj => (
          <ul className='keyboard flex' key={obj.row.toString()}>
            {obj.row.map(letter => (
              <li key={letter}>
                <button
                  className={this.toggleClass(letter)}
                  onClick={() => {
                    this.props.onChoose(letter)
                  }}
                >
                  {letter.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    )
  }
}
