import './style.css'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// 1. Smooth Scrolling with Lenis (Melius Feel)
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Animated Word Cycling in Hero Headline
const words = ['classroom.', 'textbook.', 'syllabus.', 'boundary.', 'ordinary.'];
let wordIndex = 0;
const flipWordEl = document.getElementById('flipWord');

if (flipWordEl) {
  setInterval(() => {
    // Fade out and shift up slightly
    gsap.to(flipWordEl, {
      opacity: 0,
      y: -15,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        wordIndex = (wordIndex + 1) % words.length;
        flipWordEl.textContent = words[wordIndex];
        // Shift down and fade back in
        gsap.fromTo(flipWordEl, 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
        );
      }
    });
  }, 2600);
}

// 3. Continuous Infinite 3D Perspective Curved Ribbon (Melius Continuous Flow)
const ribbonViewport = document.getElementById('ribbonViewport');
const ribbonTrack = document.getElementById('ribbonTrack');

if (ribbonViewport && ribbonTrack) {
  // Duplicate cards dynamically to form a seamless infinite marquee
  const originalCards = Array.from(ribbonTrack.querySelectorAll('.ribbon-card'));
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    ribbonTrack.appendChild(clone);
  });

  const allCards = Array.from(ribbonTrack.querySelectorAll('.ribbon-card'));

  let scrollPos = 0;
  const baseSpeed = 1.2; // Smooth continuous glide velocity
  let currentSpeed = baseSpeed;
  let targetSpeed = baseSpeed;
  let mouseTiltX = 0;
  let mouseTiltY = 0;

  // Slow down on hover for easy inspection
  ribbonViewport.addEventListener('mouseenter', () => {
    targetSpeed = 0.25;
  });
  ribbonViewport.addEventListener('mouseleave', () => {
    targetSpeed = baseSpeed;
    mouseTiltX = 0;
    mouseTiltY = 0;
  });

  // Interactive subtle 3D tilt tracking mouse
  if (window.innerWidth > 768) {
    ribbonViewport.addEventListener('mousemove', (e) => {
      const rect = ribbonViewport.getBoundingClientRect();
      mouseTiltX = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      mouseTiltY = -((e.clientY - rect.top) / rect.height - 0.5) * 5;
    });
  }

  function tickRibbon() {
    // Ease speed changes
    currentSpeed += (targetSpeed - currentSpeed) * 0.08;
    scrollPos += currentSpeed;

    // Reset when one full original set has scrolled across
    const halfWidth = ribbonTrack.scrollWidth / 2;
    if (halfWidth > 0 && scrollPos >= halfWidth) {
      scrollPos -= halfWidth;
    }

    ribbonTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0) rotateY(${mouseTiltX}deg) rotateX(${mouseTiltY}deg)`;

    // Apply real-time concave 3D perspective curvature to each card based on its screen position
    const screenCenter = window.innerWidth / 2;
    allCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.right > -300 && rect.left < window.innerWidth + 300) {
        const cardCenter = rect.left + rect.width / 2;
        const distRatio = (cardCenter - screenCenter) / (screenCenter * 0.92);
        const clampedDist = Math.max(-1.4, Math.min(1.4, distRatio));
        const absDist = Math.abs(clampedDist);

        // Dramatic Melius Concave Amphitheater IMAX projection:
        // Center: scale ~0.66, translateZ(-220px), rotateY(0deg), opacity ~0.72
        // Outer edges: scale ~1.54, translateZ(+240px), rotateY(-44deg on right, +44deg on left), opacity 1.0
        const rotateY = -clampedDist * 42;
        const translateZ = (absDist * 340) - 200;
        const scale = 0.68 + (absDist * 0.65);
        const opacity = 0.72 + (absDist * 0.28);

        card.style.transform = `translate3d(0, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = opacity;
      }
    });

    requestAnimationFrame(tickRibbon);
  }

  requestAnimationFrame(tickRibbon);
}

