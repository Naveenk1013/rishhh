import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Portfolio', href: '#closet' },
    { name: 'Services', href: '#consultation' },
    { name: 'Vibe', href: '#rizz' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="navbar-logo hoverable-link"
          onClick={(e) => { e.preventDefault(); scrollToSection('#hero') }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="logo-text">Style</span>
          <span className="logo-accent">_by_rishhh</span>
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="navbar-links">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <a
                href={link.href}
                className="nav-link hoverable-link"
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
              >
                {link.name}
                <span className="link-underline"></span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="navbar-cta btn btn-primary hoverable-link"
          onClick={(e) => { e.preventDefault(); scrollToSection('#contact') }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book a Session
        </motion.a>

        {/* Mobile Menu Toggle */}
        <button
          className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu glass-dark"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <ul className="mobile-links">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mobile-cta btn btn-primary"
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact') }}
            >
              Book a Session
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
