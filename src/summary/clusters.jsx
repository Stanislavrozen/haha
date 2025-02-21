import React from 'react'
import './summary.css';

const Clusters = ({ clusters, vacancies }) =>
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
                                {
                                    vacancies.filter(v => v[c.id]).length
                                }
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}


export default Clusters

// .filter((value, index, self) =>
//     {
//         return index === self.findIndex(s =>
//         {
//             console.log(s[c.id].id)
//             return s[ c.id ].id === value[ c.id ].id
//         })
//     })