import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { BookingContext, ACTION } from './BookingContext'

export const PurchaseModal = ({ open, onClose }) => {
  const { state, dispatch } = useContext(BookingContext)
  const [creditCard, setCreditCard] = useState('')
  const [expiration, setExpiration] = useState('')
  const [response, setResponse] = useState('')
  const [responseColor, setResponseColor] = useState('')

  const handlePurchase = () => {
    dispatch({ type: ACTION.PURCHASE_TICKET_REQUEST })

    try {
      fetch('/api/book-seat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seatId: state.selectedSeatId,
          creditCard: creditCard,
          expiration: expiration,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data)
          if (data.success) {
            dispatch({ type: ACTION.PURCHASE_TICKET_SUCCESS })
            setResponse('Your ticket purchase was successful!')
            setResponseColor('green')
          } else {
            dispatch({
              type: ACTION.PURCHASE_TICKET_FAILURE,
              payload: { message: data.message },
            })
            setResponse(data.message)
            setResponseColor('red')
          }
        })
        .then(dispatch({ type: ACTION.PURCHASE_TICKET_SUCCESS }))
    } catch (err) {
      console.log('err.message', err.message)
      dispatch({
        type: ACTION.PURCHASE_TICKET_FAILURE,
        payload: { message: err.message },
      })
      setResponse(err.message)
      setResponseColor('red')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Wrapper>
        <Title>Purchase ticket</Title>
        <Message>{`You're purchasing 1 ticket for the price of $${state.price}.`}</Message>
        <SeatWrapper>
          <Row>
            <Header>Row</Header>
            <Header>Seat</Header>
            <Header>Price</Header>
          </Row>
          {open && (
            <Row>
              <Data>{state.selectedSeatId.slice(0, 1)}</Data>
              <Data>{state.selectedSeatId.slice(2)}</Data>
              <Data>${state.price}</Data>
            </Row>
          )}
        </SeatWrapper>
        <PaymentWrapper>
          <PaymentTitle>Enter payment details</PaymentTitle>
          <Form>
            <TextField
              label="Credit card"
              variant="outlined"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
              required
            />
            <TextField
              label="Expiration"
              variant="outlined"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePurchase}
            >
              Purchase
            </Button>
          </Form>
          <Response color={responseColor}>{response}</Response>
        </PaymentWrapper>
      </Wrapper>
    </Dialog>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SeatWrapper = styled(Wrapper)`
  align-items: center;
  margin-bottom: 30px;
`

const PaymentWrapper = styled(Wrapper)`
  background: #eeeeee;
  margin-bottom: 30px;
`

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  padding: 30px;
`

const Message = styled.p`
  margin: 0 30px 20px 30px;
`

const Row = styled.div`
  display: flex;
  width: 70%;
  padding: 10px 0;
  border-bottom: 1px solid gray;
`

const Header = styled.span`
  font-size: 16px;
  font-weight: 600;
  width: 180px;
  padding: 5px 20px;
`

const Data = styled(Header)`
  font-weight: 500;
  padding: 5px 20px;
`

const PaymentTitle = styled(Title)`
  font-size: 18px;
  padding-bottom: 0;
`

const Form = styled.form`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 3fr 1.5fr 2fr;
  padding: 30px;
`

const Response = styled.p`
  color: ${(p) => p.color};
  padding: 30px;
  padding-top: 0;
`
