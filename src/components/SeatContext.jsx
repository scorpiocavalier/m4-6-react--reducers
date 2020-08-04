import React, { createContext, useReducer } from 'react'

export const SeatContext = createContext()

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
}

const ACTIONS = {
  RECEIVE_SEAT: 'receive-seat-info-from-server',
}

const reducer = (state, action) => {
  const { type, data } = action

  switch (type) {
    case ACTIONS.RECEIVE_SEAT:
      return { ...data }
    default:
      return state
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: ACTIONS.RECEIVE_SEAT,
      ...data,
    })
  }

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  )
}
