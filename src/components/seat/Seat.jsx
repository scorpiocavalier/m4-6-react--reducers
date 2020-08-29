import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

import { BookingContext, ACTION } from '../BookingContext'
import svgSeatAvailable from '../../assets/seat-available.svg'
import { PurchaseModal } from '../PurchaseModal'

export default ({ selectedSeatId, rowName, seatNum, price, isBooked }) => {
  const { dispatch } = useContext(BookingContext)
  const [open, setOpen] = useState(false)
  const info = `Row ${rowName}, Seat ${seatNum} - $${price}`

  const handleOpen = () => {
    setOpen(true)
    dispatch({
      type: ACTION.BEGIN_BOOKING_PROCESS,
      payload: { selectedSeatId, price },
    })
  }

  const handleClose = () => {
    setOpen(false)
    dispatch({ type: ACTION.CANCEL_BOOKING_PROCESS })
  }

  return (
    <Tippy content={info}>
      <Button onClick={handleOpen} disabled={isBooked}>
        <Seat isBooked={isBooked} src={svgSeatAvailable} alt="seat" />
        <PurchaseModal open={open} onClose={handleClose} />
      </Button>
    </Tippy>
  )
}

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`

const Seat = styled.img`
  padding: 5px;
  filter: ${(p) => p.isBooked && 'grayscale(100%)'};
`
