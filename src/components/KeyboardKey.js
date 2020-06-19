import React, { memo } from 'react'

export const KeyboardKey = memo(
  ({ letter = '', onClickHandler, className }) => {
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