// 4. Navigation Drawer & Search Controllers
const navMenuBtn = document.getElementById('navMenuBtn');
const icreonSearchBtn = document.getElementById('icreonSearchBtn');
const menuDrawer = document.getElementById('menuDrawer');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');
const menuBackdrop = document.getElementById('menuBackdrop');
const drawerLinks = document.querySelectorAll('.drawer-link, .audience-card');

function openDrawer() {
  if (!menuDrawer) return;
  menuDrawer.classList.add('open');
  lenis.stop();
  gsap.fromTo('.menu-drawer-panel .drawer-col', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.1 }
  );
}

function closeDrawer() {
  if (!menuDrawer) return;
  menuDrawer.classList.remove('open');
  lenis.start();
}

if (navMenuBtn) navMenuBtn.addEventListener('click', openDrawer);
if (icreonSearchBtn) icreonSearchBtn.addEventListener('click', openDrawer);
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
if (menuBackdrop) menuBackdrop.addEventListener('click', closeDrawer);
drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuDrawer && menuDrawer.classList.contains('open')) {
    closeDrawer();
  }
});

// Mobile Drawer logic
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');

if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
  });
}
if (closeDrawerBtn && mobileDrawer) {
  closeDrawerBtn.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
  });
}
// Sticky header border shadow on scroll
const icreonHeader = document.querySelector('.icreon-header');
if (icreonHeader) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      icreonHeader.classList.add('scrolled-header');
    } else {
      icreonHeader.classList.remove('scrolled-header');
    }
  }, { passive: true });
}

// ==========================================
// 5. Grid Scroll Animation (2nd Page)
// ==========================================

function initGridAnimation() {
  let image = document.querySelectorAll('.scaler img'); // Target BOTH images for size animation
  let firstSection = document.querySelector('.grid-scroll-section');
  let layers = document.querySelectorAll('.grid > .layer');

  if (!image.length || !firstSection || !layers.length) {
    console.error("Grid animation missing elements!", { image, firstSection, layers });
    return;
  }

  // Measure the natural size before animating (use first image)
  const naturalWidth = image[0].offsetWidth > 0 ? image[0].offsetWidth : 300;
  const naturalHeight = image[0].offsetHeight > 0 ? image[0].offsetHeight : 400;
  
  // Set initial states for GSAP
  // START STATE: small card, grid invisible
  gsap.set(image, {
    width: '60vw',
    height: '50vh',
    maxWidth: 'none',
    maxHeight: 'none',
    borderRadius: '24px',
    xPercent: -50,
    yPercent: -50,
    force3D: false
  });
  
  const gridTl = gsap.timeline({
    scrollTrigger: {
      trigger: firstSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    }
  });

  // PHASE 1: Expand Card to Full Screen
  gridTl.to(image, {
    width: '100vw',
    height: '100vh',
    borderRadius: '0px',
    ease: "power2.inOut",
    duration: 1
  }, 0);

  // PHASE 2: Shrink to natural grid size
  const shrinkStart = 1.2; // wait a bit after expanding
  
  gridTl.to(image, {
    width: naturalWidth,
    height: naturalHeight,
    borderRadius: '16px',
    ease: "power2.inOut",
    duration: 1.5
  }, shrinkStart);

  // PHASE 3: Animate each layer's items with staggered timing to avoid subgrid thrashing
  const scaleEasings = ["power1.inOut", "power3.inOut", "power4.inOut"];
  
  let phase3EndTime = 0;

  layers.forEach((layer, index) => {
    // Target the elements inside the subgrid layer instead of the layer itself
    const items = layer.querySelectorAll('div');
    
    // Set initial states for items - CRITICAL: force3D: false prevents VRAM memory exhaustion!
    gsap.set(items, {
      opacity: 0,
      scale: 0,
      force3D: false
    });

    const scaleStart = shrinkStart + 0.3;
    const scaleDuration = 1.2 - (index * 0.1); 
    
    gridTl.to(items, {
      scale: 1,
      opacity: 1, // Fade in alongside scale for smoother performance
      ease: scaleEasings[index],
      duration: scaleDuration,
      stagger: 0.05 // Tiny stagger for visual flair
    }, scaleStart);

    phase3EndTime = Math.max(phase3EndTime, scaleStart + scaleDuration);
  });

  // PHASE 4: Wait, then Collapse layers and crossfade center images
  // We add a "hold" duration so the grid remains fully visible for a significant portion of the scroll
  const collapseStart = phase3EndTime + 2.0; 
  
  layers.forEach((layer, index) => {
    const items = layer.querySelectorAll('div');
    
    gridTl.to(items, {
      scale: 0.8,
      opacity: 0,
      ease: scaleEasings[index],
      duration: 1.0 - (index * 0.1),
      stagger: 0.05
    }, collapseStart + (index * 0.1));
  });

  let startImg = document.querySelector('.start-img');
  let endImg = document.querySelector('.end-img');
  if (startImg && endImg) {
    gridTl.to(startImg, { opacity: 0, duration: 1.0 }, collapseStart);
    gridTl.to(endImg, { opacity: 1, duration: 1.0 }, collapseStart);
  }

  // PHASE 5: Center image expands back to full screen
  const finalExpandStart = collapseStart + 0.3;
  gridTl.to(image, {
    width: '100vw',
    height: '100vh',
    borderRadius: '0px',
    ease: "power2.inOut",
    duration: 1.5
  }, finalExpandStart);
}

