import React, { Component } from 'react'
import { GameFinished, RoundComplete } from './ModalMessage'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onComplete: {
        message: 'Congratulations!',
        submessage: 'You passed '
      },
      onPass: {
        message: 'You won!',
        submessage: 'Keep it up!'
      },
      onGameOver: {
        message: 'Game Over!',
        submessage: 'You failed '
      },
      onWelcome: {
        message: 'Travel Hangman'
        // submessage: 'Choose Game Mode'
      }
    }
  }
  render() {
    const {
      newGame,
      lives,
      hiddenLetters,
      onContinue,
      numberOfCountries,
      region,
      handleModeChange,
      handleSoundChange,
      sound,
      un,
      allCountries,
      map
    } = this.props

    const { onComplete, onPass, onGameOver, onWelcome } = this.state
    // if player completed the whole game
    if (numberOfCountries === 1 && lives > 0) {
      return (
        <GameFinished
          message={onComplete.message}
          submessage={onComplete.submessage}
          onClick={newGame}
          region={region}
          countries={numberOfCountries}
          lives={lives}
          allCountries={allCountries}
          handleModeChange={handleModeChange}
          un={un}
          handleSoundChange={handleSoundChange}
          sound={sound}
        />
      )
    }
    // if player guessed the capital correctly
    if (hiddenLetters === 0) {
      return (
        <RoundComplete
          message={onPass.message}
          submessage={onPass.submessage}
          onClick={onContinue}
          region={region}
          map={map}
        />
      )
    }

    // if player ran out of lives
    if (lives === 0) {
      return (
        <GameFinished
          message={onGameOver.message}
          submessage={onGameOver.submessage}
          onClick={newGame}
          region={region}
          countries={numberOfCountries}
          lives={lives}
          handleModeChange={handleModeChange}
          allCountries={allCountries}
          un={un}
          handleSoundChange={handleSoundChange}
          sound={sound}
        />
      )
    }
    // welcome menu, showed when player visits the home page
    return (
      <GameFinished
        message={onWelcome.message}
        submessage={onWelcome.submessage}
        onClick={newGame}
        region={region}
        handleModeChange={handleModeChange}
        allCountries={allCountries}
        un={un}
        handleSoundChange={handleSoundChange}
        sound={sound}
      />
    )
  }
}
