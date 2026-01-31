import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-50px" })

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/ootd_by_rishhh', icon: '◎' },
    { name: 'Pinterest', url: '#', icon: '◉' },
    { name: 'TikTok', url: '#', icon: '▶' },
  ]

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Portfolio', href: '#closet' },
    { name: 'Services', href: '#consultation' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer id="contact" className="footer" ref={footerRef}>
      <div className="footer-glow"></div>
      
      <div className="container">
        {/* Main Footer Content */}
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Brand Section */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              <span className="logo-text">Style</span>
              <span className="logo-accent">_by_rishhh</span>
            </a>
            <p className="brand-tagline">
              Sassy Elegance. <br />
              Style is a Language. Let's Talk.
            </p>
            <div className="brand-socials">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link hoverable-link"
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-heading">Navigate</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hoverable-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h4 className="footer-heading">Let's Connect</h4>
            <div className="contact-info">
              <a href="mailto:hello@stylebyrishhh.com" className="contact-email hoverable-link">
                hello@stylebyrishhh.com
              </a>
              <p className="contact-location">Based in India 🇮🇳</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="footer-heading">Stay in the Loop</h4>
            <p className="newsletter-text">
              Get exclusive style tips and updates.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="newsletter-input"
                aria-label="Email address"
              />
              <button type="submit" className="newsletter-btn">
                →
              </button>
            </form>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="copyright">
            © {new Date().getFullYear()} Style_by_rishhh. All rights reserved.
          </p>
          <p className="credits">
            Designed with <span className="heart">♥</span> and lots of coffee
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