// ==========================================
// 6. Page Load Hero Animation
// ==========================================
function initHeroAnimation() {
  const headline = document.querySelector('.hero-new-headline');
  const graphic = document.querySelector('.hero-new-graphic');

  if (!headline) return;

  const loadTl = gsap.timeline();

  loadTl.from(headline, {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.2
  });

  if (graphic) {
    loadTl.from(graphic, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "back.out(1.5)"
    }, "-=0.8");
  }
}

// ==========================================
// 7. Three.js 3D Pencil / Aeroplane Flight
// ==========================================
function initConceptAnimation() {
  // Airplane animation removed to remove the extra scroll page
}

// Ensure GSAP plugins and animations run smoothly
const initAll = () => {
  initGridAnimation();
  initHeroAnimation();
  initConceptAnimation();
  initLenis();
  initParallax();
  initScrollScale();
  initReveal();
  ScrollTrigger.refresh();
};

// ==========================================
// 8. GLOBAL PRELOADER LOGIC
// ==========================================
function initPreloader() {
  const preloader = document.getElementById('global-preloader');
  if (!preloader) return;
  
  // Stop lenis scrolling while loading
  if (typeof lenis !== 'undefined') lenis.stop();
  document.body.style.overflow = 'hidden';

  const images = Array.from(document.images);
  
  // If no images, or if they are somehow already loaded
  if (images.length === 0) {
    hidePreloader();
    return;
  }

  let loadedCount = 0;
  
  // A safety fallback just in case some images never fire load/error events
  let fallbackTimer = setTimeout(hidePreloader, 6000); // Max wait time 6 seconds

  function imageLoaded() {
    loadedCount++;
    if (loadedCount >= images.length) {
      clearTimeout(fallbackTimer);
      hidePreloader();
    }
  }

  function hidePreloader() {
    preloader.classList.add('fade-out');
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined') lenis.start();
    
    // Refresh ScrollTrigger to account for newly painted dimensions
    setTimeout(() => {
      ScrollTrigger.refresh();
      preloader.style.display = 'none';
    }, 800);
  }

  images.forEach(img => {
    if (img.complete) {
      imageLoaded();
    } else {
      img.addEventListener('load', imageLoaded, { once: true });
      img.addEventListener('error', imageLoaded, { once: true }); // even if error, count it so we don't block forever
    }
  });
}

if (document.readyState === 'complete') {
  initAll();
} else {
  window.addEventListener('load', initAll);
}

