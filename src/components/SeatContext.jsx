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
  MARK_PURCHASED_SEAT: 'mark-seat-as-purchased',
}

const reducer = (state, action) => {
  const { type, data } = action

  switch (type) {
    case ACTIONS.RECEIVE_SEAT:
      return {
        ...state,
        ...data,
        hasLoaded: !state.hasLoaded,
      }
    case ACTIONS.MARK_PURCHASED_SEAT:
      return {
        ...state,
        ...data,
      }
    default:
      return state
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: ACTIONS.RECEIVE_SEAT,
      data,
    })
  }

  const markSeatAsPurchased = (data) => {
    dispatch({
      type: ACTIONS.MARK_PURCHASED_SEAT,
      data,
    })
  }

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  )
}
