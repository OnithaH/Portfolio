import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const initGSAP = () => {
  gsap.from('.hero-title', {
    duration: 1.2,
    y: 80,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.3,
  });

  gsap.from('.hero-subtitle', {
    duration: 1,
    y: 60,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.6,
  });

  gsap.from('.hero-cta', {
    duration: 0.8,
    y: 40,
    opacity: 0,
    ease: 'power2.out',
    delay: 0.9,
    stagger: 0.15,
  });
};

export const animateNavbar = () => {
  gsap.from('.navbar', {
    duration: 0.8,
    y: -80,
    opacity: 0,
    ease: 'power3.out',
  });
};

export const animateCounter = (element, target, duration = 2) => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      if (element) element.textContent = Math.round(obj.value);
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
    },
  });
};

export const animateSkillBars = () => {
  gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
    const width = bar.dataset.width;
    gsap.from(bar, {
      width: '0%',
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 85%',
      },
    });
    gsap.to(bar, {
      width: `${width}%`,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 85%',
      },
    });
  });
};

export const animateProjectCards = () => {
  gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
    });
  });
};

export const particleAnimation = (canvas) => {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = `rgba(${Math.random() > 0.5 ? '99, 102, 241' : '139, 92, 246'}, ${this.opacity})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const connectParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  };
  animate();

  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
};