// Run preloader logic immediately so the fallback timer works even if images take forever
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreloader);
} else {
  initPreloader();
}

// Reveal header on the next section
const blackSection = document.querySelector('.melius-canvas-section');
if (blackSection) {
  gsap.to('.icreon-header', {
    scrollTrigger: {
      trigger: blackSection,
      start: 'top 50%',
      toggleActions: 'play none none reverse'
    },
    yPercent: 0,
    opacity: 1,
    duration: 0.4,
    ease: 'power2.out'
  });
}

// 6. GSAP ScrollTrigger for Pipeline Nodes
const pipelineNodes = document.querySelectorAll('.pipeline-node');
if (pipelineNodes.length) {
  pipelineNodes.forEach((node, i) => {
    gsap.from(node, {
      scrollTrigger: {
        trigger: node,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: (i % 3) * 0.1
    });
  });
}

// Subtle entry animation for Icreon headline and banner
window.addEventListener('DOMContentLoaded', () => {
  gsap.from('.icreon-headline', {
    y: 40,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.1
  });

  gsap.from('.icreon-subtext, .icreon-actions', {
    y: 25,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.3
  });

  gsap.from('.icreon-banner-wrapper', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.45
  });

  gsap.from('.icreon-floating-chat', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
    delay: 0.8
  });
});

// Removed leftover Vanta init

// ==========================================================================
// DYNAMIC CONNECTING LINE (AEROPLANE -> WHO WE ARE)
// ==========================================================================
function updateDynamicLine() {
  const startAnchor = document.getElementById('trail-start-anchor');
  const endAnchor = document.getElementById('trail-end-anchor');
  const trailPath = document.getElementById('dynamic-trail');
  const maskPath = document.getElementById('mask-path');
  const overlay = document.getElementById('global-connection-overlay');

  if (!startAnchor || !endAnchor || !trailPath || !maskPath || !overlay) return;

  // Get coordinates relative to the viewport
  const startRect = startAnchor.getBoundingClientRect();
  const endRect = endAnchor.getBoundingClientRect();
  const overlayRect = overlay.getBoundingClientRect();

  // Convert to relative coordinates inside the overlay
  // The overlay is absolute within #smooth-content, so we calculate offsets relative to it.
  const startX = startRect.left - overlayRect.left + (startRect.width / 2);
  const startY = startRect.top - overlayRect.top + (startRect.height / 2);
  
  const endX = endRect.left - overlayRect.left + (endRect.width / 2);
  const endY = endRect.top - overlayRect.top; // Top of the yellow pill

  // Create an S-curve path mathematically connecting the two points
  // Control points pull down from start, and left from the end.
  const cp1X = startX;
  const cp1Y = startY + (endY - startY) * 0.4;
  
  const cp2X = endX;
  const cp2Y = startY + (endY - startY) * 0.4;
  
  // The SVG path string
  const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
  
  // Apply the path to both the visible dashed line and the solid mask line
  trailPath.setAttribute('d', d);
  maskPath.setAttribute('d', d);

  // Setup the mask for progressive drawing
  const pathLength = maskPath.getTotalLength();
  maskPath.style.strokeDasharray = pathLength;
  maskPath.style.strokeDashoffset = pathLength;
}

// Initial draw and window resize
window.addEventListener('load', () => {
  setTimeout(updateDynamicLine, 100); // Small delay to ensure layouts have settled
});
window.addEventListener('resize', updateDynamicLine);

// Set up the GSAP ScrollTrigger to animate the mask
if (typeof gsap !== 'undefined') {
  // Use a slight delay to ensure the DOM is ready and path lengths are calculated
  setTimeout(() => {
    const maskPath = document.getElementById('mask-path');
    if (maskPath) {
      const pathLength = maskPath.getTotalLength();
      
      gsap.to(maskPath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".logo-marquee-section",
          start: "top center", 
          end: "bottom center", 
          scrub: 1
        }
      });
    }
  }, 200);
}

