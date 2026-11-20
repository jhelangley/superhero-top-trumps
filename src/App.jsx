import { useState, useEffect } from 'react'

import './App.css'

function App() {
  
  // all state
  const [allHeroes, setAllHeroes] = useState([])

  // deck-related state
  const [playerDeck, setPlayerDeck] = useState([])
  const [computerDeck, setComputerDeck] = useState([])

  // game state
  const [currentTurn, setCurrentturn] = useState('player');
  const [roundWinner, setRoundWinner] = useState(null);

  
  const shuffleAll = (array) => {
    const shuffled = [...array]
    let currentIndex = shuffled.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]]
    }

    return shuffled
  }

  const createDecks = (array) => {
      const newDeck = shuffleAll(array).slice(0, 30);
      setPlayerDeck(newDeck.slice(0, 15));
      setComputerDeck(newDeck.slice(15));
  }

  const createRound = () => {
    const newPlayerDeck = [...playerDeck];
    const newComputerDeck = [...computerDeck];

    const playerCard = newPlayerDeck.shift();
    const computerCard = newComputerDeck.shift();

    newPlayerDeck.push(playerCard)
    newComputerDeck.push(computerCard)

    setPlayerDeck(newPlayerDeck);
    setComputerDeck(newComputerDeck);
  }


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
<div>
<button onClick={() => createRound()}>create round</button>
  <p>Player card: {playerDeck[0]?.name ?? "no card"}</p>
  <p>Computer card: {computerDeck[0]?.name ?? "no card"}</p>
</div>
    <div>
      <button onClick={() => createDecks(allHeroes)}>Create decks</button>
      <p>Player deck:</p>
      <ul>
        {playerDeck.map(hero => <p>{hero.name}</p>)}
      </ul>
      <p>Computer deck:</p>
      <ul>
        {computerDeck.map(hero => <p>{hero.name}</p>)}
      </ul>
      </div>
    </>
  )
}

export default App
