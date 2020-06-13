import React from 'react'

export default function Modal({
  newGame,
  lives,
  hiddenLetters,
  onContinue,
  numberOfCountries
}) {
  console.log(numberOfCountries)
  if (numberOfCountries === 1) {
    return (
      <div className='modal'>
        <h1>Congratulations!</h1>
        <h1>You passed the game!</h1>
        <button type='button' className='start-game' onClick={() => newGame()}>
          Restart
        </button>
      </div>
    )
  }
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
  if (lives === 0) {
    return (
      <div className='modal'>
        <h1>Game Over</h1>
        <button type='button' className='start-game' onClick={() => newGame()}>
          Restart
        </button>
      </div>
    )
  }
  return (
    <div className='modal'>
      <h1>Welcome to Travel Hangman</h1>
      <button type='button' className='start-game' onClick={() => newGame()}>
        New Game
      </button>
    </div>
  )
}
