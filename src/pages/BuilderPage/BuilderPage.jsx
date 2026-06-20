import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';
import { TEMPLATES } from '../../data/templates';
import { FONT_PAIRINGS } from '../../data/fonts';
import { COLOR_PALETTES } from '../../data/palettes';
import RomanticFloral from '../../components/templates/RomanticFloral/RomanticFloral';
import ModernMinimalist from '../../components/templates/ModernMinimalist/ModernMinimalist';
import RusticElegance from '../../components/templates/RusticElegance/RusticElegance';
import CelestialDreamscape from '../../components/templates/CelestialDreamscape/CelestialDreamscape';
import ArtDecoGlamour from '../../components/templates/ArtDecoGlamour/ArtDecoGlamour';
import styles from './BuilderPage.module.css';

const STEPS = [
  { id: 1, label: 'Template' },
  { id: 2, label: 'Style' },
  { id: 3, label: 'Details' },
];

const templateComponents = {
  'romantic-floral': RomanticFloral,
  'modern-minimalist': ModernMinimalist,
  'rustic-elegance': RusticElegance,
  'celestial-dreamscape': CelestialDreamscape,
  'art-deco-glamour': ArtDecoGlamour,
};

function BuilderPage() {
  const { state, dispatch } = useInvitation();
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  const handleFontSelect = (fontId) => {
    dispatch({ type: 'SET_FONT_PAIRING', payload: fontId });
  };

  const handleColorPalette = (palette) => {
    dispatch({ type: 'SET_COLORS', payload: palette.colors });
  };

  const handleColorChange = (key, value) => {
    dispatch({ type: 'SET_COLORS', payload: { [key]: value } });
  };

  const handleContentChange = (key, value) => {
    dispatch({ type: 'SET_CONTENT', payload: { [key]: value } });
  };

  const TemplateComponent = templateComponents[state.template];

  return (
    <div className={styles.builder}>
      {/* Header */}
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>💍</span>
          WCard
        </Link>
        <div className={styles.headerActions}>
          <Link to="/preview" className={styles.previewBtn}>
            <Eye size={16} /> Preview
          </Link>
        </div>
      </header>

      {/* Steps */}
      <nav className={styles.steps}>
        {STEPS.map((step, i) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className={`${styles.step} ${currentStep === step.id ? styles.stepActive : ''} ${currentStep > step.id ? styles.stepCompleted : ''}`}
              onClick={() => setCurrentStep(step.id)}
            >
              <span className={styles.stepNumber}>
                {currentStep > step.id ? <Check size={14} /> : step.id}
              </span>
              <span className={styles.stepLabel}>{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`${styles.stepConnector} ${currentStep > step.id ? styles.stepConnectorActive : ''}`}
              />
            )}
          </div>
        ))}
      </nav>

      {/* Content */}
      <div className={styles.content}>
        {/* Editor Panel */}
        <div className={styles.editorPanel}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={styles.panelTitle}>Choose Your Template</h2>
                <p className={styles.panelSubtitle}>
                  Select a design that matches your wedding style. Each template features unique
                  scroll animations and visual elements.
                </p>
                <div className={styles.templateOptions}>
                  {TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      className={`${styles.templateOption} ${state.template === template.id ? styles.templateOptionSelected : ''}`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div
                        className={styles.templateOptionPreview}
                        style={{
                          background: `linear-gradient(135deg, ${template.defaults.colors.background}, ${template.defaults.colors.primary}50, ${template.defaults.colors.secondary}30)`,
                        }}
                      >
                        <span className={styles.templateOptionEmoji}>{template.emoji}</span>
                        {state.template === template.id && (
                          <motion.div
                            className={styles.templateOptionCheck}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <Check size={14} />
                          </motion.div>
                        )}
                      </div>
                      <div className={styles.templateOptionInfo}>
                        <h3 className={styles.templateOptionName}>{template.name}</h3>
                        <p className={styles.templateOptionDesc}>{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.navButtons}>
                  <div />
                  <button
                    className={`${styles.navBtn} ${styles.navBtnNext}`}
                    onClick={() => setCurrentStep(2)}
                  >
                    Customize Style <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={styles.panelTitle}>Customize Style</h2>
                <p className={styles.panelSubtitle}>
                  Choose fonts and colors that reflect your personality and wedding theme.
                </p>

                {/* Font Selector */}
                <div className={styles.styleSection}>
                  <h3 className={styles.styleSectionTitle}>Font Pairing</h3>
                  <div className={styles.fontOptions}>
                    {FONT_PAIRINGS.map((pairing) => (
                      <div
                        key={pairing.id}
                        className={`${styles.fontOption} ${state.fontPairing === pairing.id ? styles.fontOptionSelected : ''}`}
                        onClick={() => handleFontSelect(pairing.id)}
                      >
                        <div
                          className={styles.fontOptionPreview}
                          style={{ fontFamily: pairing.heading.family }}
                        >
                          {pairing.preview}
                        </div>
                        <div className={styles.fontOptionName}>{pairing.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palettes */}
                <div className={styles.styleSection}>
                  <h3 className={styles.styleSectionTitle}>Color Palette</h3>
                  <div className={styles.paletteOptions}>
                    {COLOR_PALETTES.map((palette) => (
                      <div
                        key={palette.id}
                        className={`${styles.paletteOption} ${JSON.stringify(state.colors) === JSON.stringify(palette.colors) ? styles.paletteOptionSelected : ''}`}
                        onClick={() => handleColorPalette(palette)}
                      >
                        <div className={styles.paletteSwatches}>
                          <div className={styles.paletteSwatch} style={{ background: palette.colors.primary }} />
                          <div className={styles.paletteSwatch} style={{ background: palette.colors.secondary }} />
                          <div className={styles.paletteSwatch} style={{ background: palette.colors.accent }} />
                        </div>
                        <div className={styles.paletteName}>{palette.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className={styles.styleSection}>
                  <h3 className={styles.styleSectionTitle}>Custom Colors</h3>
                  <div className={styles.customColors}>
                    {['primary', 'secondary', 'accent', 'text', 'background'].map((key) => (
                      <div key={key} className={styles.colorField}>
                        <label className={styles.colorLabel}>{key}</label>
                        <input
                          type="color"
                          className={styles.colorInput}
                          value={state.colors[key]}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.navButtons}>
                  <button
                    className={`${styles.navBtn} ${styles.navBtnBack}`}
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    className={`${styles.navBtn} ${styles.navBtnNext}`}
                    onClick={() => setCurrentStep(3)}
                  >
                    Add Details <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={styles.panelTitle}>Add Your Details</h2>
                <p className={styles.panelSubtitle}>
                  Fill in your wedding details. These will appear on your scroll-animated invitation.
                </p>

                {/* Couple Info */}
                <div className={styles.formGroup}>
                  <h3 className={styles.formGroupTitle}>💍 Couple</h3>
                  <div className={styles.formRow}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Bride's Name</label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={state.content.brideName}
                        onChange={(e) => handleContentChange('brideName', e.target.value)}
                        placeholder="Emma"
                      />
                    </div>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Groom's Name</label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={state.content.groomName}
                        onChange={(e) => handleContentChange('groomName', e.target.value)}
                        placeholder="James"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className={styles.formGroup}>
                  <h3 className={styles.formGroupTitle}>📅 Event Details</h3>
                  <div className={styles.formRow}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Wedding Date</label>
                      <input
                        type="date"
                        className={styles.fieldInput}
                        value={state.content.weddingDate}
                        onChange={(e) => handleContentChange('weddingDate', e.target.value)}
                      />
                    </div>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Wedding Time</label>
                      <input
                        type="time"
                        className={styles.fieldInput}
                        value={state.content.weddingTime}
                        onChange={(e) => handleContentChange('weddingTime', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Ceremony Time</label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={state.content.ceremonyTime}
                        onChange={(e) => handleContentChange('ceremonyTime', e.target.value)}
                        placeholder="4:00 PM"
                      />
                    </div>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Reception Time</label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={state.content.receptionTime}
                        onChange={(e) => handleContentChange('receptionTime', e.target.value)}
                        placeholder="6:00 PM"
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Dress Code</label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={state.content.dressCode}
                        onChange={(e) => handleContentChange('dressCode', e.target.value)}
                        placeholder="Semi-Formal"
                      />
                    </div>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>RSVP Deadline</label>
                      <input
                        type="date"
                        className={styles.fieldInput}
                        value={state.content.rsvpDeadline}
                        onChange={(e) => handleContentChange('rsvpDeadline', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div className={styles.formGroup}>
                  <h3 className={styles.formGroupTitle}>📍 Venue</h3>
                  <div className={styles.formRow}>
                    <div className={`${styles.fieldWrapper} ${styles.fullWidth}`}>
                      <label className={styles.fieldLabel}>Venue Name</label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={state.content.venueName}
                        onChange={(e) => handleContentChange('venueName', e.target.value)}
                        placeholder="The Grand Garden Estate"
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={`${styles.fieldWrapper} ${styles.fullWidth}`}>
                      <label className={styles.fieldLabel}>Venue Address</label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={state.content.venueAddress}
                        onChange={(e) => handleContentChange('venueAddress', e.target.value)}
                        placeholder="123 Rose Garden Lane, Beverly Hills, CA 90210"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Message */}
                <div className={styles.formGroup}>
                  <h3 className={styles.formGroupTitle}>💌 Personal Touch</h3>
                  <div className={styles.formRow}>
                    <div className={`${styles.fieldWrapper} ${styles.fullWidth}`}>
                      <label className={styles.fieldLabel}>Invitation Message</label>
                      <textarea
                        className={`${styles.fieldInput} ${styles.fieldTextarea}`}
                        value={state.content.message}
                        onChange={(e) => handleContentChange('message', e.target.value)}
                        placeholder="We invite you to share in our joy..."
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={`${styles.fieldWrapper} ${styles.fullWidth}`}>
                      <label className={styles.fieldLabel}>Our Love Story</label>
                      <textarea
                        className={`${styles.fieldInput} ${styles.fieldTextarea}`}
                        value={state.content.loveStory}
                        onChange={(e) => handleContentChange('loveStory', e.target.value)}
                        placeholder="How did you two meet? Tell your story..."
                        style={{ minHeight: '120px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.navButtons}>
                  <button
                    className={`${styles.navBtn} ${styles.navBtnBack}`}
                    onClick={() => setCurrentStep(2)}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    className={`${styles.navBtn} ${styles.navBtnNext}`}
                    onClick={() => navigate('/preview')}
                  >
                    Preview Invitation <Eye size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Preview Panel (Desktop) */}
        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}>
            <span className={styles.previewTitle}>Live Preview</span>
            <span className={styles.previewBadge}>Real-time</span>
          </div>
          <div className={styles.previewFrame}>
            <div className={styles.previewScaled}>
              {TemplateComponent && (
                <TemplateComponent
                  content={state.content}
                  colors={state.colors}
                  fonts={state.fonts}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
