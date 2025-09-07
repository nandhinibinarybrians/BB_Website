
// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const mobile = document.querySelector('.mobile');
if (toggle) toggle.addEventListener('click', ()=> mobile.classList.toggle('open'));

// Active nav link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav]').forEach(a=>{
  if(a.getAttribute('href') === path) a.classList.add('active');
});

// Toast function
function showToast(message, success = true) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = success ? "#16a34a" : "#dc2626"; // green/red
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Contact form handling
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const data = new FormData(form);
    const jsonData = Object.fromEntries(data.entries());

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwXf6tkfb1BXtB_X8DCrlCfJak_4nO8dppw0IA_gsSs-czWRPiFKPdoCVuk_3PaeeN9vw/exec",
        {
          method: "POST",
          body: new URLSearchParams(jsonData)
        }
      );

      showToast("Message sent successfully!", true);
      form.reset();
    } catch (err) {
      console.error("Error:", err);
      showToast("Failed to send message!", false);
    }

    btn.disabled = false;
    btn.textContent = "Send message";
  });
}



// Scroll-triggered animation for Services section cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".services-section .card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          entry.target.style.animation = `fadeSlideUp 0.6s forwards ${index * 0.15}s`;
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => observer.observe(card));
});


const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const speed = 200; // smaller = faster
  const increment = target / speed;

  const update = () => {
    const count = +counter.innerText;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };
  update();
};

// Trigger only when visible
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target); // run once
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});



