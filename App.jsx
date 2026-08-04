import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMail, FiMessageCircle, FiBriefcase } from 'react-icons/fi';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Contact', id: 'contact' },
];

const services = [
  {
    title: 'AI Voice Calling Agent',
    description:
      'Handles inbound and outbound calls, qualifies leads and books appointments automatically.',
    features: ['24/7 call handling', 'Lead qualification', 'Appointment booking'],
    benefits: ['Fewer missed opportunities', 'Better lead follow-up', 'More booked meetings'],
    useCases: ['Open house follow-up', 'Listing inquiries', 'Buyer consultations'],
  },
  {
    title: 'AI Chatbot',
    description:
      'Website and WhatsApp chatbot that answers questions instantly.',
    features: ['Instant responses', 'Lead capture', 'Multi-channel support'],
    benefits: ['Faster engagement', 'Higher satisfaction', 'More qualified conversations'],
    useCases: ['Neighborhood FAQ', 'Property availability', 'Agent availability'],
  },
  {
    title: 'Lead Qualification Automation',
    description:
      'Automatically qualify leads and send only high-quality prospects to your sales team.',
    features: ['Behavior-based scoring', 'Automated routing', 'CRM sync'],
    benefits: ['Smarter pipeline', 'Less manual triage', 'Higher close rate'],
    useCases: ['Buyer intent scoring', 'Seller lead prioritization', 'Referral follow-up'],
  },
  {
    title: 'CRM & Workflow Automation',
    description:
      'Automate follow-ups, reminders, lead tracking and repetitive business tasks.',
    features: ['Automated reminders', 'Workflow triggers', 'Task syncing'],
    benefits: ['Less admin work', 'More consistency', 'Better team visibility'],
    useCases: ['Listing launch tasks', 'Client nurture flows', 'Move-in checklists'],
  },
];

const whyChooseUs = [
  '24/7 Availability',
  'Instant Lead Response',
  'Higher Conversion Rates',
  'No Missed Calls',
  'CRM Integration',
  'Professional Support',
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$299',
    featured: false,
    features: ['AI Chatbot', 'Basic Automation', 'Email Support'],
  },
  {
    name: 'Growth',
    price: '$699',
    featured: false,
    features: ['AI Chatbot', 'Voice Agent', 'CRM Integration'],
  },
  {
    name: 'Professional',
    price: '$1499',
    featured: true,
    features: ['Everything in Growth', 'Advanced Automation', 'Priority Support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom Pricing',
    featured: false,
    features: ['Custom AI Solutions', 'Unlimited Workflows', 'Dedicated Support'],
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.div>
  );
}

