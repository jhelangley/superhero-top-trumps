const startRound = () => {
    setRoundStatus('choosing');
}





const selectStat = (stat) => {
    //const playerCard = playerDeck[0]
    //const computerCard = computerDeck[0]
    
    console.log('stat clicked: ' + stat)
    setRoundStatus('result')
}



const finishRound = () => {
    
    const newPlayerDeck = [...playerDeck];
    const newComputerDeck = [...computerDeck];
    
    const playerCard = newPlayerDeck.shift();
    const computerCard = newComputerDeck.shift();
    
    
    newPlayerDeck.push(playerCard)
    newComputerDeck.push(computerCard)
    
    setPlayerDeck(newPlayerDeck);
    setComputerDeck(newComputerDeck);
}