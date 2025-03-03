import React from 'react'
import './table.css'
import Sub from './sub'

const Table = ({ getCluster, data, setData }) =>
{
    function showCluster(cluster)
    {
        const clusters = data.clusters.map(c =>
        {
            return { ...c, active: false }
        });
        clusters.find(c => c.id == cluster.id).active = true

        setData({ ...data, clusters: [ ...clusters ] });
    }
    function getTree()
    {
        
    }
    return (
        <div className="table-container">
            <div>{data.found}</div>
            <div className='table'>
                {
                    data.clusters.length ?
                        <div className='table-header'>
                            {
                                data.clusters.map((cluster, idx) =>
                                {
                                    return <div className='header__item' key={cluster.id + idx}>{cluster.name}</div>
                                })
                            }
                        </div> : null
                }
                <tr>
                    <td>Кластеры</td>
                    {
                        data.clusters.map(cluster =>
                        {
                            return <td key={cluster.id + cluster.id} className='load-cluster' onClick={() =>
                            {
                                showCluster(cluster);
                                // getCluster(cluster);
                            }}>
                                <div>{cluster.items.length}</div>
                            </td>
                        })
                    }
                </tr>
            </div>
            {data ? data.clusters.map(cluster =>
            {
                return <Sub key={cluster.items[ 0 ].url} cluster={cluster} />
            }) : null}

        </div >
    )
}

export default Table