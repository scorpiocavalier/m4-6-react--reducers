import React, { useContext } from 'react'
import styled from 'styled-components'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

import { BookingContext, ACTION } from '../BookingContext'
import svgSeatAvailable from '../../assets/seat-available.svg'

export default ({ selectedSeatId, rowName, seatNum, price, isBooked }) => {
  const { dispatch } = useContext(BookingContext)

  const info = `Row ${rowName}, Seat ${seatNum} - $${price}`

  return (
    <Tippy content={info}>
      <Button
        onClick={() =>
          dispatch({
            type: ACTION.BEGIN_BOOKING_PROCESS,
            payload: { selectedSeatId, price },
          })
        }
        disabled={isBooked}
      >
        <Seat isBooked={isBooked} src={svgSeatAvailable} alt="seat" />
      </Button>
    </Tippy>
  )
}

const Button = styled.button``

const Seat = styled.img`
  padding: 5px;
  filter: ${(p) => p.isBooked && 'grayscale(100%)'};
`
