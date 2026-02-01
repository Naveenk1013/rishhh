import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ImageTrail from '../components/ImageTrail'
import CustomCursor from '../components/CustomCursor'
import './GalleryPage.css'

// Import gallery images from src/assets
import autumnLuxe from '../assets/gallery/autumn-luxe.png'
import streetCouture from '../assets/gallery/street-couture.png'
import eveningGlow from '../assets/gallery/evening-glow.png'
import casualChic from '../assets/gallery/casual-chic.png'
import powerSuit from '../assets/gallery/power-suit.png'
import bohemianDream from '../assets/gallery/bohemian-dream.png'
import minimalistFlow from '../assets/gallery/minimalist-flow.png'
import festivalReady from '../assets/gallery/festival-ready.png'

const GalleryPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewMode, setViewMode] = useState('trail') // 'trail' or 'carousel'
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Combine all images from both locations
  const allImages = [
    // From src/assets/gallery (imported)
    { src: autumnLuxe, title: 'Autumn Luxe' },
    { src: streetCouture, title: 'Street Couture' },
    { src: eveningGlow, title: 'Evening Glow' },
    { src: casualChic, title: 'Casual Chic' },
    { src: powerSuit, title: 'Power Suit' },
    { src: bohemianDream, title: 'Bohemian Dream' },
    { src: minimalistFlow, title: 'Minimalist Flow' },
    { src: festivalReady, title: 'Festival Ready' },
    // From public/images (using public path)
    { src: '/images/hero.jpg', title: 'Hero' },
    { src: '/images/closet/boss-lady-1.png', title: 'Boss Lady I' },
    { src: '/images/closet/boss-lady-2.png', title: 'Boss Lady II' },
    { src: '/images/closet/boss-lady-3.png', title: 'Boss Lady III' },
    { src: '/images/closet/ethereal-1.png', title: 'Ethereal I' },
    { src: '/images/closet/ethereal-2.png', title: 'Ethereal II' },
    { src: '/images/closet/ethereal-3.png', title: 'Ethereal III' },
    { src: '/images/closet/street-luxe-1.png', title: 'Street Luxe I' },
    { src: '/images/closet/street-luxe-2.png', title: 'Street Luxe II' },
    { src: '/images/closet/street-luxe-3.png', title: 'Street Luxe III' },
    { src: '/images/rizz/1.jpeg', title: 'Rizz I' },
    { src: '/images/rizz/2.jpeg', title: 'Rizz II' },
    { src: '/images/rizz/3.jpeg', title: 'Rizz III' },
    { src: '/images/rizz/4.jpeg', title: 'Rizz IV' },
    { src: '/images/rizz/5.jpeg', title: 'Rizz V' },
  ]

  const imageSrcs = allImages.map(img => img.src)

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'carousel') return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewMode])

  return (
    <div className="gallery-page">
      <CustomCursor />
      
      {/* Background Gradient */}
      <div className="gallery-page-bg" />
      
      {/* Header */}
      <motion.header 
        className="gallery-page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="back-link hoverable-link">
          <span className="back-arrow">←</span>
          <span>Back to Home</span>
        </Link>
        
        <div className="header-title">
          <h1>Style <span className="text-gradient">Gallery</span></h1>
          <p className="header-subtitle">
            {viewMode === 'trail' ? 'Move your cursor to explore ✨' : 'Use arrows to navigate 🎨'}
          </p>
        </div>

        <div className="header-controls">
          {/* View Mode Toggle */}
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'trail' ? 'active' : ''}`}
              onClick={() => setViewMode('trail')}
            >
              <span className="toggle-icon">✨</span>
              <span className="toggle-text">Trail</span>
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
            >
              <span className="toggle-icon">🖼️</span>
              <span className="toggle-text">View All</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Trail Mode */}
      <AnimatePresence mode="wait">
        {viewMode === 'trail' && (
          <motion.div 
            key="trail"
            className="gallery-trail-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageTrail items={imageSrcs} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel Mode */}
      <AnimatePresence mode="wait">
        {viewMode === 'carousel' && (
          <motion.div 
            key="carousel"
            className="gallery-carousel-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="carousel-main">
              <motion.button 
                className="carousel-nav prev hoverable-link"
                onClick={prevImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ←
              </motion.button>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="carousel-image-wrapper"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={allImages[activeIndex].src} 
                    alt={allImages[activeIndex].title}
                    className="carousel-image"
                  />
                  <div className="carousel-image-info">
                    <span className="image-number">{activeIndex + 1} / {allImages.length}</span>
                    <h3 className="image-title">{allImages[activeIndex].title}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.button 
                className="carousel-nav next hoverable-link"
                onClick={nextImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                →
              </motion.button>
            </div>

            {/* Thumbnail Strip */}
            <div className="carousel-thumbnails">
              {allImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  className={`thumbnail ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={img.src} alt={img.title} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating decorations */}
      <div className="gallery-decorations">
        <motion.div 
          className="decoration deco-1"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="decoration deco-2"
          animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="decoration deco-3"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Footer hint */}
      <motion.div 
        className="gallery-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>Every look tells a story • Every texture speaks style</p>
      </motion.div>
    </div>
  )
}

export default GalleryPage
