import React from 'react'
import styled from 'styled-components'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

import svgSeatAvailable from '../../assets/seat-available.svg'

export default ({ props: { rowName, seatNum, price, isBooked } }) => {
  const info = `Row ${rowName}, Seat ${seatNum} - $${price}`
  return (
    <Tippy content={info}>
      <Button disabled={isBooked}>
        <Seat isBooked={isBooked} src={svgSeatAvailable} alt="seat" />
      </Button>
    </Tippy>
  )
}

const Button = styled.button`

`

const Seat = styled.img`
  padding: 5px;
  filter: ${(p) => p.isBooked && 'grayscale(100%)'};
`
