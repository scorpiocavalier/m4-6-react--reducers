import React from 'react'
import styled from 'styled-components'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

import svgSeatAvailable from '../../assets/seat-available.svg'

export default ({ props: { rowName, seatNum, price, isAvailable } }) => {
  const info = `Row ${rowName}, Seat ${seatNum} - $${price}`
  return (
    <Tippy content={info}>
      <Seat isAvailable={isAvailable} src={svgSeatAvailable} alt="seat" />
    </Tippy>
  )
}

const Seat = styled.img`
  padding: 5px;
  filter: ${(p) => p.isAvailable && 'grayscale(100%)'};
`
