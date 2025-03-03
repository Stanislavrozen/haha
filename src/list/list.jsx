import React, { useEffect, useRef } from 'react'
import './_list.css'
import Item from './item'

const List = ({ data }) =>
{
    useEffect(() =>
    {
        let distanceToScroll = document.body.scrollHeight - window.innerHeight;
        var speed = 5;
        console.log(distanceToScroll)

        const timer = setInterval(function ()
        {
            window.scrollBy(0, speed);

            if (window.scrollY >= distanceToScroll)
            {
                clearInterval(timer);
            }
        }, 16);

        return () => clearInterval(timer)

    }, [])

    return (
        <div className="items-block">
            {
                data && data.items.length ?
                    data.items.map((i, idx) =>
                    {
                        return (
                            <Item key={i.id} count={idx} item={i} />
                        )
                    }) : null
            }
        </div>
    )
}

export default List

