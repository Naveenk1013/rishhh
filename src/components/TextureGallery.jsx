import { useRef, Suspense } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Silk from './Silk'
import './TextureGallery.css'

const TextureGallery = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  
  const backgroundTextY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Gallery items with unique Silk colors for each texture vibe
  const galleryItems = [
    { 
      id: 1, 
      shape: 'blob-1', 
      size: 'large', 
      title: 'Autumn Luxe',
      silkColor: '#8B6914', // Warm gold
      silkSpeed: 3,
      silkScale: 1.2
    },
    { 
      id: 2, 
      shape: 'diagonal', 
      size: 'medium', 
      title: 'Street Couture',
      silkColor: '#2C2C2C', // Deep onyx
      silkSpeed: 4,
      silkScale: 1.5
    },
    { 
      id: 3, 
      shape: 'blob-2', 
      size: 'small', 
      title: 'Evening Glow',
      silkColor: '#8B0A3D', // Deep ruby
      silkSpeed: 2,
      silkScale: 1.0
    },
    { 
      id: 4, 
      shape: 'rounded', 
      size: 'medium', 
      title: 'Casual Chic',
      silkColor: '#D4AF37', // Metallic gold
      silkSpeed: 5,
      silkScale: 0.8
    },
    { 
      id: 5, 
      shape: 'blob-3', 
      size: 'large', 
      title: 'Power Suit',
      silkColor: '#1A1A1A', // Onyx black
      silkSpeed: 2,
      silkScale: 1.8
    },
    { 
      id: 6, 
      shape: 'diagonal-reverse', 
      size: 'small', 
      title: 'Bohemian Dream',
      silkColor: '#6B4423', // Warm brown
      silkSpeed: 4,
      silkScale: 1.2
    },
    { 
      id: 7, 
      shape: 'blob-1', 
      size: 'medium', 
      title: 'Minimalist Flow',
      silkColor: '#9C8B7A', // Neutral taupe
      silkSpeed: 3,
      silkScale: 1.4
    },
    { 
      id: 8, 
      shape: 'rounded', 
      size: 'small', 
      title: 'Festival Ready',
      silkColor: '#C41E3A', // Vivid ruby
      silkSpeed: 6,
      silkScale: 1.0
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 80,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section id="gallery" className="texture-gallery section" ref={sectionRef}>
      {/* Background Text with Parallax */}
      <motion.div 
        className="gallery-bg-text"
        style={{ y: backgroundTextY, opacity: backgroundOpacity }}
      >
        TEXTURE
      </motion.div>

      {/* Floating Orbs */}
      <div className="gallery-orbs">
        <motion.div 
          className="gallery-orb orb-1"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="gallery-orb orb-2"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="gallery-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="section-eyebrow"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.2em' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Portfolio
          </motion.span>
          <h2 className="section-title">
            The <span className="text-sassy">Texture</span> Gallery
          </h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every outfit tells a story. Every texture speaks a language.
          </motion.p>
        </motion.div>

        {/* Masonry Grid with Silk Backgrounds */}
        <motion.div 
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`gallery-item ${item.shape} ${item.size} hoverable-image`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              style={{ 
                transformOrigin: index % 2 === 0 ? 'left center' : 'right center'
              }}
            >
              <div className="item-image">
                {/* Silk Shader Background */}
                <Suspense fallback={
                  <div className="image-placeholder">
                    <span className="placeholder-text">{item.title}</span>
                  </div>
                }>
                  <Silk 
                    color={item.silkColor}
                    speed={item.silkSpeed}
                    scale={item.silkScale}
                    noiseIntensity={1.2}
                    rotation={index * 0.3}
                  />
                </Suspense>
                
                {/* Overlay with title */}
                <div className="item-overlay">
                  <motion.span 
                    className="overlay-text"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    {item.title}
                  </motion.span>
                </div>
                
                {/* Shine effect on hover */}
                <div className="item-shine"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TextureGallery
