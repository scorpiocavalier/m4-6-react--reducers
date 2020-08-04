import React, { useContext, useEffect } from 'react'

import GlobalStyles from './GlobalStyles'
import { SeatContext } from './SeatContext'

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext)

  useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        receiveSeatInfoFromServer(data)
      })
  }, [])

  return (
    <>
      <GlobalStyles />
    </>
  )
}

export default App
