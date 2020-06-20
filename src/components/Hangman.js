import React, { Component } from 'react'
import { ReactComponent as Gallows } from '../resources/hangman.svg'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(CustomEase)
gsap.registerPlugin(MorphSVGPlugin)

export default class Hangman extends Component {
  componentDidMount() {
    this.step_1()
  }
  componentDidUpdate(prevProps) {
    if (this.props.lives !== prevProps.lives) {
      this.chooseStep(this.props.lives)
    }
  }

  chooseStep = lives => {
    if (lives === 5) {
      this.step_2()
    } else if (lives === 4) {
      this.step_3()
    } else if (lives === 3) {
      this.step_4()
    } else if (lives === 2) {
      this.step_5()
    } else if (lives === 1) {
      this.step_6()
    } else if (lives === 0) {
      this.step_7()
    }
  }

  step_1 = () => {
    gsap.fromTo(
      '.body, .bag',
      { autoAlpha: 0, y: -100 },
      {
        autoAlpha: 1,
        duration: 0.2,
        y: 0
      }
    )
  }

  step_2 = () => {
    gsap.fromTo(
      '.gallows-bottom',
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        duration: 0.2,
        y: 0,
        ease: CustomEase.create(
          'custom',
          'M0,0,C0.262,0.256,0.464,0.262,0.464,1,0.612,1,0.882,1,1,1'
        )
      }
    )
  }

  step_3 = () => {
    gsap.fromTo(
      '.gallows1',
      { autoAlpha: 0, y: -100 },
      {
        autoAlpha: 1,
        duration: 0.3,
        y: -25,
        ease: CustomEase.create(
          'custom',
          'M0,0,C0.262,0.256,0.464,0.262,0.464,1,0.612,1,0.882,1,1,1'
        )
      }
    )
  }

  step_4 = () => {
    gsap.fromTo(
      '.gallows3',
      { autoAlpha: 0, x: 100 },
      {
        autoAlpha: 1,
        duration: 0.3,
        x: -12,
        ease: CustomEase.create(
          'custom',
          'M0,0,C0.262,0.256,0.464,0.262,0.464,1,0.612,1,0.882,1,1,1'
        )
      }
    )
  }

  step_5 = () => {
    gsap.fromTo(
      '.gallows2',
      { autoAlpha: 0, x: 30, y: 30 },
      {
        autoAlpha: 1,
        duration: 0.3,
        x: -12,
        y: -25,
        ease: CustomEase.create(
          'custom',
          'M0,0,C0.262,0.256,0.464,0.262,0.464,1,0.612,1,0.882,1,1,1'
        )
      }
    )
  }

  step_6 = () => {
    gsap.fromTo(
      '.rope',
      { autoAlpha: 0, x: 30 },
      {
        autoAlpha: 1,
        duration: 0.3,
        x: 0,
        ease: CustomEase.create(
          'custom',
          'M0,0,C0.262,0.256,0.464,0.262,0.464,1,0.612,1,0.882,1,1,1'
        )
      }
    )
  }

  step_7 = () => {
    gsap.to('.map', {
      keyframes: [
        { duration: 0.3, y: 100 },
        { opacity: 0, delay: -0.2, duration: 0.2, display: 'none' }
      ],
      ease: CustomEase.create('custom', 'M0,0,C0.902,0.476,1,1,1,1')
    })
    gsap.to('.left-board', {
      rotation: 90,
      transformOrigin: '0 80%',
      duration: 2,
      ease: 'elastic.out(1, 0.4)'
    })

    gsap.to('.right-board', {
      rotation: -90,
      transformOrigin: '100% 80%',
      duration: 2,
      ease: 'elastic.out(1, 0.4)'
    })

    gsap.to('.lhand-bent', {
      morphSVG: {
        duration: 0.5,
        shape: '.lhand-str',
        type: 'linear'
      },
      ease: 'back.out(1.7)'
    })

    gsap.to('.rhand-bent', {
      morphSVG: {
        duration: 0.5,
        shape: '.rhand-str',
        type: 'linear'
      },
      ease: 'back.out(1.7)'
    })

    gsap.to('.lshoe', {
      rotation: -40,
      transformOrigin: '50% 0',
      duration: 1,
      ease: 'elastic.out(1, 0.4)'
    })
    gsap.to('.rshoe', {
      rotation: 40,
      transformOrigin: '50% 0',
      duration: 1,
      ease: 'elastic.out(1, 0.4)'
    })

    gsap.to('.body', {
      y: 5,
      duration: 1,
      ease: 'elastic.out(2, 0.5)'
    })

    gsap.to('.loop1', { autoAlpha: 0, duration: 0 })
    gsap.to('.loop2', { autoAlpha: 1, duration: 0 })

    gsap.to('.body', {
      duration: 100,
      rotation: '2deg',
      transformOrigin: 'top',
      ease: 'elastic.out(3, 0.015)'
    })

    gsap.to('.alive', { autoAlpha: 0, duration: 0, delay: 0.3 })
    gsap.to('.dead', { autoAlpha: 1, duration: 0, delay: 0.3 })

    gsap.to('.face', {
      delay: 0.2,
      duration: 1,
      rotation: '-15deg',
      transformOrigin: 'bottom'
    })
  }
  render() {
    return (
      <div className='svg-container border'>
        <Gallows />
      </div>
    )
  }
}
