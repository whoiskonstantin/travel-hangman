import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'
import { keyboard } from '../resources/specialCharacters'
import Keyboard from './Keyboard'

export default class NewGame extends Component {
  state = {
    countries: allCountries,
    currentCountry: null,
    capital: null,
    dash: null,
    keyboardRows: [
      { row: keyboard.slice(0, 10) },
      { row: keyboard.slice(10, 19) },
      { row: keyboard.slice(19, 26) }
    ]
  }

  componentDidMount() {
    this.renderCountry()
    this.renderCapital()
  }

  renderCountry() {
    const randomNumber = Math.floor(Math.random() * this.state.countries.length)
    const pickedCountry = this.state.countries[randomNumber]
    const currentCountry = pickedCountry.name
    this.setState({ currentCountry })
  }

  renderCapital(withSpecChars) {
    withSpecChars = withSpecChars || null
    const { currentCountry } = this.state
    let capital
    withSpecChars
      ? (capital = currentCountry.capitalSpecial || currentCountry.capital)
      : (capital = currentCountry.capital)
    capital = [...capital.toLowerCase()]
    const length = capital
    let dash = [...'_'.repeat(length)]
    console.log(capital)
    this.setState({ capital, dash })
    setTimeout(() => console.log(this.state.capital), 3000)
  }

  handleChoose = key => {
    console.log('clicked:', key)
    console.log(this.state.capital)
    const capital = [...this.state.capital]
    const dash = this.state.dash
    capital.forEach(letter => {
      if (letter === key) {
        // console.log(dash)
        const index = capital.indexOf(letter)
        dash[index] = key
        this.setState({ capital, dash })
      } else {
        return console.log('Wrong letter!')
      }
    })
  }

  render() {
    return (
      <div>
        <h1>New Game</h1>
        <div className='container'>
          <h3>What is the capital of {this.state.currentCountry}?</h3>
          {this.state.dash}
          <Keyboard
            keyboard={this.state.keyboardRows}
            onChoose={this.handleChoose}
          />
        </div>
      </div>
    )
  }
}
