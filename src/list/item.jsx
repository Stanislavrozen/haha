import React, { useEffect, useRef } from 'react'

const Item = ({ count, item }) =>
{
    const bg = item.employer.logo_urls ? item.employer.logo_urls[ 240 ] : null;
    const ref = useRef(null)

    useEffect(() => {
        const elem = ref.current;
        const chance = Math.random() * 10;
        let timer = null;

        const transition = ["trans1", "trans3", "trans5", "trans7", "trans9"][Math.floor(Math.random() * 5)]
        const effects = ["blur", "greyscale", "scale"]
        const effect = effects[Math.floor(Math.random() * effects.length)]
        elem.classList.contains(transition) ? elem.classList.remove(transition) : elem.classList.add(transition);

        if(chance > 5)
        {
            timer = setInterval(() => {
    
                elem.classList.contains(effect) ? elem.classList.remove(effect) : elem.classList.add(effect);
    
            }, 2000);
        }
        
        return () => clearInterval(timer)
    }, [])
    return (
        <div ref={ref} className='item-block'>
            <div className='title'>{item.name}</div>
            <div className='compensations'>
                <div className='compensation'>{item.experience.name}</div>
                {
                    item.work_format.find(f => f.id == "REMOTE") ? <div className='compensation'>Можно удаленно</div> : null
                }
            </div>
            <div className='employer-block'>
                <div className='employer-details'>
                    <div className='employer-name'>{item.employer.name}</div>
                    <div className='employer-city'>{item.area.name}</div>
                </div>
                <div className='employer-logo' style={{ backgroundImage: `url(${bg})` }}>
                </div>
            </div>
        </div >
    )
}

export default Item