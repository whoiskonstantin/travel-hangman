import React from 'react'

export default function Modal({
  newGame,
  lives,
  hiddenLetters,
  onContinue,
  numberOfCountries,
  region
}) {
  // if player completed the whole game
  if (numberOfCountries === 1) {
    return (
      <div className='modal'>
        <h1>Congratulations!</h1>
        <h1>You passed the game!</h1>
        <button
          type='button'
          className='start-game'
          onClick={() => newGame(region)}
        >
          Restart
        </button>
      </div>
    )
  }
  // if player guessed the capital correctly
  if (hiddenLetters === 0) {
    return (
      <div className='modal'>
        <h1>You won!</h1>
        <h1> Keep it up!</h1>
        <button
          type='button'
          className='start-game'
          onClick={() => onContinue()}
        >
          Continue
        </button>
      </div>
    )
  }
  // if player ran out of lives
  if (lives === 0) {
    return (
      <div className='modal'>
        <h1>Game Over</h1>
        <button
          type='button'
          className='start-game'
          onClick={() => newGame(region)}
        >
          Restart
        </button>
        <div className='container'>
          <h3>or</h3>
          <h3>Choose Different Game</h3>
        </div>

        <button
          type='button'
          className='start-game'
          onClick={() => newGame('recognised')}
        >
          United Nations
        </button>
        <button
          type='button'
          className='start-game'
          onClick={() => newGame('Europe')}
        >
          European Countries
        </button>
        <button
          type='button'
          className='start-game'
          onClick={() => newGame('Western Europe')}
        >
          Western Europe
        </button>
      </div>
    )
  }
  // welcome menu, showed when player visits the home page
  return (
    <div className='modal'>
      <h1>Welcome to Travel Hangman</h1>
      <button
        type='button'
        className='start-game'
        onClick={() => newGame('recognised')}
      >
        United Nations
      </button>
      <button
        type='button'
        className='start-game'
        onClick={() => newGame('Europe')}
      >
        European Countries
      </button>
      <button
        type='button'
        className='start-game'
        onClick={() => newGame('Western Europe')}
      >
        Western Europe
      </button>
    </div>
  )
}
