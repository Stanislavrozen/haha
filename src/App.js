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
  const [ data, setData ] = useState(null)
  const [ landed, setLanded ] = useState([]);
  const all = []
  const limit = 2000;
  const per_page = 100;

  function getSource(url)
  {
    let repeatTimes = 20;
    let pause = 1000;

    return new Promise((resolve, reject) =>
    {
      async function beg(url)
      {
        await fetch(url).then(data => data.json()).then(json =>
        {
          if (!json.errors) 
          {
            json.url = url
            resolve(json)
          }
          else
          {
            throw new Error(JSON.stringify(json))
          }
        }).catch((error) =>
        {
          if (--repeatTimes <= 0) 
          {
            reject(error)
          }
          else
          {
            setTimeout(() =>
            {
              beg(url)

            }, pause += 200)
          }
        })
      }
      beg(url)
    })
  }

  function createUrls(count, baseUrl)
  {
    const url = new URL(baseUrl)
    const urlCount = count > limit ? Math.ceil(limit / per_page) : Math.ceil(count / per_page);
    // url.searchParams.set("clusters", "false");
    url.searchParams.set("per_page", per_page);
    return new Array(urlCount).fill(url).map((url, idx) =>
    {
      url.searchParams.set("page", idx);
      return url.toString()
    })
  }

  // async function getVacancies()
  // {
  //   const items = [];
  //   for (let i = 0; i < data.urls.length; i++)
  //   {
  //     const vacancies = await getSource(data.urls[ i ])
  //     items.push(...vacancies.items)
  //     setData({ ...data, items })
  //   }
  // }

  async function searchVacancies(text)
  {
    const url = `https://api.hh.ru/vacancies/?text=${text}&clusters=true&per_page=100&page=0`

    const data = await getSource(url)
    setData(data)
    await getVacancies(data)
    await getRestTree(data)

    console.log(data)
  }

  async function getVacancies(data)
  {
    const dataClone = { ...data }
    dataClone.urls = createUrls(dataClone.found, dataClone.url)

    for (let i = 1; i < dataClone.urls.length; i++)
    {
      data.items.push(...await getSource(dataClone.urls[ i ]).then(page => page.items));
      setAll([...data.items])
      setLanded([ ...all ])
      setData({ ...dataClone })
    }

    console.log(landed)
  }

  function getClusterVacancies(cluster)
  {
  }

  function setAll(arr)
  {
    for (let i = 0; i < arr.length; i++)
    {
      if(!all.find(a => a.id === arr[i].id))
      {
        all.push(arr[i])
      }
    }
  }
  async function getRestTree(data)
  {
    const dataClone = { ...data };

    for (let ci = 0; ci < dataClone.clusters.length; ci++)
    {
      const cluster = dataClone.clusters[ ci ]

      for (let i = 0; i < cluster.items.length; i++)
      {
        const urls = createUrls(cluster.items[ i ].count, cluster.items[ i ].url);
        const clusterData = await getSource(urls[ 0 ])


        setAll([...clusterData.items])
        setLanded([ ...all ])


        cluster.items[ i ] = { ...cluster.items[ i ], ...clusterData }

        // console.error(dataClone)
        setData({ ...dataClone })

        for (let ui = 1; ui < urls.length; ui++)
        {
          const clusterData = await getSource(urls[ ui ]);
          cluster.items[ i ].items.push(...clusterData.items)
          // console.error(dataClone)
          setData({ ...dataClone })
        }
      }
      // for (let li = 0; li < cluster.items.length; li++)
      // { 
      //   const item = cluster.items[ li ];

      //   const pagingUrls = createUrls(item.count, item.url);
      //   const clusterData = await getSource(pagingUrls[ 0 ]).then(page => page)
      //   cluster = {...cluster, ...clusterData}

      //   getClustersTree(clusterData)

      //   clusterItem.data = { ...clusterData };
      //   const clusterVacancies = [ ...clusterData.items ]

      //   clusterItem.pagingUrls = pagingUrls;

      //   for (let ui = 1; ui < pagingUrls.length; ui++)
      //   {
      //     clusterVacancies.push(await getSource(pagingUrls[ ui ]).then(page => page.items))
      //     clusterItem.data.items = clusterVacancies
      //     setData({ ...data, clusters })
      //   }
      // }
    }
  }

  return (
    <div className="App">
      {
        <div className='main'>
          <div className='content-area'>
            <div className='scroll-block'>
              {data ? <List data={data} /> : null}
            </div>
            <Searchline all={all} landed={landed} data={data} searchVacancies={searchVacancies} />
            <Aside data={data} setData={setData} />
          </div>
        </div>
      }
    </div>
  );
}

export default App;