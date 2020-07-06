import React, { memo } from 'react'

export const KeyboardKey = memo(
  ({ letter = '', onClickHandler, className }) => {
    return (
      <li className='no_highlights'>
        <button
          className={className}
          onClick={() => onClickHandler(letter)}
          type='button'
        >
          {letter.toUpperCase()}
        </button>
      </li>
    )
  }
)
