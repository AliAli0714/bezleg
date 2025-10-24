 const counter = document.getElementById('counter');
  let started = false;

  function animateCounter() {
    const target = 100000;
    const duration = 1500;
    const stepTime = 10;
    let current = 0;
    const increment = target / (duration / stepTime);

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = Math.floor(current).toLocaleString('ru-RU');
    }, stepTime);
  }

  window.addEventListener('scroll', () => {
    const rect = counter.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom >= 0;

    if (inView && !started) {
      started = true;
      animateCounter();
    }
  });

  const items = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
});

items.forEach(el => observer.observe(el));

