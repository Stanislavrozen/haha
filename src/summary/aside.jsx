import React, { useEffect, useRef } from 'react'
import './aside.css'

const Aside = ({ data, setData }) =>
{
    let result = []

    function getTree(node)
    {
        let result;
        if (node && node.clusters.length)
        {
            // console.log(node)
            for (let i = 0; i < node.clusters.length; i++)
            {
                const cluster = node.clusters[ i ]
                // console.log(cluster)
                return (
                    <div className='aside-menu cluster'>
                        <ul key={cluster.id + cluster.id} className='menu-item' onClick={() => 
                        {
                            showCluster(cluster)
                        }}>
                            <span className={cluster.active ? "active" : null}>
                                {cluster.name}
                            </span>
                            <div className='count'>
                                {
                                    cluster.items.length
                                }
                            </div>
                            {
                                cluster.items.length ?
                                    <li className={cluster.active ? "aside-menu item active" : "aside-menu item"}>
                                        {
                                            cluster.items.map(item =>
                                            {
                                                return (
                                                    <div key={item.url} className='menu-item'>
                                                        <span className={item.active ? "active" : null}>
                                                            {item.name}
                                                        </span>
                                                        <div className='count'>
                                                            {item.count}
                                                        </div>
                                                        {/* {
                                                            item.clusters ? getTree(item) : null
                                                        } */}
                                                    </div>
                                                )
                                            })
                                        }
                                    </li>
                                    : null
                            }
                        </ul>
                    </div>
                )
            }
        }
    }

    const tree = getTree(data)

    function showCluster(cluster)
    {
        let clusters = {};

        if (cluster.active)
        {
            clusters = data.clusters.map(c =>
            {
                return { ...c, active: false }
            })
        }
        else
        {
            clusters = data.clusters.map(c =>
            {
                return { ...c, active: c.id == cluster.id ? true : false }
            })
        }

        setData({ ...data, clusters })
    }

    const ref = useRef()

    useEffect(() =>
    {
        // ref.current.addEventListener("click", e =>
        // {
        //     const menuClass = "aside-menu"
        //     let parent = e.srcElement
        //     while (parent.classList.contains(menuClass))
        //     {
        //         parent = parent.parentNode;
        //     }
        //     const menuChildren = parent.querySelectorAll(`.${menuClass}`)
        //     console.log(menuChildren)
        // })
    }, [])

    return tree;
}

export default Aside