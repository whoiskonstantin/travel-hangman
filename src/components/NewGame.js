import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'
import { ponctuation } from '../resources/specialCharacters'
import Keyboard from './Keyboard'
import Question from './Question'

export default class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: allCountries,
      countryName: null,
      capital: null,
      numberOfHiddenLetters: null,
      keyClicks: [],
      dash: null,
      lives: 3,
      startGame: false
    }
  }

  componentDidMount() {
    this.renderCountry()
  }

  renderCountry(withSpecChars) {
    withSpecChars = withSpecChars || null
    let { countries } = this.state
    const randomNumber = Math.floor(Math.random() * countries.length)
    const country = countries[randomNumber]
    const countryName = country.name
    countries = countries.filter(object => object !== country)
    console.log(countries)

    let capital
    withSpecChars
      ? (capital = country.capitalSpecial || country.capital)
      : (capital = country.capital)

    const numberOfHiddenLetters = capital.length
    capital = [...capital.toLowerCase()]
    let dash = [...'_'.repeat(numberOfHiddenLetters)]

    // Helping player by rendering special chars like
    // comas, spaces, dashes, etc...
    capital.forEach(item =>
      ponctuation.forEach(char => {
        if (item === char) {
          dash[capital.indexOf(item)] = char
        }
      })
    )

    console.log(capital)
    this.setState({
      countryName,
      capital,
      dash,
      numberOfHiddenLetters,
      countries,
      keyClicks: []
    })
  }

  startGame() {
    this.setState({ startGame: true })
  }

  handleChoose = key => {
    let { dash, capital, lives, numberOfHiddenLetters, keyClicks } = this.state
    console.log(keyClicks)
    if (keyClicks.indexOf(key) !== -1) {
      return
    }
    keyClicks.push(key)

    const index = capital.indexOf(key)

    // Check if pressed key doesn't match the letter

    if (index === -1 && lives === 0) {
      console.log('Game Over!')
      return
    }
    if (index === -1 && lives !== 0) {
      console.log('Wrong letter!')
      this.setState({ lives: lives - 1, keyClicks })
      return
    }

    // Render the letter
    for (let i = 0; i < capital.length; i++) {
      //Capital letter
      if (capital[i] === key) {
        dash[i] = key
        numberOfHiddenLetters--
      } else if (capital[0] === key) {
        dash[0] = key.toUpperCase()
      }
    }
    if (numberOfHiddenLetters === 0) {
      return this.renderCountry()
    }
    return this.setState({ dash, numberOfHiddenLetters, keyClicks })
  }

  render() {
    const {
      countryName,
      capital,
      lives,
      dash,
      startGame,
      keyClicks
    } = this.state

    if (lives === 0) {
      console.log('Lives is zero')
    }

    return (
      <div className='new-game'>
        <h1>New Game</h1>
        {!startGame ? (
          <button className='start-game' onClick={() => this.startGame()}>
            Start
          </button>
        ) : (
          <div className='container'>
            <h3>
              You have {lives} {lives === 1 ? 'live' : 'lives'}
            </h3>
            <Question country={countryName} dash={dash} capital={capital} />
            <Keyboard onChoose={this.handleChoose} keyClicks={keyClicks} />
          </div>
        )}
      </div>
    )
  }
}