function App() {
  const [openCard, setOpenCard] = useState(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    projectName: '',
    projectDescription: '',
    preferredDate: '',
    preferredTime: '',
    meetingPlatform: 'Google Meet',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (index) => {
    setOpenCard((current) => (current === index ? null : index));
  };

 const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;

if (!formspreeUrl) {
  throw new Error("VITE_FORMSPREE_URL is missing.");
}
 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;

    if (!formspreeUrl) {
      throw new Error("VITE_FORMSPREE_URL is missing.");
    }

    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        meetingPlatform: formData.meetingPlatform,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit booking.");
    }

    setSubmitted(true);
    setStep(1);

    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      projectName: "",
      projectDescription: "",
      preferredDate: "",
      preferredTime: "",
      meetingPlatform: "Google Meet",
    });

  } catch (error) {
    window.alert(error.message || "Something went wrong.");
  }
};
  return (
    <div className="page-shell">
      <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="brand" onClick={(event) => { event.preventDefault(); handleScroll('home'); }}>
          <span className="brand-mark">P</span>
          <span>PrimeEstate AI</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); handleScroll(item.id); }}>
              {item.label}
            </a>
          ))}
        </nav>

        <motion.button
          className="btn btn-cta"
          whileHover={{ y: -2, scale: 1.03, boxShadow: '0 22px 50px rgba(11, 95, 255, 0.24)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleScroll('booking')}
        >
          Book a Call
        </motion.button>
      </header>

      <main>
        <motion.section
          id="home"
          className="hero-section"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-copy">
            <span className="eyebrow">Premium AI Automation</span>
            <h1>AI Automation for Modern Real Estate Businesses</h1>
            <p>
              We build AI Voice Agents, AI Chatbots and Workflow Automation that help real estate
              businesses capture more leads, respond instantly and book more appointments.
            </p>
            <div className="hero-actions">
              <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" onClick={() => handleScroll('booking')}>
                Book a Free Call
              </motion.button>
              <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn btn-secondary" onClick={() => handleScroll('services')}>
                Explore Services
              </motion.button>
            </div>
            <div className="hero-pill-group">
              <span>Lead Capture</span>
              <span>Voice AI</span>
              <span>Workflow Automation</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <motion.div
              className="visual-card"
              animate={{ y: [0, -8, 0], rotate: [0, 0.6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="dashboard-shell">
                <div className="dashboard-topbar">
                  <div className="dashboard-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="dashboard-label">AI Analytics</span>
                </div>
                <div className="dashboard-grid">
                  <div className="panel panel-large">
                    <p className="panel-title">AI Analytics</p>
                    <div className="metric-bar" />
                    <div className="metric-bar short" />
                    <div className="metric-bar" />
                  </div>
                  <div className="panel panel-small">
                    <p className="panel-title">CRM Dashboard</p>
                    <div className="mini-stat">+18%</div>
                  </div>
                  <div className="panel panel-small">
                    <p className="panel-title">Voice Agent</p>
                    <div className="mini-pill">Live</div>
                  </div>
                  <div className="panel panel-medium">
                    <p className="panel-title">Lead Statistics</p>
                    <div className="bars">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="panel panel-wide">
                    <p className="panel-title">Chat Interface</p>
                    <div className="chat-bubble">How soon can we meet?</div>
                    <div className="chat-bubble reply">Today at 4PM</div>
                  </div>
                  <div className="panel panel-small">
                    <p className="panel-title">Appointments</p>
                    <div className="appointment-card">3 new</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="services" className="content-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <SectionHeading
            eyebrow="Services"
            title="Automation built for high-performing real estate teams"
            description="From lead capture to appointment booking, every solution is designed to feel premium, fast and effortless."
          />
          <div className="card-grid services-grid">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="info-card service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className="card-top">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <button className="text-link" onClick={() => toggleService(index)}>
                  {openCard === index ? 'Hide Details' : 'Learn More'}
                </button>
                <AnimatePresence initial={false}>
                  {openCard === index && (
                    <motion.div
                      className="accordion-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div>
                        <h4>Features</h4>
                        <ul>
                          {service.features.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Benefits</h4>
                        <ul>
                          {service.benefits.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Real Estate Use Cases</h4>
                        <ul>
                          {service.useCases.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="why-choose-us" className="content-section alt-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="A premium experience that makes every interaction count"
            description="Our systems are designed to feel polished, responsive and purpose-built for modern real estate operations."
          />
          <div className="card-grid feature-grid">
            {whyChooseUs.map((item, index) => (
              <motion.article
                key={item}
                className="info-card feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <h3>{item}</h3>
                <p>Trusted by ambitious teams that want speed, consistency and better lead conversion.</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="pricing" className="content-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <SectionHeading
            eyebrow="Pricing"
            title="Flexible plans for agencies at every stage of growth"
            description="Choose a plan that matches your workflow today and scale confidently as your pipeline grows."
          />
          <div className="card-grid pricing-grid">
            {pricingPlans.map((plan, index) => (
              <motion.article
                key={plan.name}
                className={`info-card pricing-card ${plan.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div>
                  <h3>{plan.name}</h3>
                  <p className="price">{plan.price}</p>
                </div>
                <ul>
                  {plan.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleScroll('booking')}>
                  {plan.featured ? 'Book a Call' : 'Get Started'}
                </motion.button>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="booking" className="content-section alt-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <SectionHeading
            eyebrow="Book a Call"
            title="Let’s map out your AI automation strategy"
            description="Share a few details and we’ll follow up with a tailored recommendation for your team."
          />

          <form className="booking-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="success-message">
                <h3>Thank you! We have received your booking request. We&apos;ll contact you soon.</h3>
              </div>
            ) : (
              <>
                {step === 1 ? (
                  <div className="form-step">
                    <div className="form-row">
                      <label>
                        Full Name
                        <input name="fullName" value={formData.fullName} onChange={handleChange} required />
                      </label>
                      <label>
                        Company Name
                        <input name="companyName" value={formData.companyName} onChange={handleChange} required />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        Business Email
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                      </label>
                      <label>
                        Project Name
                        <input name="projectName" value={formData.projectName} onChange={handleChange} required />
                      </label>
                    </div>
                    <div className="form-actions">
                      <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" type="button" onClick={() => setStep(2)}>
                        Continue
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="form-step">
                    <div className="form-row">
                      <label>
                        Project Description
                        <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} rows="4" required />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        Preferred Date
                        <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                      </label>
                      <label>
                        Preferred Time
                        <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        Meeting Platform
                        <select name="meetingPlatform" value={formData.meetingPlatform} onChange={handleChange}>
                          <option>Google Meet</option>
                          <option>Zoom</option>
                          <option>Microsoft Teams</option>
                          <option>Other</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-actions">
                      <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn btn-secondary" type="button" onClick={() => setStep(1)}>
                        Previous
                      </motion.button>
                      <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" type="submit">
                        Submit Booking
                      </motion.button>
                    </div>
                  </div>
                )}
              </>
            )}
          </form>
        </motion.section>

        <motion.section id="contact" className="content-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s discuss your next automation upgrade"
            description="Reach out via email, WhatsApp or LinkedIn for a quick conversation."
          />
          <div className="contact-row">
            <motion.a
              href="mailto:sufiyanumarr@gmail.com?subject=AI%20Automation%20Inquiry"
              className="contact-pill"
              whileHover={{ y: -4, scale: 1.03, boxShadow: '0 16px 36px rgba(11, 95, 255, 0.14)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="contact-icon"><FiMail /></span>
              <span className="contact-label">Email</span>
            </motion.a>
            <motion.a
              href="https://wa.me/923044974959"
              target="_blank"
              rel="noreferrer"
              className="contact-pill"
              whileHover={{ y: -4, scale: 1.03, boxShadow: '0 16px 36px rgba(11, 95, 255, 0.14)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="contact-icon"><FiMessageCircle /></span>
              <span className="contact-label">WhatsApp</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sufiyan-umar-9327b1385"
              target="_blank"
              rel="noreferrer"
              className="contact-pill"
              whileHover={{ y: -4, scale: 1.03, boxShadow: '0 16px 36px rgba(11, 95, 255, 0.14)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="contact-icon"><FiBriefcase /></span>
              <span className="contact-label">LinkedIn</span>
            </motion.a>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="brand footer-brand">
          <span className="brand-mark">P</span>
          <span>PrimeEstate AI</span>
        </div>
        <p>© 2026 PrimeEstate AI. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="https://www.linkedin.com/in/sufiyan-umar-9327b1385" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
