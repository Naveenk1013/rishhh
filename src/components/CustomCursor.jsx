import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [cursorText, setCursorText] = useState('')
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const onMouseMove = useCallback((e) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }, [cursorX, cursorY])

  useEffect(() => {
    // Check if device has touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setIsVisible(false)
      return
    }

    window.addEventListener('mousemove', onMouseMove)
    
    // Track hover on images and specific elements
    const handleMouseOver = (e) => {
      const target = e.target
      if (target.closest('.hoverable-image')) {
        setIsHovering(true)
        setCursorText('View Look')
      } else if (target.closest('.hoverable-link')) {
        setIsHovering(true)
        setCursorText('')
      }
    }
    
    const handleMouseOut = (e) => {
      if (e.target.closest('.hoverable-image') || e.target.closest('.hoverable-link')) {
        setIsHovering(false)
        setCursorText('')
      }
    }
    
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [onMouseMove])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isHovering ? 80 : 12,
          height: isHovering ? 80 : 12,
          borderRadius: '50%',
          backgroundColor: isHovering ? 'var(--ruby-red)' : 'var(--metallic-gold)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: isHovering ? 'normal' : 'difference',
        }}
        animate={{
          scale: isHovering ? 1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              color: '#fff',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
      
      {/* Cursor ring */}
      <motion.div
        className="cursor-ring"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isHovering ? 100 : 40,
          height: isHovering ? 100 : 40,
          borderRadius: '50%',
          border: `1px solid ${isHovering ? 'var(--ruby-red)' : 'var(--metallic-gold)'}`,
          pointerEvents: 'none',
          zIndex: 9998,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}

export default CustomCursor
