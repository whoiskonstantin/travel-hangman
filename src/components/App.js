import React from 'react'
import '../GlobalStyles.css'
import NewGame from './NewGame'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainMenu from './MainMenu'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <NewGame path='/new-game' component={NewGame} />
        <MainMenu path='/' component={MainMenu} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
