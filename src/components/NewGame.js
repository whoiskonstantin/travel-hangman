import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'
import { keyboard, ponctuation } from '../resources/specialCharacters'
import Keyboard from './Keyboard'
import Question from './Question'

export default class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: allCountries,
      countryName: null,
      capital: null,
      dash: null,
      startGame: false,
      keyboardRows: [
        { row: keyboard.slice(0, 10) },
        { row: keyboard.slice(10, 19) },
        { row: keyboard.slice(19, 26) }
      ]
    }
  }

  componentDidMount() {
    this.renderCountry()
  }

  renderCountry(withSpecChars) {
    withSpecChars = withSpecChars || null

    const randomNumber = Math.floor(Math.random() * this.state.countries.length)
    const country = this.state.countries[randomNumber]
    const countryName = country.name

    let capital
    withSpecChars
      ? (capital = country.capitalSpecial || country.capital)
      : (capital = country.capital)

    capital = [...capital.toLowerCase()]
    let dash = [...'_'.repeat(capital.length)]

    capital.forEach(item =>
      ponctuation.forEach(char => {
        if (item === char) {
          console.log('Detected: ', char)
          dash[capital.indexOf(item)] = char
        }
      })
    )

    console.log(capital)
    this.setState({ countryName, capital, dash })
  }

  startGame() {
    this.setState({ startGame: true })
  }

  handleChoose = key => {
    const { dash, capital } = this.state

    const index = capital.indexOf(key)
    if (index === -1) {
      console.log('Wrong letter!')
      return
    }
    for (let i = 0; i < capital.length; i++) {
      if (capital[0] === key) {
        dash[0] = key.toUpperCase()
      } else if (capital[i] === key) {
        dash[i] = key
      }
    }
    return this.setState({ dash })
  }

  render() {
    const { countryName, capital, dash, startGame, keyboardRows } = this.state

    return (
      <div className='new-game'>
        <h1>New Game</h1>
        {!startGame ? (
          <button className='start-game' onClick={() => this.startGame()}>
            Start
          </button>
        ) : (
          <div className='container'>
            <Question country={countryName} dash={dash} capital={capital} />
            <Keyboard keyboard={keyboardRows} onChoose={this.handleChoose} />
          </div>
        )}
      </div>
    )
  }
}
