import React, { useContext } from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

import { SeatContext } from './SeatContext'
import { getRowName, getSeatNum } from '../helpers'
import { range } from '../utils'
import Seat from './seat/Seat'

export default () => {
  const {
    state: { hasLoaded, numOfRows, seatsPerRow },
  } = useContext(SeatContext)

  return (
    <CenterWrapper>
      {!hasLoaded ? (
        <Wrapper>
          {/* [0, 1, 2, 3....] */}
          {range(numOfRows).map((rowIndex) => {
            // A, B, C...
            const rowName = getRowName(rowIndex)

            return (
              <Row key={rowIndex}>
                {/* Row A, Row B, Row C... */}
                <RowLabel>Row {rowName}</RowLabel>
                {/* [0, 1, 2, 3....] */}
                {range(seatsPerRow).map((seatIndex) => {
                  // A1, A2, A3...
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`

                  return (
                    <SeatWrapper key={seatId}>
                      <Seat seatId={seatId} />
                    </SeatWrapper>
                  )
                })}
              </Row>
            )
          })}
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
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`

const Row = styled.div`
  display: flex;
  position: relative;

  /* each children except the last */
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`

const RowLabel = styled.div`
  font-weight: bold;
  color: black;
`

const SeatWrapper = styled.div`
  padding: 5px;
`
