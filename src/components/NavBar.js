import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <h4>Travel Hangman</h4>
        <ul className='navlist'>
          <li className='navitem'>New Game</li>
          <li className='navitem'>Mode</li>
        </ul>
      </nav>
    )
  }
}
