import React, { Component } from 'react'
import { keyboard } from '../resources/specialCharacters'
import { KeyboardKey } from './KeyboardKey'

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
    this.props.clickedLetters.forEach(key => {
      if (key === letter) {
        return (toggledClass = 'disabled')
      }
      return toggledClass
    })
    return toggledClass
  }

  render() {
    return (
      <div className='keyboard'>
        {this.state.keyboardRows.map(obj => (
          <ul className='keys flex' key={obj.row.toString()}>
            {obj.row.map(letter => (
              <KeyboardKey
                className={this.toggleClass(letter)}
                key={letter}
                letter={letter}
                onClickHandler={this.props.onChoose}
              />
            ))}
          </ul>
        ))}
      </div>
    )
  }
}
