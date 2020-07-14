import React from 'react'

export const GameFinished = ({
  message,
  submessage,
  region,
  onClick,
  countries,
  lives,
  handleModeChange,
  handleSoundChange,
  un,
  allCountries,
  sound
}) => {
  const regions = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania']
  const subregions = ['Southern Asia', 'Southern Europe']
  return (
    <div className='modal border'>
      <h1>{message}</h1>
      <h3 className='submessage'>
        {submessage}
        {region}
      </h3>
      <h3 className='settings'>Game Mode</h3>
      <div className='flex switch-container'>
        <h4 className={`switch-text all ${un ? 'disabled' : 'active'}`}>All</h4>
        <div className='switch-container no_highlights'>
          <label className='switch'>
            <input
              name='un'
              type='checkbox'
              checked={un}
              onChange={e => handleModeChange(e)}
            />
            <span className='slider'></span>
          </label>
        </div>
        <h4 className={`switch-text ${un ? 'active' : 'disabled'}`}>U. N.</h4>
      </div>
      <h3 className='settings'>Sound</h3>
      <div className='flex switch-container'>
        <h4 className={`switch-text all ${sound ? 'disabled' : 'active'}`}>
          Off
        </h4>
        <div className='switch-container no_highlights'>
          <label className='switch'>
            <input
              name='sound'
              type='checkbox'
              checked={sound}
              onChange={e => handleSoundChange(e)}
            />
            <span className='slider'></span>
          </label>
        </div>
        <h4 className={`switch-text ${sound ? 'active' : 'disabled'}`}>On</h4>
      </div>
      <h4 className='menu'>Regions</h4>
      <button
        type='button'
        className='start-game'
        onClick={() => onClick('All Countries', 'All Countries')}
      >
        All Countries ({allCountries.length})
      </button>
      {regions.map(item => (
        <button
          type='button'
          className='start-game'
          onClick={() => onClick(item, 'regions')}
          key={item}
        >
          {item} (
          {allCountries.filter(country => country.region === item).length})
        </button>
      ))}
      <h4 className='menu'>Subregions</h4>
      {subregions.map(item => (
        <button
          type='button'
          className='start-game'
          onClick={() => onClick(item, 'subregions')}
          key={item}
        >
          {item} (
          {allCountries.filter(country => country.subregion === item).length})
        </button>
      ))}
    </div>
  )
}

// export const Map = ({ map }) => {
//   console.log('map element: ', map)
//   const image = map
//   return image
// }

export const RoundComplete = ({
  message,
  submessage,
  region,
  onClick,
  map
}) => {
  return (
    <div className='modal border'>
      <h1>{message}</h1>
      <h1>{submessage}</h1>
      <div className='map'>
        <img src={map} alt='map' />
      </div>
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
