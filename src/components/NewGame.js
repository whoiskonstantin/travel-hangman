import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'
import { ponctuation } from '../resources/specialCharacters'
import Keyboard from './Keyboard'
import Question from './Question'
import Modal from './Modal'

export default class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      numberOfCountries: null,
      countryName: null,
      capital: null,
      hiddenLetters: null,
      keyClicks: [],
      dash: null,
      lives: 1,
      playing: false
    }
  }

  renderCountry(withSpecChars) {
    withSpecChars = withSpecChars || null
    let countries

    if (this.state.countries.length > 0) {
      countries = this.state.countries
    } else {
      countries = allCountries
    }
    const randomNumber = Math.floor(Math.random() * countries.length)
    const country = countries[randomNumber]
    const countryName = country.name
    const numberOfCountries = countries.length
    countries = countries.filter(object => object !== country)

    let capital
    withSpecChars
      ? (capital = country.capitalSpecial || country.capital)
      : (capital = country.capital)

    const hiddenLetters = capital.length
    capital = [...capital.toLowerCase()]
    let dash = [...'_'.repeat(hiddenLetters)]

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
      numberOfCountries,
      capital,
      dash,
      hiddenLetters,
      countries,
      keyClicks: [],
      lives: 1
    })
  }

  handleNewGame = () => {
    this.setState({ playing: true, countries: allCountries })
    this.renderCountry()
  }

  handleContinue = () => {
    this.renderCountry()
    this.setState({ playing: true })
  }

  handleChoose = key => {
    let { dash, capital, lives, hiddenLetters, keyClicks } = this.state
    console.log(keyClicks)
    if (keyClicks.indexOf(key) !== -1) {
      return
    }
    keyClicks.push(key)

    const index = capital.indexOf(key)

    // Check if pressed key doesn't match the letter

    if (index === -1 && lives === 0) {
      this.setState({ playing: false, countries: allCountries })
      return
    }
    if (index === -1 && lives !== 0) {
      this.setState({ lives: lives - 1, keyClicks })
      return
    }

    // Render the letter
    for (let i = 0; i < capital.length; i++) {
      //Capital letter
      if (capital[i] === key) {
        dash[i] = key
        hiddenLetters--
        this.setState({ hiddenLetters })
      } else if (capital[0] === key) {
        dash[0] = key.toUpperCase()
      }
    }
    if (hiddenLetters === 0) {
      return this.setState({ playing: false, hiddenLetters })
    }
    return this.setState({ dash, hiddenLetters, keyClicks })
  }

  render() {
    const {
      countryName,
      numberOfCountries,
      capital,
      lives,
      dash,
      playing,
      keyClicks,
      hiddenLetters
    } = this.state

    console.log(numberOfCountries)
    return (
      <div className='container full-screen'>
        {!playing ? (
          <Modal
            newGame={this.handleNewGame}
            lives={lives}
            hiddenLetters={hiddenLetters}
            onContinue={this.handleContinue}
            numberOfCountries={numberOfCountries}
          />
        ) : (
          <div className='container'>
            <h3>
              {lives} {lives === 1 ? 'life' : 'lives'} left
            </h3>
            <h3>{numberOfCountries} countries left</h3>
            <Question country={countryName} dash={dash} capital={capital} />
            <Keyboard onChoose={this.handleChoose} keyClicks={keyClicks} />
          </div>
        )}
      </div>
    )
  }
}
