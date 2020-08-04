import React, { useContext, useEffect } from 'react'

import GlobalStyles from './GlobalStyles'
import TicketWidget from './TicketWidget'
import { SeatContext } from './SeatContext'

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext)

  useEffect(() => {
    fetch('/api/seat-availability')
      .then((res) => res.json())
      .then((data) => {
        receiveSeatInfoFromServer(data)
      })
  }, [])

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
    </>
  )
}

export default App
