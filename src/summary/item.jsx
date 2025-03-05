import React from 'react'

const Item = ({ item }) =>
{
    return (
        <li key={item.url} className={item.active ? "item active" : "item"}>
            <span>
                {item.name}
            </span>
            <div className='count'>
                {item.count}
            </div>
            {/* {
                                                                        item.clusters ? getTree(item) : null
                                                                    } */}
        </li>
    )
}

export default Item