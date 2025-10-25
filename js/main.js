// ---------- POPUP ----------
const openBtns = document.querySelectorAll('.open-popup');
const popupOverlay = document.getElementById('popupOverlay');
const popup = document.getElementById('popup');

// ---------- COUNTER ----------
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

if (counter) {
  window.addEventListener('scroll', () => {
    const rect = counter.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom >= 0;

    if (inView && !started) {
      started = true;
      animateCounter();
    }
  });
}

// ---------- SCROLL ANIMATIONS ----------
const items = document.querySelectorAll('.hidden');
if (items.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  });

  items.forEach(el => observer.observe(el));
}

// ---------- SMOOTH SCROLL ----------
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    const href = anchor.getAttribute('href');

    // Если ссылка ведёт на другую страницу
    if (href.includes('.html')) return;

    e.preventDefault();

    const blockID = href.substring(1);
    const targetElement = document.getElementById(blockID);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

// ---------- POPUP LOGIC ----------
if (popupOverlay && popup) {
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      popupOverlay.classList.add('active');
    });
  });

  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove('active');
    }
  });

  popup.addEventListener('click', (e) => {
    const rect = popup.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (clickX > rect.width - 80 && clickY < 80) {
      popupOverlay.classList.remove('active');
    }
  });
}

// ---------- FORM SUBMIT ----------
const popupForm = document.getElementById('popupForm');
if (popupForm) {
  popupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageBox = document.getElementById('formMessage');

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      messageBox.innerHTML = result;
      messageBox.style.color = result.includes('✅') ? 'green' : 'red';

      if (result.includes('✅')) {
        form.reset();
        setTimeout(() => {
          popupOverlay.classList.remove('active');
          messageBox.innerHTML = '';
        }, 2500);
      }
    })
    .catch(() => {
      messageBox.innerHTML = '⚠️ Ошибка соединения с сервером.';
      messageBox.style.color = 'red';
    });
  });
}
