import { useState, useEffect } from 'react'

import Card from './components/Card'

import './App.css'

function App() {
  
  // all state
  const [allHeroes, setAllHeroes] = useState([])
  
  // deck-related state
  const [playerDeck, setPlayerDeck] = useState([])
  const [computerDeck, setComputerDeck] = useState([])
  
  // game state
  const [currentTurn, setCurrentTurn] = useState('player');
  const [roundWinner, setRoundWinner] = useState(null);
  const [roundStatus, setRoundStatus] = useState('ready') // this can be 1. ready 2. choosing 3. result 4. over
  const [prevWinner, setPrevWinner] = useState(null);
  
  
  const playerFaceUp = roundStatus !== 'ready';
  const computerFaceUp = roundStatus === 'result';
  
  
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
  
  const startRound = () => {
    setRoundStatus('choosing');
  }
  
  const selectStat = (stat) => {
    const playerCard = playerDeck[0]
    const computerCard = computerDeck[0]
    let winner = null;
    
    if (playerCard.powerstats[stat] > computerCard.powerstats[stat]) { 
      winner = 'player'
    } else if (playerCard.powerstats[stat] < computerCard.powerstats[stat]) {
      winner = 'computer'
    } else {
      winner = 'tie'
    }
    
    setRoundWinner(winner);
    setRoundStatus('result');
  }

  const restartGame = () => {
    createDecks(allHeroes);
    setCurrentTurn('player');
    setRoundWinner(null);
    setPrevWinner(null);
    setRoundStatus('ready');
  }
  
  
  const finishRound = () => {
    
    const newPlayerDeck = [...playerDeck];
    const newComputerDeck = [...computerDeck];
    
    const playerCard = newPlayerDeck.shift();
    const computerCard = newComputerDeck.shift();
    
    if (roundWinner == 'player') {
      newPlayerDeck.push(playerCard)
      newPlayerDeck.push(computerCard)
      setCurrentTurn('player')
    }
    
    if (roundWinner == 'computer') {
      newComputerDeck.push(playerCard)
      newComputerDeck.push(computerCard)
      setCurrentTurn('player') // CHANGE THIS TO COMPUTER LATER ONCE COMPUTER LOGIC IS IMPLEMENTED
    }
    
    if (roundWinner == 'tie') {
      newPlayerDeck.push(playerCard)
      newComputerDeck.push(computerCard)
    }
    
    setPlayerDeck(newPlayerDeck);
    setComputerDeck(newComputerDeck);
    
    if (newPlayerDeck.length === 0) {
      setRoundStatus('over')
      setPrevWinner('Computer')
    } else if (newComputerDeck.length === 0) {
      setRoundStatus('over')
      setPrevWinner('Player')
    } else {
      setRoundStatus('ready');
    }    
  }
  
  
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
      const data = await response.json();
      
      setAllHeroes(data);
      createDecks(data)
    }
    
    getData();
    
  }, [])
  
  
  return (
    <>
    <div className="cardPicked">

      <div>
        <h2>Player</h2>
        <p>Number of cards: {playerDeck.length}</p>
        {playerDeck[0] ? <Card isBot={false} hero={playerDeck[0]} flipped={!playerFaceUp} selectStat={selectStat} /> : <p>No card</p>}
      </div>

      <div>
        <h2>Computer</h2>
        <p>Number of cards: {computerDeck.length}</p>
        {computerDeck[0] ? <Card isBot={true} hero={computerDeck[0]} flipped={!computerFaceUp} selectStat={selectStat} /> : <p>No card</p>}
      </div>

    </div>
    
    <div>
    {roundStatus === 'ready' && playerDeck.length > 0 && (
      <button onClick={startRound}>Start round</button>
    )}
    
    {roundStatus === 'choosing' && (
      <p>Choose a stat</p>
    )}
    
    {roundStatus === 'result' && (
      <div>
        <p>Round winner: {roundWinner}</p>
        <button onClick={finishRound}>Next Round</button>
      </div>
    )} 

{roundStatus === 'over' && (
      <div>
        <p>The game is over, and {prevWinner} won!</p>
        <button onClick={restartGame}>Start a new game</button>
      </div>
    )} 
    </div>
    
    
    </>
  )
}

export default App