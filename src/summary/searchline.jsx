import React, { useState } from 'react'
import './searchline.css'

const Searchline = ({ all, landed, data, searchVacancies }) =>
{
  const [ text, setText ] = useState("")

  return (
    <div className='searchline'>
      {data ? <div className='count'>{landed.length + "/" + data.found + " вакансий"}</div> : null}
      <div className='input-block'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false"><path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#6a7885" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        <input onKeyDown={e => 
        {
          e.code == "Enter" && searchVacancies(text)
        }
        } value={text} onChange={(e) => setText(e.target.value)} placeholder='Профессия, должность или компания' type='text' />
        <button onClick={() => searchVacancies(text)}>Найти</button>
      </div>
    </div>
  )
}

export default Searchline