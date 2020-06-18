import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'
import { ponctuation } from '../resources/specialCharacters'
import Keyboard from './Keyboard'
import Question from './Question'
import Modal from './Modal'
import Hangman from './Hangman'
import Key from '../resources/sounds/key.mp3'
import Whoosh from '../resources/sounds/whoosh.mp3'
import Impact from '../resources/sounds/impact.mp3'
import Pain from '../resources/sounds/pain.mp3'
import Kids from '../resources/sounds/kids.mp3'

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
      playing: false,
      region: null,
      audio: {
        keypress: new Audio(Key),
        whoosh: new Audio(Whoosh),
        impact: new Audio(Impact),
        pain: new Audio(Pain),
        kids: new Audio(Kids)
      }
    }
  }

  renderCountry(data) {
    this.state.audio.whoosh.play()
    const randomNumber = Math.floor(Math.random() * data.length)
    const country = data[randomNumber]
    const countryName = country.name
    const numberOfCountries = data.length
    const countries = data.filter(object => object !== country)
    let capital = country.capital
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

    // console.log(capital)
    this.setState({
      countryName,
      numberOfCountries,
      capital,
      dash,
      hiddenLetters,
      countries,
      clickedLetters: [],
      lives: 6,
      playing: true
    })
  }

  handleNewGame = region => {
    let countries
    if (region === 'Europe') {
      countries = allCountries.filter(country => country.region === region)
    } else if (region === 'recognised') {
      countries = allCountries.filter(country => country[region] === true)
    } else if (region === 'Western Europe') {
      countries = allCountries.filter(country => country.subregion === region)
    }

    this.setState({
      countries,
      region
    })
    this.renderCountry(countries)
  }

  handleContinue = () => {
    this.renderCountry(this.state.countries)
  }

  handleChoose = key => {
    let {
      dash,
      capital,
      lives,
      hiddenLetters,
      clickedLetters,
      audio
    } = this.state

    // Return if key has been clicked
    if (clickedLetters.indexOf(key) !== -1) {
      return
    }
    clickedLetters.push(key)
    const index = capital.indexOf(key)

    // Check if the wrong letter is chosen

    if (index === -1 && lives === 1) {
      lives = 0
      this.setState({ lives, correctLetter: false })
      audio.pain.play()
      setTimeout(() => {
        this.setState({ lives, playing: false, countries: allCountries })
      }, 2000)
      return
    }
    if (index === -1 && lives !== 1) {
      lives > 2 ? audio.impact.play() : audio.whoosh.play()

      this.setState({ lives: lives - 1, correctLetter: false })
      return
    }

    // Render the letter
    for (let i = 0; i < capital.length; i++) {
      //Capital letter
      if (capital[i] === key) {
        dash[i] = key.toUpperCase()
        hiddenLetters--
        this.setState({ hiddenLetters, correctLetter: true })
      }
    }

    if (hiddenLetters === 0) {
      return (
        audio.keypress.play(),
        audio.kids.play(),
        setTimeout(() => {
          this.setState({ playing: false, hiddenLetters, correctLetter: false })
        }, 2000)
      )
    }

    audio.keypress.play()
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
      hiddenLetters,
      region
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
            region={region}
          />
        ) : (
          <div className='container'>
            <div className='flex-between'>
              <h3>
                {lives} {lives === 1 ? 'life' : 'lives'} left
              </h3>
              <h3>{numberOfCountries} countries left</h3>
            </div>
            <Question country={countryName} dash={dash} capital={capital} />
            <Hangman lives={lives} />
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
