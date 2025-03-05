import { useEffect, useState } from 'react';
import './style.css';
import List from './list/list';
import Summary from './summary/summary';
import Clusters from './summary/clusters';
import Table from './summary/table';
import Chart from './summary/chart';
import Sub from './summary/sub';
import Searchline from './summary/searchline';
import Aside from './summary/aside';

function App()
{
  const [ data, setData ] = useState(null);
  const [ landed, setLanded ] = useState([]);
  const all = []
  const limit = 2000;
  const per_page = 100;

  function getSource(url)
  {
    let repeatTimes = 20;
    let pause = 5000;

    return new Promise((resolve, reject) =>
    {
      async function beg(url)
      {
        await fetch(url).then(data => data.json()).then(json =>
        {
          if (!json.errors) 
          {
            if (json.items.length && json.items[ 0 ].id)
            {
              setAll(json.items)
            }
            resolve(json)
          }
          else
          {
            throw new Error(json)
          }
        }).catch((error) =>
        {
          console.log(error, repeatTimes)
          if (repeatTimes <= 0) 
          {
            reject(error)
          }
          else
          {
            setTimeout(() =>
            {
              beg(url)
              repeatTimes = repeatTimes - 1
              pause = pause + 2000
              console.log(repeatTimes, pause)

            }, pause)
          }
        })
      }
      console.log(pause)
      beg(url)
    })
  }

  async function searchVacancies(text)
  {
    const url = `https://api.hh.ru/vacancies/?clusters=true&per_page=100&text=${text}`

    const initial = await getSource(url)
    initial.url = url
    setData(initial)
    await getTree(initial)
  }

  function setAll(arr)
  {
    for (let i = 0; i < arr.length; i++)
    {
      if (!all.find(a => a.id === arr[ i ].id))
      {
        all.push(arr[ i ])
      }
    }
    console.log(all)
    setLanded([ ...all ])
  }
  async function getTree(node)
  {
    node.urls = new Array(node.pages).fill(node.url).map((url, idx) => url + "&page=" + idx)

    for (let i = node.page + 1; i < node.pages; i++)
    {
      await node.items.push(...(await getSource(node.urls[ i ])).items)
    }

    if (node.found && node.found > node.items.length)
    {
      for (let ci = 0; ci < node.clusters.length; ci++)
      {

        const cluster = node.clusters[ ci ] // Area

        for (let ii = 0; ii < cluster.items.length; ii++)
        {
          cluster.items[ ii ] = { ...cluster.items[ ii ], ...await getSource(cluster.items[ ii ].url + "&page=0") } // Moscow
          getTree(cluster.items[ ii ])
        }
        console.log(cluster)
      }
    }
    console.log(node)
  }
  return (
    <div className="App">
      {
        <div className='main'>
          <div className='content-area'>
            <div className='scroll-block'>
              {
                landed.length ? <List landed={landed} setLanded={setLanded} /> : null
              }
            </div>
            <Searchline all={all} landed={landed} data={data} searchVacancies={searchVacancies} />
            {/* <Aside data={data} setData={setData} /> */}
          </div>
        </div>
      }
    </div>
  );
}

export default App;