import React, { useContext, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import styled from 'styled-components'

import { BookingContext, ACTION } from './BookingContext'

export const PurchaseModal = () => {
  const { state, dispatch } = useContext(BookingContext)
  const [creditCard, setCreditCard] = useState('')
  const [expiration, setExpiration] = useState('')

  console.log('state.selectedSeatId', state.selectedSeatId)

  const handleOpen = state.selectedSeatId !== null
  const handleClose = () => dispatch({ type: ACTION.CANCEL_BOOKING_PROCESS })

  return (
    <Dialog open={handleOpen} onClose={handleClose}>
      <Wrapper>
        <Title>Purchase ticket</Title>
      </Wrapper>
    </Dialog>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.span`
  font-size: 24px;
`
