import React from 'react'
import s from './SearchBar.module.css'

export const CSearch = ({column}) => {
    const {filterValue, setFilter } = column;
  return (
    <span className={s.span}>
      Search:{' '}
      <input 
        type='search'
        value={filterValue || ''} 
        onChange={e => setFilter(e.target.value)}
       />
    </span>
  )
}
