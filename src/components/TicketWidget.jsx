import React, { useContext } from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

import { SeatContext } from './SeatContext'
import { getRowName, getSeatNum } from '../helpers'
import { range } from '../utils'
import Seat from './seat/Seat'

export default () => {
  const {
    state: { hasLoaded, numOfRows, seatsPerRow, seats, bookedSeats },
  } = useContext(SeatContext)

  return (
    <CenterWrapper>
      {hasLoaded ? (
        <Wrapper>
          <RowWrapper>
            {range(numOfRows).map((rowIndex) => {
              const rowName = getRowName(rowIndex)
              return <RowLabel key={rowName}>Row {rowName}</RowLabel>
            })}
          </RowWrapper>

          <SeatMapWrapper>
            {range(numOfRows).map((rowIndex) => {
              const rowName = getRowName(rowIndex)
              return (
                <Row key={rowIndex}>
                  {range(seatsPerRow).map((seatIndex) => {
                    const seatNum = getSeatNum(seatIndex)
                    const seatId = `${rowName}-${seatNum}`
                    const isAvailable = bookedSeats[seatId]
                    const price = seats[seatId].price
                    return (
                      <Seat
                        key={seatId}
                        props={{ rowName, seatNum, price, isAvailable }}
                      />
                    )
                  })}
                </Row>
              )
            })}
          </SeatMapWrapper>
        </Wrapper>
      ) : (
        <CircularProgress color="primary" />
      )}
    </CenterWrapper>
  )
}

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Wrapper = styled.div`
  display: flex;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
  padding: 8px;
`

const RowLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: #222;
  height: 100%;
  padding: 0 10px;
`

const SeatMapWrapper = styled.div`
  background: #eee;
  border-radius: 3px;
  padding: 8px;
`

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`
