import React from 'react'

export default function index({isBot, hero, flipped = false, selectStat}) {
  return (
<>
      <div className='card'>
        <div className={`cardFlipped ${flipped ? "flipped" : ""}`}>
            <div className='cardFront'>
            <p>{hero.name}</p>
            <img src={hero.images.md} alt={hero.name}/>
            
            {isBot 
            ? (<ul>
                <li>Intelligence: {hero.powerstats.intelligence}</li>
                <li>Strength: {hero.powerstats.strength}</li>
                <li>Speed: {hero.powerstats.speed}</li>
                <li>Durability: {hero.powerstats.durability}</li>
                <li>Power: {hero.powerstats.power}</li>
                <li>Combat: {hero.powerstats.combat}</li>
              </ul>) 
            : (<ul>
                <li><button onClick={() => selectStat("intelligence")}>Intelligence: {hero.powerstats.intelligence}</button></li>
                <li><button onClick={() => selectStat("strength")}>Strength: {hero.powerstats.strength}</button></li>
                <li><button onClick={() => selectStat("speed")}>Speed: {hero.powerstats.speed}</button></li>
                <li><button onClick={() => selectStat("durability")}>Durability: {hero.powerstats.durability}</button></li>
                <li><button onClick={() => selectStat("power")}>Power: {hero.powerstats.power}</button></li>
                <li><button onClick={() => selectStat("combat")}>Combat: {hero.powerstats.combat}</button></li>
              </ul>) 
            }
            
           
        </div>

        <div className='cardBack'>
            <p>back</p>
        </div>
        </div>
      </div>
    </>
  )
}
