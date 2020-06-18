import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { keyboard } from '../resources/specialCharacters'

const Key = memo(({ letter = '', onClickHandler, className }) => (
  <li>
    <button
      className={className}
      onClick={() => onClickHandler(letter)}
      type='button'
    >
      {letter.toUpperCase()}
    </button>
  </li>
))

export default class Keyboard extends Component {
  static propTypes = {
    onChoose: PropTypes.func.isRequired
  }

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
              <Key
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
