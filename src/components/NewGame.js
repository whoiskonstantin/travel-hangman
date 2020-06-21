import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'
import Keyboard from './Keyboard'
import Question from './Question'
import Modal from './Modal'
import Hangman from './Hangman'
import Key from '../resources/sounds/key.mp3'
import Whoosh from '../resources/sounds/whoosh.mp3'
import Impact from '../resources/sounds/impact.mp3'
import Pain from '../resources/sounds/pain.mp3'
import Kids from '../resources/sounds/kids.mp3'
import Div100vh from 'react-div-100vh'

export default class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: allCountries.filter(country => country.recognised === true),
      numberOfCountries: null,
      countryName: null,
      capital: null,
      hiddenLetters: null,
      clickedLetters: [],
      dash: null,
      un: true,
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

  handleInputChange = event => {
    const target = event.target
    const value = target.checked
    let countries
    if (value === true) {
      countries = allCountries.filter(country => country.recognised === true)
    } else if (value === false) {
      countries = allCountries
    }
    this.setState({
      un: value,
      countries
    })
    this.state.audio.keypress.play()
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

    // Helping player by rendering special chars like
    // comas, spaces, dashes, etc...
    let dash = []
    for (let index = 0; index < capital.length; index++) {
      if (
        capital[index] === ' ' ||
        capital[index] === "'" ||
        capital[index] === '-' ||
        capital[index] === '.' ||
        capital[index] === ','
      ) {
        dash.push(capital[index])
        hiddenLetters--
      } else {
        dash.push('__')
      }
    }

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

  handleNewGame = (region, type) => {
    const updateState = () => {
      this.setState({
        countries,
        region
      })
      this.renderCountry(countries)
    }
    let countries
    if (type === 'All Countries') {
      if (this.state.un === true) {
        countries = allCountries.filter(country => country.recognised === true)
        return updateState()
      }
      if (this.state.un === false) {
        countries = allCountries
        return updateState()
      }
    }
    if (type === 'regions') {
      if (this.state.un === true) {
        countries = allCountries.filter(country => country.recognised === true)
        countries = countries.filter(country => country.region === region)
        return updateState()
      }
      if (this.state.un === false) {
        countries = allCountries
        countries = countries.filter(country => country.region === region)
        return updateState()
      }
    }
    if (type === 'subregions') {
      if (this.state.un === true) {
        countries = allCountries.filter(country => country.recognised === true)
        countries = countries.filter(country => country.subregion === region)
        return updateState()
      }
      if (this.state.un === false) {
        countries = allCountries
        countries = countries.filter(country => country.subregion === region)
        return updateState()
      }
    }
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
      audio,
      countries,
      un
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
      this.setState({ lives })
      audio.pain.play()
      if (un) {
        return setTimeout(() => {
          this.setState({
            lives,
            playing: false,
            countries: allCountries.filter(
              country => country.recognised === true
            )
          })
        }, 2000)
      }
      if (!un) {
        return setTimeout(() => {
          this.setState({
            lives,
            playing: false,
            countries: allCountries
          })
        }, 2000)
      }
    }
    if (index === -1 && lives !== 1) {
      lives > 2 ? audio.impact.play() : audio.whoosh.play()

      this.setState({ lives: lives - 1 })
      return
    }

    // Render the letter
    for (let i = 0; i < capital.length; i++) {
      //Capital letter
      if (capital[i] === key) {
        dash[i] = key.toUpperCase()
        hiddenLetters--
        this.setState({ hiddenLetters })
      }
    }

    if (hiddenLetters === 0 && countries.length !== 0) {
      return (
        audio.keypress.play(),
        audio.kids.play(),
        setTimeout(() => {
          this.setState({ playing: false, hiddenLetters })
        }, 1000)
      )
    }
    // Runs on game completion
    if (hiddenLetters === 0 && countries.length === 0) {
      audio.keypress.play()
      audio.kids.play()
      if (un) {
        return setTimeout(() => {
          this.setState({
            playing: false,
            hiddenLetters,
            countries: allCountries.filter(
              country => country.recognised === true
            )
          })
        }, 1000)
      }
      if (!un) {
        return setTimeout(() => {
          this.setState({
            playing: false,
            hiddenLetters,
            countries: allCountries
          })
        }, 1000)
      }
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
      region,
      un,
      countries
    } = this.state
    console.log(capital)
    return (
      <Div100vh>
        <div
          className={`container flex-column ${
            playing ? 'flex-between' : 'flex-center'
          }`}
        >
          {!playing ? (
            <Modal
              newGame={this.handleNewGame}
              lives={lives}
              hiddenLetters={hiddenLetters}
              onContinue={this.handleContinue}
              numberOfCountries={numberOfCountries}
              region={region}
              allCountries={countries}
              un={un}
              handleInputChange={this.handleInputChange}
            />
          ) : (
            <React.Fragment>
              <div className='flex-between game-info'>
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
            </React.Fragment>
          )}
        </div>
      </Div100vh>
    )
  }
}
