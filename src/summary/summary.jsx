import React from 'react'
import './summary.css';

const Summary = ({ clusters, vacancies }) =>
{
  return (
    <div className='clusters-block'>
      {
        clusters.map(c =>
        {
          return (
            <div key={c.id} className='summary-row'>
              <div className='property'>
                {c.name} ({c.id})
              </div>
              <div className='value'>
                {c.items.length}
              </div>
            </div>
          )
        })

      }
    </div>
  )
}


export default Summary