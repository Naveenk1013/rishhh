import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './RizzSection.css'

const RizzSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Instagram content items (placeholders)
  const instagramItems = [
    { id: 1, type: 'post', caption: 'Street Luxe Vibes ✨' },
    { id: 2, type: 'reel', caption: 'OOTD Monday' },
    { id: 3, type: 'post', caption: 'Boss Lady Energy' },
    { id: 4, type: 'reel', caption: 'Styling Tips' },
    { id: 5, type: 'post', caption: 'Evening Elegance' },
    { id: 6, type: 'reel', caption: 'Thrift Flip' },
    { id: 7, type: 'post', caption: 'Casual Chic' },
    { id: 8, type: 'reel', caption: 'Fashion Week Ready' },
  ]

  // Duplicate for seamless loop
  const marqueeItems = [...instagramItems, ...instagramItems]

  return (
    <section id="rizz" className="rizz-section" ref={sectionRef}>
      {/* Section Header */}
      <motion.div 
        className="rizz-header container"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-eyebrow">Social</span>
        <h2 className="section-title">
          The <span className="text-sassy">Rizz</span> Section
        </h2>
        <p className="section-subtitle">
          Follow the journey. Join the community. Get inspired daily.
        </p>
      </motion.div>

      {/* Instagram Handle Marquee */}
      <div className="handle-marquee">
        <div className="marquee-track">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="handle-item">
              <span className="handle-text">@ootd_by_rishhh</span>
              <span className="handle-separator">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Instagram Posts Marquee */}
      <div className="posts-marquee">
        <motion.div 
          className="marquee-content"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="marquee-track posts-track">
            {marqueeItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="post-item hoverable-image">
                <div className="post-image">
                  <div className="post-placeholder">
                    <span className={`post-type ${item.type}`}>
                      {item.type === 'reel' ? '▶' : '◻'}
                    </span>
                  </div>
                  <div className="post-overlay">
                    <span className="post-caption">{item.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div 
        className="rizz-cta container"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <a 
          href="https://instagram.com/ootd_by_rishhh" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          Follow on Instagram
          <span className="btn-icon">↗</span>
        </a>
      </motion.div>
    </section>
  )
}

export default RizzSection
