import { useEffect, useState } from 'react';
import './style.css';
import List from './list/list';
import Summary from './summary/summary';
import Clusters from './summary/clusters';
import Table from './summary/table';

function App()
{
  const [ data, setData ] = useState(null)

  useEffect(() =>
  {
    if (!data)
    {
      fetch(`https://api.hh.ru/vacancies/?text=javascript&clusters=true&per_page=0`).then(data => data.json()).then(json =>
      {
        setData(json);
        fetchPages(json);
      })
    }

    let timer = null;

    function fetchPages(data)
    {
      data.per_page = 100;

      timer = setInterval(() =>
      {
        if ((data.page + 1) * data.per_page >= data.pages) clearInterval(timer);

        let url = `https://api.hh.ru/vacancies/?text=javascript&clusters=false&per_page=${data.per_page}&page=${data.page}`;

        fetch(url).then(data => data.json()).then(json =>
        {
          data.items.push(...json.items)
          data.page += 1;
          data.timer = timer;
          setData({ ...data })
        })

      }, 1000);
    }

    return function () 
    {
      clearInterval(timer)
    }

  }, [])
  console.log(data)

  return (
    <div className="App">
      {
        <div className='main'>

          <div className='content-area'>
            {data ? <List data={data} /> : null}
            {/* {data ? <Table data={data} /> : null} */}
          </div>
        </div>
      }
    </div>
  );
}

export default App;