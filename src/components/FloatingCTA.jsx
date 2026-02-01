import { motion } from 'framer-motion'
import './FloatingCTA.css'

const FloatingCTA = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Instagram SVG Icon with gradient
  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" className="instagram-svg-icon">
      <defs>
        <linearGradient id="ig-gradient-floating" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FCAF45" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#F56040" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="url(#ig-gradient-floating)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="url(#ig-gradient-floating)" strokeWidth="2" />
      <circle cx="18" cy="6" r="1.5" fill="url(#ig-gradient-floating)" />
    </svg>
  )

  return (
    <>
      {/* Instagram Button - Bottom Right */}
      <div className="floating-social-container">
        <motion.a
          href="https://instagram.com/ootd_by_rishhh"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-instagram hoverable-link"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Follow on Instagram"
        >
          <InstagramIcon />
        </motion.a>
      </div>

      {/* Consultation Button - Bottom Left */}
      <div className="floating-consultation-container">
        <motion.button
          className="floating-cta hoverable-link"
          onClick={scrollToContact}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="cta-text">Consultation</span>
        </motion.button>
      </div>
    </>
  )
}

export default FloatingCTA

