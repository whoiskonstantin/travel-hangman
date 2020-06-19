import React from 'react'

export const GameFinished = ({
  message,
  submessage,
  region,
  onClick,
  countries,
  lives
}) => {
  return (
    <div className='modal'>
      <h1>{message}</h1>
      <h3>
        {submessage}
        {region}!
      </h3>
      {countries === 1 || lives === 0 ? (
        <div>
          <button
            type='button'
            className='start-game'
            onClick={() => onClick(region)}
          >
            Restart
          </button>
          <h3>Play New Game</h3>
        </div>
      ) : null}

      <label className='switch'>
        <input type='checkbox' />
        <span className='slider'></span>
      </label>
      <button
        type='button'
        className='start-game'
        onClick={() => onClick('United Nations')}
      >
        United Nations
      </button>
      <button
        type='button'
        className='start-game'
        onClick={() => onClick('Europe')}
      >
        European Countries
      </button>
      <button
        type='button'
        className='start-game'
        onClick={() => onClick('Western Europe')}
      >
        Western Europe
      </button>
    </div>
  )
}

export const RoundComplete = ({ message, submessage, region, onClick }) => {
  return (
    <div className='modal'>
      <h1>{message}</h1>
      <h1>{submessage}</h1>
      <button
        type='button'
        className='start-game'
        onClick={() => onClick(region)}
      >
        Continue
      </button>
    </div>
  )
}
