// ===== MAIN APPLICATION CONTROLLER =====
class PortfolioApp {
  constructor() {
    this.currentSection = 'home';
    this.isMenuOpen = false;
    this.scrollPosition = 0;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupNavigation();
    this.setupLoadingScreen();
    this.renderContent();
    this.setupContactForm();
    this.setupThemeToggle();
    this.setupBackToTop();
    this.setupProjectFilters();
    this.setupLazyLoading();
    this.setupAnimations();
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // Scroll handler
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });

    // Mouse move for parallax
    document.addEventListener('mousemove', this.throttle((e) => {
      this.handleMouseMove(e);
    }, 16));
  }

  // ===== NAVIGATION =====
  setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Navigation link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          this.navigateToSection(href.substring(1));
          this.closeMobileMenu();
        }
      });
    });

    // Active section detection
    this.setupSectionObserver();
  }

  toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    this.isMenuOpen = !this.isMenuOpen;
    hamburger?.classList.toggle('active', this.isMenuOpen);
    navMenu?.classList.toggle('active', this.isMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    if (this.isMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const targetPosition = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  setupSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.currentSection = sectionId;
          
          // Update active nav link
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // ===== SLOWER LOADING SCREEN =====
  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 5 + 3;  // Slower progress
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        
        setTimeout(() => {
          loadingScreen?.classList.add('hidden');
          document.body.style.overflow = '';
          
          // Trigger initial animations
          this.triggerInitialAnimations();
        }, 1200);  // Longer wait
      }
    }, 200);  // Slower interval
  }

  triggerInitialAnimations() {
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero [data-aos]');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('aos-animate');
      }, index * 100);
    });

    // Initialize typing animation
    this.initTypingAnimation();
    
    // Initialize counter animations
    this.initCounterAnimations();
  }

  // ===== CONTENT RENDERING =====
  renderContent() {
    this.renderExperience();
    this.renderProjects();
    this.renderDesignProjects();
    this.renderSkills();
    this.renderCertifications();
  }

  renderExperience() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    const experiences = window.portfolioData?.experiences || [];

    timeline.innerHTML = experiences.map((exp, index) => `
      <div class="experience-card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="experience-card-header">
          <div class="experience-icon">
            <i class="${exp.icon}"></i>
          </div>
          <div class="experience-title-wrap">
            <h3 class="experience-title">${exp.title}</h3>
            <p class="experience-company">${exp.company}</p>
          </div>
          <div class="experience-duration">${exp.duration}</div>
        </div>

        <div class="experience-meta-row">
          <div class="experience-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${exp.location}</span>
          </div>
          ${exp.type ? `<span class="experience-type">${exp.type}</span>` : ''}
        </div>

        <ul class="experience-points">
          ${exp.description.map(item => `
            <li>
              <i class="fas fa-check-circle"></i>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>

        ${exp.technologies && exp.technologies.length > 0 ? `
          <div class="experience-tech-tags">
            ${exp.technologies.map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // ===== PROJECT RENDERING WITH INTERACTIVE FEATURES =====
  renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const achievementsGrid = document.getElementById('achievementsGrid');
    
    if (!projectsGrid || !achievementsGrid) return;

    const projects = window.portfolioData?.projects || [];
    const achievements = window.portfolioData?.achievements || [];

    // Render projects with expandable features
    projectsGrid.innerHTML = projects.map((project, index) => `
      <div class="project-card" data-category="${project.category}" data-status="${project.status}" data-aos="fade-up" data-aos-delay="${index * 100}">
        ${project.status === 'discontinued' ? `
          <div class="project-status-badge">Discontinued</div>
        ` : ''}
        
        <div class="project-header">
          <div class="project-category-tag">
            ${project.category.replace('-', ' ').toUpperCase()}
          </div>
          <div class="project-icon">
            <i class="${project.icon}"></i>
          </div>
          <h3 class="project-title">${project.title}</h3>
          
          ${project.award ? `
            <div class="project-award-badge">
              ${project.award}
            </div>
          ` : ''}
          
          ${project.metrics ? `
            <div class="project-metrics">
              ${Object.entries(project.metrics).map(([key, value]) => `
                <div class="metric-item">
                  <span class="metric-key">${key}:</span>
                  <span class="metric-value">${value}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
        
        <div class="project-content">
          <div class="project-tech">
            ${project.technologies.slice(0, 5).map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
            ${project.technologies.length > 5 ? `
              <span class="tech-tag more-tech">+${project.technologies.length - 5}</span>
            ` : ''}
          </div>
          
          <p class="project-description">${project.description}</p>
          
          <div class="project-features">
            <h4 class="features-title">Key Features:</h4>
            <ul class="features-list" data-project-id="${project.id}">
              ${project.features.slice(0, 4).map(feature => `
                <li class="feature-item visible">${feature}</li>
              `).join('')}
              ${project.features.slice(4).map(feature => `
                <li class="feature-item hidden">${feature}</li>
              `).join('')}
              ${project.features.length > 4 ? `
                <li class="feature-item more-features-toggle" onclick="toggleFeatures(${project.id}, 'project')">
                  <span class="toggle-text">+${project.features.length - 4} more features</span>
                  <i class="fas fa-chevron-down toggle-icon"></i>
                </li>
              ` : ''}
            </ul>
          </div>
          
          ${project.note ? `
            <div class="project-note">
              ${project.note}
            </div>
          ` : ''}
          
          <div class="project-actions">
            ${project.hasLiveDemo ? `
              <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener">
                <i class="fas fa-external-link-alt"></i>
                <span>Live Demo</span>
              </a>
            ` : ''}
            <a href="${project.githubUrl}" class="btn ${project.hasLiveDemo ? 'btn-secondary' : 'btn-primary'}" target="_blank" rel="noopener">
              <i class="fab fa-github"></i>
              <span>View Code</span>
            </a>
          </div>
        </div>
      </div>
    `).join('');

    // Render achievements
    achievementsGrid.innerHTML = achievements.map((achievement, index) => `
      <div class="achievement-card" data-aos="fade-up" data-aos-delay="${index * 150}">
        <div class="achievement-icon">
          <i class="${achievement.icon}"></i>
        </div>
        <div class="achievement-content">
          <h4 class="achievement-name">${achievement.title}</h4>
          <p class="achievement-org">${achievement.organization}</p>
          <p class="achievement-desc">${achievement.description}</p>
          ${achievement.technologies ? `
            <div class="achievement-tech">
              ${achievement.technologies.map(tech => `
                <span class="tech-tag">${tech}</span>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  // ===== DESIGN PROJECTS RENDERING WITH INTERACTIVE FEATURES =====
  renderDesignProjects() {
    const designProjectsGrid = document.getElementById('designProjectsGrid');
    if (!designProjectsGrid) return;

    const designProjects = window.portfolioData?.designProjects || [];

    designProjectsGrid.innerHTML = designProjects.map((project, index) => `
      <div class="design-project-card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="project-image-container">
          <div class="project-category-badge">
            <i class="${project.icon}"></i>
            ${project.type}
          </div>
          <div class="project-image-placeholder">
            <i class="${project.icon}"></i>
            <h3 class="project-preview-title">${project.title}</h3>
            <div class="project-year">${project.year}</div>
          </div>
          <div class="project-overlay">
            <div class="project-actions">
              ${project.linkType === 'drive' ? `
                <a href="${project.driveUrl || '#'}" class="action-btn primary drive-btn" target="_blank" rel="noopener">
                  <i class="fab fa-google-drive"></i>
                  View Portfolio
                </a>
              ` : `
                <a href="${project.figmaUrl || '#'}" class="action-btn primary" target="_blank" rel="noopener">
                  <i class="fab fa-figma"></i>
                  View Design
                </a>
              `}
            </div>
          </div>
        </div>

        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">${project.title}</h3>
            <div class="project-tools">
              ${project.tools.slice(0, 3).map(tool => `
                <span class="tool-tag">${tool}</span>
              `).join('')}
              ${project.tools.length > 3 ? `
                <span class="tool-tag more">+${project.tools.length - 3}</span>
              ` : ''}
            </div>
          </div>

          <p class="project-description">${project.description}</p>

          <div class="project-features">
            <h4 class="features-title">Key Features:</h4>
            <ul class="features-list" data-design-id="${project.id}">
              ${project.features.slice(0, 3).map(feature => `
                <li class="feature-item visible">${feature}</li>
              `).join('')}
              ${project.features.slice(3).map(feature => `
                <li class="feature-item hidden">${feature}</li>
              `).join('')}
              ${project.features.length > 3 ? `
                <li class="feature-item more-features-toggle" onclick="toggleFeatures(${project.id}, 'design')">
                  <span class="toggle-text">+${project.features.length - 3} more features</span>
                  <i class="fas fa-chevron-down toggle-icon"></i>
                </li>
              ` : ''}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;

    const skillCategories = window.portfolioData?.skillCategories || [];

    skillsGrid.innerHTML = skillCategories.map((category, index) => `
      <div class="skill-category-card modern" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="category-header">
          <div class="category-icon">${category.icon}</div>
          <h3 class="category-title">${category.title}</h3>
        </div>
        
        <div class="skills-list">
          ${category.skills.map(skill => `
            <div class="skill-item" data-skill-level="${skill.level}">
              <div class="skill-icon">
                <i class="${skill.icon}" style="color: ${skill.color}"></i>
              </div>
              <div class="skill-details">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="--skill-width: ${skill.level}%; --skill-color: ${skill.color}"></div>
                  </div>
                  <span class="skill-percentage">${skill.level}%</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  renderCertifications() {
    const certificationsGrid = document.getElementById('certificationsGrid');
    if (!certificationsGrid) return;

    const certifications = window.portfolioData?.certifications || [];

    certificationsGrid.innerHTML = certifications.map((cert, index) => `
      <div class="certification-card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="certification-header">
          <div class="certification-icon">
            <i class="${cert.icon}"></i>
          </div>
          <div class="certification-content">
            <h4 class="certification-name">${cert.name}</h4>
            <p class="certification-issuer">${cert.issuer}</p>
            <div class="certification-meta">
              <span class="certification-date">${cert.date}</span>
              <span class="certification-verified">
                <i class="fas fa-check-circle"></i>
                Verified
              </span>
            </div>
          </div>
        </div>
        ${cert.skills ? `
          <div class="certification-skills">
            ${cert.skills.map(skill => `
              <span class="tech-tag">${skill}</span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // ===== PROJECT FILTERS =====
  setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ===== SLOWER ANIMATIONS SETUP =====
  setupAnimations() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1200,        // Slower duration
        delay: 200,            // Longer delay between animations
        once: true,
        offset: 120,
        easing: 'ease-out-quart'  // Smoother easing
      });
    }

    // Setup particles if available
    this.initParticles();
  }

  // ===== MUCH SLOWER & SMOOTHER TYPING ANIMATION =====
  // ===== COMPLETELY FIXED TYPING ANIMATION - NO GLITCHES =====
// ===== ULTRA-SMOOTH TYPING ANIMATION - PREMIUM VERSION =====
// ===== BRAND NEW SIMPLE TYPING ANIMATION - NO GLITCHES =====
// ===== PERFECT TYPING ANIMATION FOR YOUR DATA.JS =====
// ===== ULTRA-SIMPLE TYPING ANIMATION =====
// ===== FOOLPROOF TYPING ANIMATION - GUARANTEED TO WORK =====
// ===== BULLETPROOF FADE VERSION =====
initTypingAnimation() {
  const element = document.getElementById('typingText');
  if (!element) return;

  const roles = ["Web Analyst", "Data Science Enthusiast", "UI/UX Designer", "Python Developer", "Power BI Expert"];
  let i = 0;
  
  element.textContent = roles[0];
  element.style.transition = 'opacity 0.5s';
  
  setInterval(() => {
    element.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % roles.length;
      element.textContent = roles[i];
      element.style.opacity = '1';
    }, 500);
  }, 3000);
}



  // ===== SLOWER COUNTER ANIMATIONS =====
  initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const suffix = counter.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = target / 80;  // Slower increment
          
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.floor(current) + suffix;
              setTimeout(updateCounter, 60);  // Slower update
            } else {
              counter.textContent = target + suffix;
            }
          };
          
          updateCounter();
          observer.unobserve(counter);
        }
      });
    });

    counters.forEach(counter => observer.observe(counter));
  }

  // ===== MUCH SLOWER PARTICLES =====
  initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 60,  // Fewer particles
            density: {
              enable: true,
              value_area: 1000  // More spread out
            }
          },
          color: {
            value: '#00d9ff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.3,  // Less opacity
            random: false,
            anim: {
              enable: true,
              speed: 0.5,  // Much slower (was 1)
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 2,  // Smaller particles
            random: true,
            anim: {
              enable: true,
              speed: 20,  // Much slower (was 40)
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 120,  // Shorter lines
            color: '#00d9ff',
            opacity: 0.2,  // Less visible lines
            width: 1
          },
          move: {
            enable: true,
            speed: 2,  // Much slower movement (was 6)
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 300,  // Shorter distance
              line_linked: {
                opacity: 0.8
              }
            },
            bubble: {
              distance: 300,
              size: 30,
              duration: 3,  // Slower
              opacity: 6,
              speed: 2  // Slower
            },
            repulse: {
              distance: 150,  // Shorter distance
              duration: 0.6  // Slower
            },
            push: {
              particles_nb: 2  // Fewer particles
            },
            remove: {
              particles_nb: 1
            }
          }
        },
        retina_detect: true
      });
    }
  }

  // ===== CONTACT FORM =====
  // ===== EMAILJS CONTACT FORM =====
