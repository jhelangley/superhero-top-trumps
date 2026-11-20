import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [allHeroes, setAllHeroes] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
      const data = await response.json();
      
      setAllHeroes(data);
    }

    getData();
  })

  return (
    <>
      <div>{allHeroes.map(hero => <p>{hero.name}</p>)}</div>
    </>
  )
}

export default App
