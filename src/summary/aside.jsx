import React, { useEffect } from 'react'
import './aside.css'
import Cluster from './cluster';
import Item from './item';

const Aside = ({ data, setData }) =>
{
    function getTree(node)
    {
        return (
            node && node.clusters.length ?
                node.clusters.map(cluster =>
                {
                    return (
                        <Cluster data={data} setData={setData} cluster={cluster} items={cluster.items}>
                            {cluster.items.map(item =>
                            {
                                return (
                                    <Item item={item} />
                                )
                            })}
                        </Cluster>
                    )
                })
                : null
        )
    }

    const tree = getTree(data)

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