// ===== COMPLETE EMAILJS SETUP IN MAIN.JS =====
// ===== EMAILJS CONTACT FORM IMPLEMENTATION =====
setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  // TODO: REPLACE THESE WITH YOUR ACTUAL IDS FROM EMAILJS
  const EMAIL_CONFIG = {
    publicKey: 'rYhBjcpviawsB_woX',        // Replace with your Public Key
    serviceID: 'service_92jo0w8',        // Replace with your Service ID  
    templateID: 'template_12vbjsq'       // Replace with your Template ID
  };

  // Initialize EmailJS
  emailjs.init(EMAIL_CONFIG.publicKey);

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form elements
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    // Get form data
    const formData = {
      user_name: contactForm.user_name.value.trim(),
      user_email: contactForm.user_email.value.trim(),
      subject: contactForm.subject.value.trim(),
      message: contactForm.message.value.trim(),
      current_time: new Date().toLocaleString()
    };

    // Basic validation
    if (!formData.user_name || !formData.user_email || !formData.subject || !formData.message) {
      this.showNotification('Please fill in all fields.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.user_email)) {
      this.showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    submitBtn.disabled = true;

    // Send email via EmailJS
    emailjs.send(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, formData)
      .then((response) => {
        console.log('✅ Email sent successfully!', response.status, response.text);
        this.showNotification('Message sent successfully! I\'ll get back to you within 24 hours. 🚀', 'success');
        contactForm.reset();
      })
      .catch((error) => {
        console.error('❌ Email sending failed:', error);
        this.showNotification('Failed to send message. Please email me directly at dhruv.sharma1592@gmail.com', 'error');
      })
      .finally(() => {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
}


  // ===== THEME TOGGLE =====
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        document.body.classList.remove('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

  // ===== BACK TO TOP =====
  setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== SCROLL HANDLER =====
  handleScroll() {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Navbar scroll effect
    if (scrolled > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (scrolled > 500) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }

    this.scrollPosition = scrolled;
  }

  // ===== RESIZE HANDLER =====
  handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 1024 && this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Reinitialize particles on resize
    if (typeof particlesJS !== 'undefined') {
      setTimeout(() => {
        this.initParticles();
      }, 100);
    }
  }

  // ===== KEYBOARD NAVIGATION =====
  handleKeyNavigation(e) {
    if (e.key === 'Escape' && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // ===== MUCH SLOWER MOUSE PARALLAX =====
  handleMouseMove(e) {
    // Much slower parallax effect for background elements
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const bgCircles = document.querySelectorAll('.bg-circle');
    bgCircles.forEach((circle, index) => {
      const speed = (index + 1) * 0.1;  // Much slower (was 0.5)
      const x = mouseX * speed;
      const y = mouseY * speed;
      
      circle.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Slower floating icon parallax
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
      const speed = (index + 1) * 0.05;  // Very slow
      const x = (mouseX - 0.5) * speed * 10;
      const y = (mouseY - 0.5) * speed * 10;
      
      icon.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ===== LAZY LOADING =====
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ===== UTILITY METHODS =====
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// ===== SLOWER TOGGLE FEATURES FUNCTIONALITY =====
function toggleFeatures(projectId, type) {
  const selector = type === 'design' ? `[data-design-id="${projectId}"]` : `[data-project-id="${projectId}"]`;
  const featuresList = document.querySelector(selector);
  const hiddenFeatures = featuresList.querySelectorAll('.feature-item.hidden');
  const toggleButton = featuresList.querySelector('.more-features-toggle');
  const toggleText = toggleButton.querySelector('.toggle-text');
  const toggleIcon = toggleButton.querySelector('.toggle-icon');
  
  if (hiddenFeatures[0].style.display === 'block') {
    // Collapse features
    hiddenFeatures.forEach(feature => {
      feature.style.display = 'none';
      feature.style.animation = 'fadeOut 0.5s ease';  // Slower
    });
    
    const visibleCount = type === 'design' ? 3 : 4;
    const totalFeatures = featuresList.querySelectorAll('.feature-item:not(.more-features-toggle)').length;
    toggleText.textContent = `+${totalFeatures - visibleCount} more features`;
    toggleIcon.style.transform = 'rotate(0deg)';
    toggleButton.classList.remove('expanded');
  } else {
    // Expand features
    hiddenFeatures.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.display = 'block';
        feature.style.animation = 'fadeInUp 0.6s ease forwards';  // Slower
      }, index * 150);  // Slower stagger
    });
    
    toggleText.textContent = 'Show less';
    toggleIcon.style.transform = 'rotate(180deg)';
    toggleButton.classList.add('expanded');
  }
}

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        console.log('SW registered');
      })
      .catch(() => {
        console.log('SW registration failed');
      });
  });
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Make toggleFeatures globally available
  window.toggleFeatures = toggleFeatures;
  
  // Initialize the portfolio app
  new PortfolioApp();
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}
