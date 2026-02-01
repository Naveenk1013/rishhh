import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-50px" })

  // SVG Icons with neon style gradients
  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" className="social-icon-svg instagram-icon">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FCAF45" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#F56040" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="url(#instagram-gradient)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="url(#instagram-gradient)" strokeWidth="2" />
      <circle cx="18" cy="6" r="1.5" fill="url(#instagram-gradient)" />
    </svg>
  )

  const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" className="social-icon-svg pinterest-icon">
      <defs>
        <linearGradient id="pinterest-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E60023" />
          <stop offset="100%" stopColor="#BD081C" />
        </linearGradient>
      </defs>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.387.803-2.424 1.804-2.424.851 0 1.262.639 1.262 1.405 0 .856-.545 2.136-.827 3.323-.236.996.499 1.807 1.481 1.807 1.777 0 3.143-1.874 3.143-4.579 0-2.394-1.72-4.068-4.177-4.068-2.845 0-4.515 2.134-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 01.069.288c-.076.316-.244 1-.277 1.14-.044.183-.145.222-.336.134-1.248-.581-2.028-2.407-2.028-3.872 0-3.153 2.291-6.048 6.605-6.048 3.469 0 6.165 2.471 6.165 5.774 0 3.445-2.172 6.219-5.186 6.219-1.013 0-1.966-.527-2.292-1.148l-.623 2.377c-.226.869-.834 1.957-1.242 2.621.936.289 1.929.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="url(#pinterest-gradient)" />
    </svg>
  )

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="social-icon-svg tiktok-icon">
      <defs>
        <linearGradient id="tiktok-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F2EA" />
          <stop offset="50%" stopColor="#FF0050" />
          <stop offset="100%" stopColor="#FF00A0" />
        </linearGradient>
      </defs>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298 0 .593.046.877.136V9.4a6.33 6.33 0 00-.88-.06A6.34 6.34 0 003.12 16a6.34 6.34 0 0010.02 5.18A6.34 6.34 0 0015.81 16V9.01a8.35 8.35 0 004.18 1.12V6.69h-.4z" fill="url(#tiktok-gradient)" />
    </svg>
  )

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/ootd_by_rishhh', Icon: InstagramIcon },
    { name: 'Pinterest', url: '#', Icon: PinterestIcon },
    { name: 'TikTok', url: '#', Icon: TikTokIcon },
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
                  <social.Icon />
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
              <a href="mailto:rishikaaditya93@gmail.com" className="contact-email hoverable-link">
                rishikaaditya93@gmail.com
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
                placeholder="youremail@domain.com"
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
            Made by <a href="https://naveen-kr1.netlify.app/" target="_blank" rel="noopener noreferrer" className="credit-link hoverable-link">Naveen Kumar</a> • Managed by <a href="https://lancealot.in/" target="_blank" rel="noopener noreferrer" className="credit-link hoverable-link">Lancealot</a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
