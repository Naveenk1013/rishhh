import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import IntroScreen from './components/IntroScreen'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TextureGallery from './components/TextureGallery'
import VibeCards from './components/VibeCards'
import RizzSection from './components/RizzSection'
import DigitalCloset from './components/DigitalCloset'
import Footer from './components/Footer'

import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle intro completion
  const handleIntroComplete = () => {
    setShowIntro(false)
    setIsLoaded(true)
  }

  // Smooth scroll behavior
  useEffect(() => {
    if (!isLoaded) return

    // Handle anchor links with smooth scroll
    const handleAnchorClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href')
      if (href?.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [isLoaded])

  // Prevent scroll during intro
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showIntro])

  return (
    <>
      {/* Intro Screen */}
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main App */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div 
            className="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Custom Cursor */}
            <CustomCursor />
            
            {/* Navigation */}
            <Navbar />
            
            {/* Main Content */}
            <main>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Hero Section */}
                <HeroSection />
                
                {/* Texture Gallery */}
                <TextureGallery />
                
                {/* Consultation Suite - Vibe Cards */}
                <VibeCards />
                
                {/* Digital Closet - Portfolio */}
                <DigitalCloset />
                
                {/* Rizz Section - Instagram */}
                <RizzSection />
              </motion.div>
            </main>
            
            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
