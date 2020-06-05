import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'

export default class NewGame extends Component {
  state = {
    countries: allCountries,
    currentCountry: null
  }

  componentDidMount() {
    console.log(this.state.countries)
    // this.renderCapital('withSpecialCharacters')
  }

  renderCapital(withSpecChars) {
    withSpecChars = withSpecChars || null
    const randomNumber = Math.floor(Math.random() * this.state.countries.length)
    const currentCountry = this.state.countries[randomNumber]
    let capital
    withSpecChars
      ? (capital = currentCountry.capitalSpecial || currentCountry.capital)
      : (capital = currentCountry.capital)

    let length = capital.length
    let dashes = '_ '.repeat(length)

    return dashes
  }

  render() {
    return (
      <div>
        <h1>New Game</h1>
        <div className='container'>
          <h3>{this.renderCapital()}</h3>
        </div>
      </div>
    )
  }
}
