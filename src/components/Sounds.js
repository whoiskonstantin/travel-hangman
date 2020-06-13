import React from 'react'

export default function Sounds() {
  return <div></div>
}
function sound(src) {
  this.sound = document.createElement('audio')
  this.sound.src = src
  this.sound.setAttribute('preload', 'auto')
  this.sound.setAttribute('controls', 'none')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.play = function () {
    this.sound.play()
  }
  this.stop = function () {
    this.sound.pause()
  }
}

let whoosh = new sound('resources/whoosh.mp3')
let impact = new sound('resources/impact.mp3')
let pain = new sound('resources/pain1.mp3')
