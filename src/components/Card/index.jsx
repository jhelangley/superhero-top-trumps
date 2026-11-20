import React from 'react'

export default function index({hero, flipped = false, selectStat}) {
  return (
<>
      <div className='card'>
        <div className={`cardFlipped ${flipped ? "flipped" : ""}`}>
            <div className='cardFront'>
            <p>{hero.name}</p>
            <img src={hero.images.md} alt={hero.name}/>
            <ul>
                <button onClick={() => selectStat("intelligence")}>Intelligence: {hero.powerstats.intelligence}</button>
                <button onClick={() => selectStat("strength")}>Strength: {hero.powerstats.strength}</button>
                <button onClick={() => selectStat("speed")}>Speed: {hero.powerstats.speed}</button>
                <button onClick={() => selectStat("durability")}>Durability: {hero.powerstats.durability}</button>
                <button onClick={() => selectStat("power")}>Power: {hero.powerstats.power}</button>
                <button onClick={() => selectStat("combat")}>Combat: {hero.powerstats.combat}</button>
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
