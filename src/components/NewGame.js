import React, { Component } from 'react'
import { allCountries } from '../resources/allCountries'
import { keyboard } from '../resources/specialCharacters'

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
    this.renderCapital()
  }

  renderCapital(withSpecChars) {
    withSpecChars = withSpecChars || null
    const randomNumber = Math.floor(Math.random() * this.state.countries.length)
    const pickedCountry = this.state.countries[randomNumber]
    const currentCountry = pickedCountry.name
    let capital
    withSpecChars
      ? (capital = pickedCountry.capitalSpecial || pickedCountry.capital)
      : (capital = pickedCountry.capital)

    const length = capital.length
    let dash = [...'_'.repeat(length)]
    capital = [...capital.toLowerCase()]
    this.setState({ currentCountry, dash, capital }, () => {
      console.log(this.state.dash)
    })
  }

  handleChoose = key => {
    console.log('clicked:', key)
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
          {this.state.dash.map(item => (
            <h3 className='capital' key={this.renderDash().indexOf(item)}>
              {item}
            </h3>
          ))}
          <div className='container'>
            {this.state.keyboardRows.map(obj => (
              <ul className='keyboard flex' key={obj.row.toString()}>
                {obj.row.map(letter => (
                  <button key={letter}>
                    <li onClick={() => this.handleChoose(letter)}>
                      {letter.toUpperCase()}
                    </li>
                  </button>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
