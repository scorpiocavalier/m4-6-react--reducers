import React from 'react'

import svgSeatAvailable from '../../assets/seat-available.svg'

export default ({ isTaken }) => {
  return (
    <img
      src={svgSeatAvailable}
      alt="seat"
      style={{ filter: isTaken && 'grayscale(100%)' }}
    />
  )
}
