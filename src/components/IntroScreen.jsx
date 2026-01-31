import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './IntroScreen.css'

const IntroScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('initial') // initial, reveal, exit

  useEffect(() => {
    // Phase timeline
    const timer1 = setTimeout(() => setPhase('reveal'), 500)
    const timer2 = setTimeout(() => setPhase('exit'), 3000)
    const timer3 = setTimeout(() => onComplete(), 3800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  const handleSkip = () => {
    setPhase('exit')
    setTimeout(() => onComplete(), 800)
  }

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.2,
            filter: 'blur(20px)',
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Animated Background */}
          <div className="intro-bg">
            {/* Floating Orbs */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-orb"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight
                  ],
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  width: 20 + Math.random() * 60,
                  height: 20 + Math.random() * 60,
                }}
              />
            ))}

            {/* Gold Particles */}
            <div className="gold-particles">
              {[...Array(50)].map((_, i) => (
                <motion.span
                  key={i}
                  className="particle"
                  initial={{ y: '100vh', opacity: 0 }}
                  animate={{ 
                    y: '-100vh',
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: 'linear'
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    width: 2 + Math.random() * 4,
                    height: 2 + Math.random() * 4,
                  }}
                />
              ))}
            </div>

            {/* Gradient Overlay */}
            <div className="gradient-overlay"></div>
          </div>

          {/* Content */}
          <div className="intro-content">
            {/* Logo Mark */}
            <motion.div
              className="intro-logo-mark"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="logo-letter">R</span>
            </motion.div>

            {/* Text Reveal */}
            <motion.div
              className="intro-text"
              initial={{ opacity: 0, y: 30 }}
              animate={phase === 'reveal' ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="intro-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Welcome to
              </motion.span>
              <motion.h1 
                className="intro-title"
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.1em' }}
                transition={{ delay: 1, duration: 1.2 }}
              >
                The Digital Runway
              </motion.h1>
              <motion.div 
                className="intro-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              />
              <motion.p 
                className="intro-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                Style is a Language
              </motion.p>
            </motion.div>
          </div>

          {/* Skip Button */}
          <motion.button
            className="skip-btn"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Skip Intro
          </motion.button>

          {/* Loading Progress */}
          <motion.div 
            className="intro-progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroScreen
