import React, { memo } from 'react'

export const KeyboardKey = memo(
  ({ letter = '', onClickHandler, className }) => {
    console.log('render')
    return (
      <li>
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
