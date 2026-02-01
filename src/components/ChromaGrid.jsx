import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 3,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const getGradient = (vibe) => {
    switch(vibe) {
      case 'boss-lady':
        return 'linear-gradient(145deg, #d4af37, #000)'; // Gold
      case 'street-luxe':
        return 'linear-gradient(210deg, #e0115f, #000)'; // Ruby
      case 'ethereal':
        return 'linear-gradient(165deg, #f4d03f, #000)'; // Light Gold
      default:
        return 'linear-gradient(180deg, #d4af37, #000)';
    }
  };

  const getBorderColor = (vibe) => {
    switch(vibe) {
      case 'boss-lady':
        return '#d4af37'; // Metallic Gold
      case 'street-luxe':
        return '#e0115f'; // Ruby Red
      case 'ethereal':
        return '#f4d03f'; // Gold Light
      default:
        return '#d4af37';
    }
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((item, i) => (
        <article
          key={item.id}
          className="chroma-card hoverable-image"
          onMouseMove={handleCardMove}
          style={{
            '--card-border': getBorderColor(item.vibe),
            '--card-gradient': getGradient(item.vibe),
            '--spotlight-color': 'rgba(212, 175, 55, 0.3)'
          }}
        >
          <div className="chroma-img-wrapper">
            <img 
              src={item.image} 
              alt={item.title} 
              loading="lazy"
              className="closet-img"
              onLoad={(e) => e.target.classList.add('loaded')}
            />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{item.title}</h3>
            <span className="vibe">{item.vibe.replace('-', ' ')}</span>
            <p className="role">{item.description}</p>
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
