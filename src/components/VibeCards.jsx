import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './VibeCards.css'

const VibeCards = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const cards = [
    {
      id: 1,
      title: 'The Wardrobe Edit',
      subtitle: 'Textures & Brands',
      description: 'A deep dive into your closet. We curate, organize, and elevate your existing pieces while identifying gaps.',
      icon: '✦',
      features: ['Closet Audit', 'Brand Recommendations', 'Texture Pairing', 'Color Analysis'],
      accent: 'gold'
    },
    {
      id: 2,
      title: 'The Event Slay',
      subtitle: 'Silhouette & Shape',
      description: 'Look unforgettable at your next event. From galas to date nights, we craft the perfect ensemble.',
      icon: '◆',
      features: ['Event Styling', 'Silhouette Mapping', 'Accessory Selection', 'Mood Board Creation'],
      accent: 'ruby'
    },
    {
      id: 3,
      title: 'The Personal Shopper',
      subtitle: 'Quality & Vibes',
      description: 'Let me be your fashion guide. Personalized shopping experiences tailored to your lifestyle.',
      icon: '●',
      features: ['Curated Shopping', 'Budget Planning', 'Trend Forecasting', 'Style Evolution'],
      accent: 'gold'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section id="consultation" className="vibe-cards-section section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="vibe-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Services</span>
          <h2 className="section-title">
            The Consultation <span className="text-sassy">Suite</span>
          </h2>
          <p className="section-subtitle">
            Three unique experiences. One goal: Making you feel like the icon you are.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="cards-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`vibe-card glass hoverable-link`}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Card Accent */}
              <div className={`card-accent ${card.accent}`}></div>
              
              {/* Card Icon */}
              <div className={`card-icon ${card.accent}`}>
                {card.icon}
              </div>

              {/* Card Content */}
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <span className="card-subtitle">{card.subtitle}</span>
                <p className="card-description">{card.description}</p>
                
                {/* Features List */}
                <ul className="card-features">
                  {card.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card CTA */}
              <motion.a 
                href="#contact"
                className={`card-cta ${card.accent}`}
                whileHover={{ x: 5 }}
              >
                Book This Experience
                <span className="cta-arrow">→</span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default VibeCards
