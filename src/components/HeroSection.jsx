import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './HeroSection.css'

const HeroSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })
  
  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(smoothProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.9])
  const blur = useTransform(smoothProgress, [0, 0.5], [0, 10])

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5,
      }
    }
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      rotateX: -90,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        style={{ 
          display: 'inline-block',
          transformOrigin: 'bottom center'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))
  }

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      {/* Ambient Particles */}
      <div className="hero-particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="hero-particle"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0
            }}
            animate={{ 
              y: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Left Side - Style Reel */}
      <motion.div 
        className="hero-reel"
        style={{ y: backgroundY }}
      >
        <div className="reel-container">
          {/* Video placeholder with gradient overlay */}
          <div className="reel-video">
            <div className="video-placeholder">
              <div className="placeholder-pattern"></div>
              <div className="placeholder-shimmer"></div>
              
              {/* Animated Grid Lines */}
              <div className="grid-lines">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="grid-line horizontal"
                    style={{ top: `${i * 10}%` }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.1 }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                  />
                ))}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="grid-line vertical"
                    style={{ left: `${i * 10}%` }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 0.1 }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                  />
                ))}
              </div>
            </div>
            <div className="reel-overlay"></div>
          </div>
          
          {/* Floating accent elements */}
          <motion.div 
            className="reel-accent accent-1"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div 
            className="reel-accent accent-2"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div 
            className="reel-accent accent-3"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.div>

      {/* Right Side - Hero Content */}
      <motion.div 
        className="hero-content"
        style={{ 
          y: textY, 
          opacity,
          scale,
          filter: useTransform(blur, v => `blur(${v}px)`)
        }}
      >
        <motion.div
          className="hero-text-wrapper"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          <motion.span 
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Fashion Consultant
          </motion.span>
          
          <h1 className="hero-heading">
            <motion.span className="heading-line" variants={headingVariants}>
              {splitText("Style is")}
            </motion.span>
            <motion.span className="heading-line heading-accent" variants={headingVariants}>
              {splitText("a Language.")}
            </motion.span>
          </h1>
          
          <motion.div
            className="hero-subheading-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.p 
              className="hero-subheading"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(224, 17, 95, 0)',
                  '0 0 40px rgba(224, 17, 95, 0.3)',
                  '0 0 20px rgba(224, 17, 95, 0)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Let's Talk.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="hero-cta-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <motion.a 
              href="#consultation" 
              className="btn btn-primary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(224, 17, 95, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Discover My Services
            </motion.a>
            <motion.a 
              href="#closet" 
              className="btn btn-outline"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              View Portfolio
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <div className="scroll-line">
            <motion.div 
              className="scroll-dot"
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="hero-bg-elements">
        <motion.div 
          className="bg-circle bg-circle-1"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="bg-circle bg-circle-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="bg-text"
          style={{ y: useTransform(smoothProgress, [0, 1], ['0%', '-30%']) }}
        >
          ELEGANCE
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
