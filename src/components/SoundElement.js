import React, { Component } from 'react'
import Whoosh from '../resources/sounds/whoosh.mp3'
import Impact from '../resources/sounds/impact.mp3'
import Pain from '../resources/sounds/pain.mp3'
import Sound from 'react-sound'
import Key from '../resources/sounds/key.mp3'
import Kids from '../resources/sounds/kids.mp3'

export default class SoundElement extends Component {
  playSound(type) {
    if (this.props.correctLetter === false) {
      return (
        <Sound
          url={type}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      )
    }
  }

  render() {
    const { lives } = this.props
    if (this.props.hiddenLetters === 0) {
      return (
        <Sound
          url={Kids}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      )
    }
    if (this.props.correctLetter === true) {
      return (
        <Sound
          url={Key}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      )
    }
    if (lives === 0) {
      return this.playSound(Pain)
    }
    if (lives === 6 || lives === 1) {
      return this.playSound(Whoosh)
    }
    if (lives < 6) {
      return this.playSound(Impact)
    }
    return null
  }
}
