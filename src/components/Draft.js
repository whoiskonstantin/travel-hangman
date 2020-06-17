handleChoose = key => {
  let { dash, capital, lives, hiddenLetters, clickedLetters } = this.state

  // Check if key has been clicked before
  // Return if the key has been pressed
  if (clickedLetters.indexOf(key) !== -1) {
    return
  }
  clickedLetters.push(key)
  // If key hasn't been clicked, add the key co the clickedLetters array
  this.setState({ clickedLetters })
  // console.log(this.state.clickedLetters)

  // Check if the worng letter is chosen and if it was the last life
  // Update the state
  const index = capital.indexOf(key)
  if (index === -1 && lives === 1) {
    setTimeout(() => {
      this.setState({
        lives: 0,
        playing: false,
        correctLetter: false,
        countries: allCountries
      })
    }, 2000)
    return
  }

  // If it wasn't the last life update the state
  if (index === -1 && lives !== 1) {
    this.setState({ lives: lives - 1, correctLetter: false })
    return
  }

  // Render the letter
  for (let i = 0; i < capital.length; i++) {
    if (capital[i] === key) {
      dash[i] = key.toUpperCase()
      hiddenLetters--
      this.setState({ hiddenLetters, correctLetter: true })
    }
  }

  if (hiddenLetters === 0) {
    return setTimeout(() => {
      this.setState({ playing: false, hiddenLetters, correctLetter: false })
    }, 2000)
  }
  return this.setState({ dash, hiddenLetters })
}
