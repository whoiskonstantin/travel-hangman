import React from 'react'

export const GameFinished = ({
  message,
  submessage,
  region,
  onClick,
  countries,
  lives,
  handleInputChange,
  un,
  allCountries
}) => {
  const regions = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania']
  const subregions = [
    'Southern Asia',
    'Southern Europe',
    'Northern Africa',
    'Middle Africa',
    'Caribbean',
    'South America',
    'Western Asia',
    'Australia and New Zealand',
    'Western Europe',
    'Eastern Europe',
    'Central America',
    'Western Africa',
    'Southern Africa',
    'South-Eastern Asia',
    'Eastern Africa',
    'Northern America',
    'Eastern Asia',
    'Northern Europe',
    'Melanesia',
    'Central Asia',
    'Micronesia',
    'Polynesia'
  ]
  return (
    <div className='modal border'>
      <h1>{message}</h1>
      <h3>
        {submessage}
        {region}
      </h3>
      <div>
        <h4 className={`all ${un ? 'disabled' : 'active'}`}>All</h4>
        <label className='switch'>
          <input
            name='un'
            type='checkbox'
            checked={un}
            onChange={e => handleInputChange(e)}
          />
          <span className='slider'></span>
        </label>
        <h4 className={un ? 'active' : 'disabled'}>U. N.</h4>
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

export const RoundComplete = ({ message, submessage, region, onClick }) => {
  return (
    <div className='modal border'>
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
