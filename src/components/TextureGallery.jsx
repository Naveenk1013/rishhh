import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import './TextureGallery.css'

// Import gallery images
import autumnLuxe from '../assets/gallery/autumn-luxe.png'
import streetCouture from '../assets/gallery/street-couture.png'
import eveningGlow from '../assets/gallery/evening-glow.png'
import casualChic from '../assets/gallery/casual-chic.png'
import powerSuit from '../assets/gallery/power-suit.png'
import bohemianDream from '../assets/gallery/bohemian-dream.png'
import minimalistFlow from '../assets/gallery/minimalist-flow.png'
import festivalReady from '../assets/gallery/festival-ready.png'

const TextureGallery = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredItem, setHoveredItem] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  
  const backgroundTextY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, 50])

  // Gallery items with images
  const galleryItems = [
    { 
      id: 1, 
      shape: 'blob-1', 
      size: 'large', 
      title: 'Autumn Luxe',
      subtitle: 'Warm tones, rich textures',
      image: autumnLuxe,
      color: '#D4AF37'
    },
    { 
      id: 2, 
      shape: 'rounded', 
      size: 'medium', 
      title: 'Street Couture',
      subtitle: 'Urban edge meets style',
      image: streetCouture,
      color: '#2C2C2C'
    },
    { 
      id: 3, 
      shape: 'blob-2', 
      size: 'small', 
      title: 'Evening Glow',
      subtitle: 'Red carpet ready',
      image: eveningGlow,
      color: '#E0115F'
    },
    { 
      id: 4, 
      shape: 'diagonal', 
      size: 'medium', 
      title: 'Casual Chic',
      subtitle: 'Effortless elegance',
      image: casualChic,
      color: '#D4AF37'
    },
    { 
      id: 5, 
      shape: 'blob-3', 
      size: 'large', 
      title: 'Power Suit',
      subtitle: 'Command the room',
      image: powerSuit,
      color: '#1A1A1A'
    },
    { 
      id: 6, 
      shape: 'diagonal-reverse', 
      size: 'small', 
      title: 'Bohemian Dream',
      subtitle: 'Free-spirited vibes',
      image: bohemianDream,
      color: '#8B4513'
    },
    { 
      id: 7, 
      shape: 'rounded', 
      size: 'medium', 
      title: 'Minimalist Flow',
      subtitle: 'Less is more',
      image: minimalistFlow,
      color: '#9C8B7A'
    },
    { 
      id: 8, 
      shape: 'blob-1', 
      size: 'small', 
      title: 'Festival Ready',
      subtitle: 'Party in style',
      image: festivalReady,
      color: '#FF1493'
    },
  ]

  // 3D tilt effect handler
  const handleMouseMove = (e, itemId) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    
    setMousePosition({ x: rotateY, y: rotateX, itemId })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0, itemId: null })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 80,
      rotateX: 15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
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

      {/* Floating Orbs with Parallax */}
      <div className="gallery-orbs">
        <motion.div 
          className="gallery-orb orb-1"
          style={{ y: parallaxY1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="gallery-orb orb-2"
          style={{ y: parallaxY2 }}
          animate={{ 
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="gallery-orb orb-3"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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

        {/* Masonry Grid with 3D Effects */}
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
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => {
                setHoveredItem(null)
                handleMouseLeave()
              }}
              onMouseMove={(e) => handleMouseMove(e, item.id)}
              style={{ 
                '--card-color': item.color,
                transform: mousePosition.itemId === item.id 
                  ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.02)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                transformOrigin: index % 2 === 0 ? 'left center' : 'right center',
                zIndex: hoveredItem === item.id ? 10 : 1
              }}
            >
              <div className="item-image">
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="item-overlay">
                  <motion.div 
                    className="overlay-content"
                    initial={{ y: 20, opacity: 0 }}
                    animate={hoveredItem === item.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="overlay-title">{item.title}</span>
                    <span className="overlay-subtitle">{item.subtitle}</span>
                  </motion.div>
                </div>
                
                {/* 3D Shine effect */}
                <div className="item-shine" style={{
                  background: mousePosition.itemId === item.id 
                    ? `radial-gradient(circle at ${50 + mousePosition.x * 3}% ${50 + mousePosition.y * 3}%, rgba(255,255,255,0.3) 0%, transparent 50%)`
                    : 'none'
                }} />

                {/* Border glow on hover */}
                <motion.div 
                  className="item-glow"
                  animate={hoveredItem === item.id ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="gallery-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="cta-text">Love what you see?</p>
          <motion.a 
            href="#services" 
            className="cta-button hoverable-link"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Create Your Look ✨
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default TextureGallery
