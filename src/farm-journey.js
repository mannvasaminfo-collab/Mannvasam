
import './farm-journey.css';

function initFarmJourney() {
  const scenes = document.querySelectorAll('.mv-farm-scene');
  if (!scenes.length) return;

  if (!('IntersectionObserver' in window)) {
    scenes.forEach(scene => scene.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.2 });

  scenes.forEach(scene => observer.observe(scene));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFarmJourney, { once: true });
} else {
  initFarmJourney();
}
