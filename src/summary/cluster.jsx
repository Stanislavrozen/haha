import React from 'react'
import Item from './item'

const Cluster = ({ cluster, items }) =>
{
    console.log(cluster)
    // function showCluster(cluster)
    // {
    //     let clusters = {};

    //     if (cluster.active)
    //     {
    //         clusters = data.clusters.map(c =>
    //         {
    //             return { ...c, active: false }
    //         })
    //     }
    //     else
    //     {
    //         clusters = data.clusters.map(c =>
    //         {
    //             return { ...c, active: c.id == cluster.id ? true : false }
    //         })
    //     }

    //     setData({ ...data, clusters })
    // }
    return (
        <li key={cluster.id + cluster.id} className={cluster.active ? "cluster active" : "cluster"}>
            <span >
                {cluster.name}
            </span>
            <div className='count'>
                {
                    items.length
                }
            </div>
            <ul>
                {
                    items.map(item =>
                    {
                        return (
                            <Item item={item} />
                        )
                    })
                }
            </ul>
        </li>
    )
}

export default Cluster