import React, { useState } from 'react'
import './sub.css'

const Sub = ({ cluster }) =>
{
    const classes = [ "sub-menu", cluster.id ]
    cluster.active && classes.push("active")

    return (
        <div className={classes.join(" ")}>
            <div className="container">
                <div className="table">
                    <div className="table-header">
                        <div className="header__item">{cluster.name}</div>
                    </div>
                    <div className="table-content">
                        {
                            cluster.items.map(item =>
                            {
                                return (
                                    <div className='table-row' key={item.url}>
                                        <div className='table-data'>{item.name}</div>
                                        <div className='table-data'>{item.count}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sub