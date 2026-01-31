import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './DigitalCloset.css'

const DigitalCloset = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Looks' },
    { id: 'boss-lady', label: 'Boss Lady' },
    { id: 'street-luxe', label: 'Street Luxe' },
    { id: 'ethereal', label: 'Ethereal' },
  ]

  const portfolioItems = [
    { id: 1, title: 'Power Meeting', vibe: 'boss-lady', description: 'Sharp tailoring meets confidence' },
    { id: 2, title: 'Urban Edge', vibe: 'street-luxe', description: 'Street style with a luxe twist' },
    { id: 3, title: 'Dream Sequence', vibe: 'ethereal', description: 'Flowing fabrics and soft palettes' },
    { id: 4, title: 'Boardroom Ready', vibe: 'boss-lady', description: 'Making moves in style' },
    { id: 5, title: 'Night Out', vibe: 'street-luxe', description: 'When the city lights call' },
    { id: 6, title: 'Garden Party', vibe: 'ethereal', description: 'Whimsical and feminine' },
    { id: 7, title: 'CEO Chic', vibe: 'boss-lady', description: 'Leading with elegance' },
    { id: 8, title: 'Weekend Wander', vibe: 'street-luxe', description: 'Casual never looked this good' },
    { id: 9, title: 'Fairy Tale', vibe: 'ethereal', description: 'Enchanting evening looks' },
  ]

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.vibe === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  }

  return (
    <section id="closet" className="digital-closet section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="closet-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title">
            The Digital <span className="text-sassy">Closet</span>
          </h2>
          <p className="section-subtitle">
            Curated looks for every mood, moment, and milestone.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="filter-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
              {activeFilter === filter.id && (
                <motion.div 
                  className="filter-indicator"
                  layoutId="filterIndicator"
                  transition={{ type: "spring", damping: 25, stiffness: 400 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="closet-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="closet-item hoverable-image"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{ y: -8 }}
              >
                <div className="item-image">
                  <div className="image-placeholder">
                    <span className="placeholder-vibe">{item.vibe.replace('-', ' ')}</span>
                  </div>
                  <div className="item-overlay">
                    <span className="item-vibe">{item.vibe.replace('-', ' ')}</span>
                    <h4 className="item-title">{item.title}</h4>
                    <p className="item-description">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default DigitalCloset
