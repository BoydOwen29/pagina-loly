// ===================================
// SMOOTH SCROLL WITH HEADER OFFSET
// ===================================
const header = document.querySelector('.header');
const getHeaderOffset = () => {
    const headerHeight = header ? header.offsetHeight : 75;
    return headerHeight + 15; // 15px extra padding
};

const smoothScrollTo = (hash) => {
    const target = document.querySelector(hash);
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - getHeaderOffset();
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

// Event listener para todos los links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        
        e.preventDefault();
        smoothScrollTo(href);
        
        // Actualizar URL sin scroll
        if (history.pushState) {
            history.pushState(null, null, href);
        }
    });
});

// ===================================
// HEADER SHADOW ON SCROLL
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// INTERSECTION OBSERVER ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación inicial a las secciones
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    if (section.id !== 'inicio') {
        fadeInObserver.observe(section);
    } else {
        // Hero section aparece inmediatamente
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }
});

// ===================================
// GALLERY ITEM ANIMATIONS
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9) translateY(20px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1) translateY(0)';
                }, index * 80);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    galleryObserver.observe(item);
});

// ===================================
// LAZY LOADING DE IMÁGENES
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    console.log('✓ Lazy loading nativo habilitado');
} else {
    // Fallback para navegadores antiguos
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - getHeaderOffset() - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===================================
// VIDEO CONTROLS OPTIMIZATION
// ===================================
const video = document.querySelector('video');
if (video) {
    // Pausar cuando no está visible
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && !video.paused) {
                video.pause();
            }
        });
    }, { threshold: 0.3 });
    
    videoObserver.observe(video);
    
    // Mejorar poster
    video.style.backgroundColor = '#000';
}

// ===================================
// PARALLAX EFFECT EN HERO
// ===================================
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (scrollPosition < heroSection.offsetHeight) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
}

// ===================================
// CONTACT FORM FOCUS EFFECTS
// ===================================
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.animation = 'none';
        setTimeout(() => {
            link.style.animation = '';
        }, 10);
    });
});

// ===================================
// CONSOLE INFO
// ===================================
console.log('%c✨ LolyDeBarberin Portfolio', 'color: #c9976d; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(201,151,109,0.5);');
console.log('%cDesarrollado con arte y tecnología ❤️', 'color: #999; font-size: 12px;');
console.log('%cVisita: https://github.com/BoydOwen29/pagina-loly', 'color: #666; font-size: 11px;');