// 6. IRDME Stacked Cards Animation
const irdmeCards = gsap.utils.toArray('.irdme-card');
if (irdmeCards.length > 0) {
  // We want the inner content to scale, not the whole card, 
  // to avoid breaking the sticky box model, but scaling the whole card 
  // with transform-origin: top also works perfectly in many cases.
  // Actually, scaling the card itself works great!
  irdmeCards.forEach((card, i) => {
    if (i < irdmeCards.length - 1) {
      const nextCard = irdmeCards[i + 1];
      gsap.to(card, {
        scale: 0.93,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top bottom", // When next card enters from bottom
          end: "top top",      // Until next card reaches the top
          scrub: true
        }
      });
    }
  });
}

// 7. WHAT YOU GET Card Entrance
const wygCards = gsap.utils.toArray('.wyg-card');
if (wygCards.length > 0) {
  gsap.from(wygCards, {
    scrollTrigger: {
      trigger: '.what-you-get-section',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.5)',
    rotationX: 10,
    transformOrigin: 'bottom center',
    clearProps: 'all'
  });
}

// 8. Services Page Horizontal Storytelling Animation
function initServicesStory() {
  const storyWrapper = document.querySelector('.gsap-story-wrapper');
  const storyContainer = document.querySelector('.gsap-story-container');
  const panels = gsap.utils.toArray('.story-panel');

  if (storyWrapper && storyContainer && panels.length > 0) {
    // We animate the container moving to the left by the amount it overflows the window
    
    // We need to calculate the exact width to scroll
    function getScrollAmount() {
      let scrollWidth = storyContainer.scrollWidth - window.innerWidth;
      return scrollWidth;
    }

    const tween = gsap.to(storyContainer, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: storyWrapper,
        pin: true,
        scrub: 1,
        // The distance the user scrolls vertically equals the distance we move horizontally
        end: () => "+=" + getScrollAmount(),
        invalidateOnRefresh: true // Recalculates on resize
      }
    });
  }
}

// Initialize on DOM load
// Replaced DOMContentLoaded below


// 9. Wavy Timeline Funnel Animation


// 10. Concept Sticky Scroll Accordion

// 11. Dark Accordion
function initDarkAccordion() {
  const pills = document.querySelectorAll('.da-pill');
  if (pills.length === 0) return;

  pills.forEach((pill) => {
    const trigger = pill.querySelector('.da-pill-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      // Close all others
      pills.forEach(p => {
        if (p !== pill) p.classList.remove('active');
      });
      // Toggle current
      pill.classList.toggle('active');
    });
  });

  // Open the first one by default
  pills[0].classList.add('active');
}

function initConceptScroll() {
  const steps = gsap.utils.toArray('.concept-step');
  const visuals = gsap.utils.toArray('.cv-item');

  if (steps.length > 0 && visuals.length > 0) {
    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });

    function setActive(index) {
      steps.forEach((step, i) => {
        step.classList.remove('cs-active', 'cs-past');
        if (i === index) {
          step.classList.add('cs-active');
        } else if (i < index) {
          step.classList.add('cs-past');
        }
      });

      visuals.forEach((visual, i) => {
        if (i === index) {
          visual.classList.add('cv-active');
        } else {
          visual.classList.remove('cv-active');
        }
      });
    }
  }
}

