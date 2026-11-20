import React from 'react'

export default function index({info}) {
  return (
<div>
  {info.map(hero => (
    <div key={hero.id}>
      <p>{hero.name}</p>
      <img src={hero.images.md} alt={hero.name} />
    </div>
  ))}
</div>
  )
}
