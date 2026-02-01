import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './ServicesSection.css'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  const services = [
    {
      id: 1,
      name: "Style Chat",
      tagline: "A quick dose of fashion clarity",
      icon: "💬",
      color: "#FCAF45",
      features: [
        "30-min virtual consultation",
        "Outfit advice for any occasion",
        "Quick style fixes",
        "Color palette suggestions"
      ],
      cta: "Let's Chat ✨"
    },
    {
      id: 2,
      name: "The Wardrobe Edit",
      tagline: "Discover hidden gems in your closet",
      icon: "👗",
      color: "#C13584",
      features: [
        "Full closet audit",
        "Gap identification",
        "Personalized style guide",
        "Mix & match combinations"
      ],
      cta: "Edit My Wardrobe 💫",
      popular: true
    },
    {
      id: 3,
      name: "Shopping Companion",
      tagline: "Your personal style navigator",
      icon: "🛍️",
      color: "#833AB4",
      features: [
        "Personal shopping trip",
        "Brand recommendations",
        "5+ curated outfits",
        "Budget-friendly finds"
      ],
      cta: "Shop With Me 🛒"
    },
    {
      id: 4,
      name: "Total Glow Up",
      tagline: "Complete style transformation",
      icon: "✨",
      color: "#E60023",
      features: [
        "Full wardrobe overhaul",
        "Personal shopping spree",
        "Seasonal lookbooks",
        "Priority styling support",
        "1 month follow-up"
      ],
      cta: "Transform Me 🦋",
      premium: true
    }
  ]

  // 3D tilt effect handler
  const handleMouseMove = (e, cardId) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    setMousePosition({ x: rotateY, y: rotateX, cardId })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0, cardId: null })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 80, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  // Floating animation for icons
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <motion.div 
        className="services-bg-glow"
        style={{ y: parallaxY, opacity: parallaxOpacity }}
      />
      
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Services</span>
          <h2 className="services-title">
            Choose Your <span className="text-gradient">Style Journey</span>
          </h2>
          <p className="services-subtitle">
            Elevate your wardrobe, elevate your confidence ✨
          </p>
        </motion.div>

        {/* Service Cards with 3D effect */}
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`service-card ${service.popular ? 'popular' : ''} ${service.premium ? 'premium' : ''}`}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => {
                setHoveredCard(null)
                handleMouseLeave()
              }}
              onMouseMove={(e) => handleMouseMove(e, service.id)}
              style={{ 
                '--card-accent': service.color,
                transform: mousePosition.cardId === service.id 
                  ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(20px)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Floating particles background */}
              <div className="card-particles">
                <span style={{ '--delay': '0s' }} />
                <span style={{ '--delay': '1s' }} />
                <span style={{ '--delay': '2s' }} />
              </div>

              {service.popular && <span className="card-badge">Most Popular</span>}
              {service.premium && <span className="card-badge premium-badge">VIP Experience</span>}
              
              <div className="card-header">
                <motion.span 
                  className="service-icon"
                  animate={hoveredCard === service.id ? floatAnimation : {}}
                >
                  {service.icon}
                </motion.span>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-tagline">{service.tagline}</p>
              </div>

              <div className="card-content">
                <ul className="features-list">
                  {service.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={hoveredCard === service.id ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className="feature-check">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.a
                href="#contact"
                className="service-cta hoverable-link"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.cta}
              </motion.a>

              <p className="price-tease">DM for the magic number 💌</p>

              {/* 3D shine effect on hover */}
              <div className="card-shine" style={{
                background: mousePosition.cardId === service.id 
                  ? `radial-gradient(circle at ${50 + mousePosition.x * 2}% ${50 + mousePosition.y * 2}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
                  : 'none'
              }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="services-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="custom-note">
            Looking for something unique? <br />
            <span className="highlight">Let's create a custom package just for you.</span>
          </p>
          <motion.a 
            href="#contact" 
            className="custom-cta hoverable-link"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Free Discovery Call →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
