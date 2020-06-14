import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'
import { ponctuation } from '../resources/specialCharacters'
import Keyboard from './Keyboard'
import Question from './Question'
import Modal from './Modal'
import Hangman from './Hangman'

export default class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      numberOfCountries: null,
      countryName: null,
      capital: null,
      hiddenLetters: null,
      clickedLetters: [],
      correctLetter: false,
      dash: null,
      lives: null,
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

    let hiddenLetters = capital.length
    capital = [...capital.toLowerCase()]
    let dash = [...'_'.repeat(hiddenLetters)]

    // Helping player by rendering special chars like
    // comas, spaces, dashes, etc...
    capital.forEach(item =>
      ponctuation.forEach(char => {
        if (item === char) {
          dash[capital.indexOf(item)] = char
          hiddenLetters--
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
      clickedLetters: [],
      lives: 6
    })
  }

  handleNewGame = () => {
    this.setState({
      playing: true,
      countries: allCountries
    })
    this.renderCountry()
  }

  handleContinue = () => {
    this.renderCountry()
    this.setState({ playing: true })
  }

  handleChoose = key => {
    let { dash, capital, lives, hiddenLetters, clickedLetters } = this.state

    if (clickedLetters.indexOf(key) !== -1) {
      return
    }
    clickedLetters.push(key)
    const index = capital.indexOf(key)

    // Check if the worng letter is chosen

    if (index === -1 && lives === 1) {
      lives = 0
      this.setState({ lives, correctLetter: false })
      setTimeout(() => {
        this.setState({ lives, playing: false, countries: allCountries })
      }, 2000)
      return
    }
    if (index === -1 && lives !== 1) {
      this.setState({ lives: lives - 1, clickedLetters, correctLetter: false })
      return
    }

    // Render the letter
    for (let i = 0; i < capital.length; i++) {
      //Capital letter
      if (capital[i] === key) {
        dash[i] = key.toUpperCase()
        hiddenLetters--
        this.setState({ hiddenLetters, correctLetter: true })
        // } else if (capital[0] === key) {
        //   dash[0] = key.toUpperCase()
        // }
      }
    }

    if (hiddenLetters === 0) {
      return setTimeout(() => {
        this.setState({ playing: false, hiddenLetters, correctLetter: false })
      }, 1500)
    }
    return this.setState({ dash, hiddenLetters, clickedLetters })
  }

  render() {
    const {
      countryName,
      numberOfCountries,
      capital,
      lives,
      dash,
      playing,
      clickedLetters,
      correctLetter,
      hiddenLetters
    } = this.state

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
            <Hangman
              lives={lives}
              correctLetter={correctLetter}
              hiddenLetters={hiddenLetters}
            />
            <Keyboard
              onChoose={this.handleChoose}
              clickedLetters={clickedLetters}
            />
          </div>
        )}
      </div>
    )
  }
}
