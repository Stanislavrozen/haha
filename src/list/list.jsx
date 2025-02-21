import React, { useEffect, useRef } from 'react'
import './_list.css'
import Item from './item'

const List = ({ data }) =>
{
    const ref = useRef()

    useEffect(() =>
    {
        // let distanceToScroll = document.body.scrollHeight - window.innerHeight;
        // var speed = 5;
        // console.log(distanceToScroll)

        // const timer = setInterval(function ()
        // {
        //     window.scrollBy(0, speed);

        //     if (window.scrollY >= distanceToScroll)
        //     {
        //         clearInterval(timer);
        //     }
        // }, 16);

        // return () => clearInterval(timer)

        // ref.current.style.top

    }, [])

    return (
        <div className='scroll-block'>
            <div ref={ref} className="items-block">
                {
                    data.items ?
                        data.items.map((i, idx) =>
                        {
                            return (
                                <Item key={i.id} count={idx} item={i} />
                            )
                        }) : null
                }
            </div>
        </div>
    )
}

export default List

