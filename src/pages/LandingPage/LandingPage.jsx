import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Palette, MapPin, Send, ChevronDown } from 'lucide-react';
import { TEMPLATES } from '../../data/templates';
import { useAuth } from '../../context/AuthContext';
import styles from './LandingPage.module.css';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <Sparkles size={24} />,
      title: 'Scroll Animations',
      desc: 'Captivating scroll-triggered animations that bring your invitation to life.',
    },
    {
      icon: <Palette size={24} />,
      title: 'Fully Customizable',
      desc: 'Choose from 3 stunning templates, 8 font pairings, and 10 color palettes.',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Venue & Maps',
      desc: 'Embed your venue location with an interactive map and directions.',
    },
    {
      icon: <Send size={24} />,
      title: 'RSVP Built In',
      desc: 'Guests can RSVP directly from the invitation. Track responses easily.',
    },
  ];

  return (
    <div className={styles.landing}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span>💍</span> WCard
        </div>
        <nav className={styles.nav}>
          <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>Templates</button>
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</button>
          {user ? (
            <Link to="/dashboard" className={styles.loginBtn}>Dashboard</Link>
          ) : (
            <Link to="/auth" className={styles.loginBtn}>Log In</Link>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <motion.div
            className={`${styles.floatingShape} ${styles.shape1}`}
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className={`${styles.floatingShape} ${styles.shape2}`}
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className={`${styles.floatingShape} ${styles.shape3}`}
            animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className={styles.heroEmoji}>💍</div>
          <h1 className={styles.heroTitle}>
            Create Beautiful{' '}
            <span className={styles.heroTitleAccent}>Wedding Invitations</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Design stunning, scroll-animated wedding invitations that your guests will love.
            Choose a template, customize everything, and share with a single link.
          </p>
          <Link to="/builder" className={styles.heroCta}>
            Start Creating <ArrowRight size={18} />
          </Link>
        </motion.div>

        <motion.div
          className={styles.heroScrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span>Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className={styles.templates}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <span className={styles.sectionTag}>Templates</span>
          <h2 className={styles.sectionTitle}>5 Stunning Designs</h2>
          <p className={styles.sectionSubtitle}>
            Each template is crafted with unique scroll animations, typography, and visual elements
            to match your wedding style.
          </p>
        </motion.div>

        <div className={styles.templateGrid}>
          {TEMPLATES.map((template, i) => (
            <motion.div
              key={template.id}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link to="/builder" className={styles.templateCard}>
                <div className={styles.templatePreview}>
                  <div
                    className={styles.templateGradient}
                    style={{
                      background: `linear-gradient(135deg, ${template.defaults.colors.background}, ${template.defaults.colors.primary}40, ${template.defaults.colors.secondary}30)`,
                    }}
                  >
                    <span className={styles.templateEmoji}>{template.emoji}</span>
                  </div>
                </div>
                <div className={styles.templateInfo}>
                  <h3 className={styles.templateName}>{template.name}</h3>
                  <p className={styles.templateTagline}>{template.tagline}</p>
                  <div className={styles.templateFeatures}>
                    {template.features.map((f) => (
                      <span key={f} className={styles.featureTag}>{f}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <span className={styles.sectionTag}>Features</span>
          <h2 className={styles.sectionTitle}>Everything You Need</h2>
          <p className={styles.sectionSubtitle}>
            From customization to RSVP tracking, we've got every detail covered.
          </p>
        </motion.div>

        <div className={styles.featureGrid}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <motion.div {...fadeUp}>
          <h2 className={styles.ctaTitle}>Ready to Create Your Invitation?</h2>
          <p className={styles.ctaSubtitle}>
            It only takes a few minutes to design something truly special.
          </p>
          <Link to="/builder" className={styles.ctaButton}>
            Get Started Free <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Made with <span className={styles.footerHeart}>♥</span> by WCard</p>
      </footer>
    </div>
  );
}

export default LandingPage;
