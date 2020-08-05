import React, { createContext, useReducer } from 'react'

export const BookingContext = createContext(null)

const STATUS = {
  IDLE: 'idle',
  SEAT_SELECTED: 'seat-selected',
  AWAITING_RESPONSE: 'awaiting-response',
  ERROR: 'error',
  PURCHASED: 'purchased',
}

export const ACTION = {
  BEGIN_BOOKING_PROCESS: 'begin-booking-process',
}

const initialState = {
  status: STATUS.IDLE,
  error: null,
  selectedSeatId: null,
  price: null,
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION.BEGIN_BOOKING_PROCESS:
      return { ...state, ...payload, status: STATUS.SEAT_SELECTED }
    default:
      return state
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log(state)

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}
