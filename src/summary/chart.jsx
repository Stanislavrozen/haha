import React, { useEffect, useRef } from 'react'
import './chart.css'

const Chart = ({ data }) =>
{

    return (
        <div className='chart-block'>
            <canvas id="chart-canvas"></canvas>

        </div>
    )
}

export default Chart