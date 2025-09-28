// ===== ANIMATION CONTROLLER =====
class AnimationController {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupParallaxEffects();
    this.setupCounterAnimations();
    this.setupTypingAnimation();
    this.setupParticles();
  }

  // ===== INTERSECTION OBSERVER =====
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.triggerAnimation(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    this.observers.set('intersection', observer);
  }

  // ===== TRIGGER ANIMATIONS =====
  triggerAnimation(element) {
    const animationType = element.dataset.animate;
    const delay = element.dataset.delay || 0;

    setTimeout(() => {
      switch (animationType) {
        case 'fadeInUp':
          this.fadeInUp(element);
          break;
        case 'fadeInLeft':
          this.fadeInLeft(element);
          break;
        case 'fadeInRight':
          this.fadeInRight(element);
          break;
        case 'scaleIn':
          this.scaleIn(element);
          break;
        case 'slideInUp':
          this.slideInUp(element);
          break;
        case 'rotateIn':
          this.rotateIn(element);
          break;
        default:
          this.fadeInUp(element);
      }
    }, delay);
  }

  // ===== ANIMATION METHODS =====
  fadeInUp(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  fadeInLeft(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  fadeInRight(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  scaleIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  slideInUp(element) {
    element.style.transform = 'translateY(100%)';
    element.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    requestAnimationFrame(() => {
      element.style.transform = 'translateY(0)';
    });
  }

  rotateIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'rotate(-180deg) scale(0.8)';
    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'rotate(0deg) scale(1)';
    });
  }

  // ===== SCROLL ANIMATIONS =====
  setupScrollAnimations() {
    let ticking = false;

    const updateScrollAnimations = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Parallax background elements
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrollY * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      // Navbar scroll effect
      const navbar = document.getElementById('navbar');
      if (scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Back to top button
      const backToTop = document.getElementById('backToTop');
      if (scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }

      // Progress bar for sections
      this.updateProgressBars();

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // ===== PARALLAX EFFECTS =====
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-bg-elements .bg-circle');
    
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.02;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;
        
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // ===== COUNTER ANIMATIONS =====
  setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target + (counter.dataset.suffix || '');
          return;
        }
        counter.textContent = Math.floor(current) + (counter.dataset.suffix || '');
        requestAnimationFrame(updateCounter);
      };

      updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          animateCounter(entry.target);
          entry.target.dataset.animated = 'true';
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // ===== TYPING ANIMATION =====
  setupTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const roles = window.portfolioData.typingRoles;
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDelay = 2000;

    const type = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
      }

      let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && currentCharIndex === currentRole.length) {
        nextDelay = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      }

      setTimeout(type, nextDelay);
    };

    // Start typing animation
    setTimeout(type, 1000);
  }

  // ===== PARTICLE SYSTEM =====
  setupParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#3b82f6'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.1,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.1,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
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
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.3
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }

  // ===== PROGRESS BARS =====
  updateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !bar.dataset.animated) {
        const percentage = bar.dataset.percentage || 0;
        bar.style.width = percentage + '%';
        bar.dataset.animated = 'true';
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===== CARD HOVER EFFECTS =====
  setupCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .detail-card, .skill-category-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.addHoverGlow(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.removeHoverGlow(card);
      });
    });
  }

  addHoverGlow(element) {
    element.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
    element.style.transform = 'translateY(-5px) scale(1.02)';
  }

  removeHoverGlow(element) {
    element.style.boxShadow = '';
    element.style.transform = '';
  }

  // ===== LOADING ANIMATIONS =====
  setupLoadingAnimation() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loading-progress');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = 'visible';
        }, 500);
      }
      
      progressBar.style.width = progress + '%';
    }, 100);
  }

  // ===== STAGGER ANIMATIONS =====
  staggerElements(elements, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        this.fadeInUp(element);
      }, index * delay);
    });
  }

  // ===== CLEANUP =====
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// ===== INITIALIZE ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
});

// ===== PERFORMANCE OPTIMIZATION =====
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Load non-critical animations
    document.body.classList.add('animations-loaded');
  });
} else {
  setTimeout(() => {
    document.body.classList.add('animations-loaded');
  }, 100);
}

// ===== REDUCE MOTION SUPPORT =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('reduce-motion');
}
