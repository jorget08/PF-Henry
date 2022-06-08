import React from 'react'
import s from './SearchBar.module.css'

export default function SearchBar({filter, setFilter}) {
  return (
    <span className={s.span}>
      Global Search:{' '}
      <input 
        type='search' 
        value={filter || ''} 
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}
