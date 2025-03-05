import React, { useEffect, useRef } from 'react'
import './_list.css'
import Item from './item'

const List = ({ landed, setLanded }) =>
{
    useEffect(() =>
    {
        // const elem = document.querySelector(".items-block")
        // let distanceToScroll = elem.scrollHeight - window.document.body.scrollHeight;
        // var speed = 1;

        // const timer = setInterval(function ()
        // {
        //     elem.parentNode.scrollBy(0, speed);

        //     if (distanceToScroll <= 0)
        //     {
        //         clearInterval(timer);
        //     }
        // }, 16);

        // return () => clearInterval(timer)

    }, [])

    function setAside(vacancy)
    {
        setLanded(landed.map(v =>
        {
            if (v.id == vacancy.id)
            {
                if (vacancy.aside == true)
                {
                    console.log(vacancy == v)
                    console.log(v)
                    v.aside = false
                }
                else
                {
                    v.aside = true
                }

            }
            else
            {
                v.aside = false
            }
            return v;
        }))
    }

    return (
        <div className="items-block">
            {
                landed.map((i, idx) =>
                {
                    return (
                        <Item setAside={setAside} key={i.id} count={idx} item={i} />
                    )
                })
            }
        </div>
    )
}

export default List

