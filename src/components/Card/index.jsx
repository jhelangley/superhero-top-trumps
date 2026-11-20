import React from 'react'

export default function index({hero, flipped = false}) {
  return (
<>
      <div className='card'>
        <div className={`cardFlipped ${flipped ? "flipped" : ""}`}>
            <div className='cardFront'>
            <p>{hero.name}</p>
            <img src={hero.images.md} alt={hero.name}/>
            <ul>
                <li>Intelligence: {hero.powerstats.intelligence}</li>
                <li>Strength: {hero.powerstats.strength}</li>
                <li>Speed: {hero.powerstats.speed}</li>
                <li>Durability: {hero.powerstats.durability}</li>
                <li>Power: {hero.powerstats.power}</li>
                <li>Combat: {hero.powerstats.combat}</li>
            </ul>
        </div>

        <div className='cardBack'>
            <p>back</p>
        </div>
        </div>
      </div>
    </>
  )
}