function initWavyFunnel() {
  const section = document.querySelector('.wavy-funnel-section');
  const track = document.querySelector('.wavy-track');
  const textItems = gsap.utils.toArray('.wt-item');

  if (section && track && textItems.length > 0) {
    // The track wrapper is absolute positioned at 50% left. 
    // This means x=0 of the track is in the exact center of the screen.
    // First node is at x=1000 inside the track. So we translate the track -1000px to center it.
    gsap.set(track, { x: -1000 });

    const scrollDist = 3000; // Scroll distance to map
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + scrollDist,
        onUpdate: (self) => {
          const progress = self.progress;
          // There are 3 states.
          // 0.0 to 0.33 -> State 1
          // 0.33 to 0.66 -> State 2
          // 0.66 to 1.0 -> State 3
          let activeIndex = 0;
          if (progress > 0.25 && progress < 0.75) activeIndex = 1;
          if (progress >= 0.75) activeIndex = 2;

          textItems.forEach((item, i) => {
            if (i === activeIndex) {
              item.classList.add('wt-active');
            } else {
              item.classList.remove('wt-active');
            }
          });
        }
      }
    });

    tl.to(track, {
      x: -3000,
      ease: "none"
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof initServicesStory === 'function') initServicesStory();
  initDarkAccordion();
  initConceptScroll();
  initWavyFunnel();
});



// ==========================================
// APPLICATION MODAL LOGIC
// ==========================================
function initApplicationModal() {
  const modal = document.getElementById('application-modal');
  const closeBtn = document.getElementById('close-modal');
  const roleNameSpan = document.getElementById('modal-role-name');
  const roleInput = document.getElementById('role-input');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const form = document.getElementById('application-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusDiv = document.getElementById('form-status');

  if (!modal) return;

  function openModal(role) {
    roleNameSpan.textContent = role;
    roleInput.value = role;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof lenis !== 'undefined') lenis.stop();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined') lenis.start();
    // Reset form
    if (form) {
      form.reset();
      statusDiv.textContent = '';
      statusDiv.className = 'form-status';
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.getAttribute('data-role');
      openModal(role);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      statusDiv.textContent = '';
      statusDiv.className = 'form-status';

      const formData = new FormData(form);

      try {
        const response = await fetch('http://localhost:3000/api/apply', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          statusDiv.textContent = 'Application submitted successfully! We will be in touch.';
          statusDiv.className = 'form-status success';
          form.reset();
        } else {
          const errData = await response.json();
          statusDiv.textContent = errData.message || 'Something went wrong. Please try again.';
          statusDiv.className = 'form-status error';
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        statusDiv.textContent = 'Network error. Please try again later.';
        statusDiv.className = 'form-status error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initApplicationModal);
// Also initialize if script runs after DOM load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initApplicationModal();
}

// Cookie Consent Logic
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookieBanner');
  const modal = document.getElementById('cookieModal');
  
  if (!banner || !modal) return;

  // Check if consent is already given
  if (!localStorage.getItem('scalora_cookie_consent')) {
    setTimeout(() => {
      banner.style.display = 'flex';
    }, 1000);
  }

  const btnAcceptAll = document.getElementById('btnAcceptAll');
  const btnRejectOptional = document.getElementById('btnRejectOptional');
  const btnManage = document.getElementById('btnManagePreferences');
  const btnCloseModal = document.getElementById('cookieModalClose');
  const btnSavePrefs = document.getElementById('btnSavePreferences');

  const chkFunctional = document.getElementById('chkFunctional');
  const chkMarketing = document.getElementById('chkMarketing');

  function saveConsent(functional, marketing) {
    localStorage.setItem('scalora_cookie_consent', JSON.stringify({
      necessary: true,
      functional: functional,
      marketing: marketing,
      timestamp: new Date().toISOString()
    }));
    banner.style.display = 'none';
    modal.style.display = 'none';
  }

  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', () => saveConsent(true, true));
  }

  if (btnRejectOptional) {
    btnRejectOptional.addEventListener('click', () => saveConsent(false, false));
  }

  if (btnManage) {
    btnManage.addEventListener('click', () => {
      // Load current prefs if any
      const current = JSON.parse(localStorage.getItem('scalora_cookie_consent') || '{"functional":false,"marketing":false}');
      chkFunctional.checked = current.functional;
      chkMarketing.checked = current.marketing;
      modal.style.display = 'flex';
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (btnSavePrefs) {
    btnSavePrefs.addEventListener('click', () => {
      saveConsent(chkFunctional.checked, chkMarketing.checked);
    });
  }
});
