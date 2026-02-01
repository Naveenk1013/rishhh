import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ChromaGrid from './ChromaGrid'
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
    { id: 1, title: 'Power Meeting', vibe: 'boss-lady', description: 'Sharp tailoring meets confidence', image: '/images/closet/boss-lady-1.png' },
    { id: 2, title: 'Urban Edge', vibe: 'street-luxe', description: 'Street style with a luxe twist', image: '/images/closet/street-luxe-1.png' },
    { id: 3, title: 'Dream Sequence', vibe: 'ethereal', description: 'Flowing fabrics and soft palettes', image: '/images/closet/ethereal-1.png' },
    { id: 4, title: 'Boardroom Ready', vibe: 'boss-lady', description: 'Making moves in style', image: '/images/closet/boss-lady-2.png' },
    { id: 5, title: 'Night Out', vibe: 'street-luxe', description: 'When the city lights call', image: '/images/closet/street-luxe-2.png' },
    { id: 6, title: 'Garden Party', vibe: 'ethereal', description: 'Whimsical and feminine', image: '/images/closet/ethereal-2.png' },
    { id: 7, title: 'CEO Chic', vibe: 'boss-lady', description: 'Leading with elegance', image: '/images/closet/boss-lady-3.png' },
    { id: 8, title: 'Weekend Wander', vibe: 'street-luxe', description: 'Casual never looked this good', image: '/images/closet/street-luxe-3.png' },
    { id: 9, title: 'Fairy Tale', vibe: 'ethereal', description: 'Enchanting evening looks', image: '/images/closet/ethereal-3.png' },
  ]

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.vibe === activeFilter)

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

        {/* ChromaGrid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ minHeight: '600px', position: 'relative' }}
          key={activeFilter}
        >
          <ChromaGrid 
            items={filteredItems}
            radius={300}
            columns={3}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default DigitalCloset

