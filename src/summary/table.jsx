import React from 'react'
import './table.css'

const Table = ({ data }) =>
{
    console.log(data)
    return (
        <div className="container">
            <table>
                <thead>
                    {
                        data.clusters.length ?
                            <tr>
                                <th></th>
                                {
                                    data.clusters.map(c =>
                                    {
                                        return <th key={c.id}>{c.name} ({c.id})</th>
                                    })
                                }
                            </tr> : null
                    }
                </thead>
                <tbody>
                    <tr>
                        <td>Уникальных значений в полной выборке из <b>{data.found}</b></td>
                        {
                            data.clusters.map(c => <td key={c.id}>{c.items.length}</td>)
                        }
                    </tr>
                    <tr>
                        <td>Наличие значение в окне 2000</td>
                        {
                            data.clusters.map(c =>
                            {
                                const isNot = data.items.filter(v =>
                                {
                                    return !!v[ c.id ]
                                })
                                return (
                                    <td key={c.id}>{isNot.length}</td>
                                )
                            })
                        }
                    </tr>
                    <tr>
                        <td>Уникальных значений в окне</td>
                        {
                            data.clusters.map(c =>
                            {
                                if(c.id == "industry") return;

                                const prop = c.id;
                                const arrayPropertys = { [ prop ]: [] }

                                data.items.forEach(i =>
                                {
                                    Object.keys(i).forEach(key =>
                                    {
                                        if (i[ key ] === null) 
                                        {
                                            i[ key ] = "empty"
                                        }
                                    })
                                })
                                // data.items.forEach(i => Object.keys(i).forEach(key => i[ key ] === true ? i[ key ] = "empty" : i[ key ]))

                                const uniq = data.items.filter((value, index, self) =>
                                {
                                    return index === self.findIndex(s =>
                                    {
                                        if (Object.keys(value).indexOf(prop))
                                        {
                                            console.log(value, prop)
                                            if (value[ prop ] === "empty")
                                            {
                                                return value[ prop ] === s[ prop ]
                                            }
                                            else if (Array.isArray(value[ prop ]))
                                            {
                                                arrayPropertys[ prop ].push([ ...value[ prop ] ])
                                            }
                                            else if (value[ prop ].toString() === "true" || value[ prop ].toString() === "false")
                                            {
                                                return value[ prop ].toString() === value[ prop ].toString() ? 1 : -1
                                            }
                                            else if (value[ prop ].id && !!s[ prop ].id)
                                            {
                                                return value[ prop ].id === s[ prop ].id
                                            }
                                            else
                                            {
                                                return Object.values(value).join("") === Object.values(s).join("")
                                            }
                                        }
                                        else
                                        {
                                            console.log("Стыдоба", value);
                                            return -1
                                        }
                                    })
                                })
                                // const uniqueArrayProperty = arrayProperty.filter((value, index, self) =>
                                // {
                                //     return index === self.findIndex(s => s.id === value.id)
                                // })
                                return (
                                    uniq ? <td key={c.id}>{uniq.length}</td> : arrayPropertys.length
                                )
                            })
                        }
                    </tr>
                    <tr>
                        <td>Cell 1</td>
                        <td>Cell 2</td>
                        <td>Cell 3</td>
                        <td>Cell 4</td>
                        <td>Cell 5</td>
                    </tr>
                    <tr>
                        <td>Cell 1</td>
                        <td>Cell 2</td>
                        <td>Cell 3</td>
                        <td>Cell 4</td>
                        <td>Cell 5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table