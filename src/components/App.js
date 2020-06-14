import React from 'react'
import '../GlobalStyles.css'
import NewGame from './NewGame'

function App() {
  return (
    <React.Fragment>
      <NewGame />
    </React.Fragment>
  )
}
// disable logging for the Sound library
window.soundManager.setup({ debugMode: false })
export default App
