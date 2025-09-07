// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const mobile = document.querySelector('.mobile');
toggle.addEventListener('click', () => {
  mobile.classList.toggle('open'); // toggle mobile menu
});

// Highlight active link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav]').forEach(a => {
  if(a.getAttribute('href') === path) a.classList.add('active');
});

// Mobile menu link click (optional: close menu after click)
document.querySelectorAll('.mobile a').forEach(link => {
  link.addEventListener('click', () => {
    mobile.classList.remove('open'); // remove menu but keep hamburger icon
  });
});

// Toast function
function showToast(message, success = true) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = success ? "#16a34a" : "#dc2626";
  toast.className = "toast show";
  setTimeout(() => { toast.className = toast.className.replace("show",""); }, 3000);
}

// Contact form
const form = document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent='Sending...';
    const data = new FormData(form);
    const jsonData = Object.fromEntries(data.entries());
    try {
      await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
        method:"POST",
        body: new URLSearchParams(jsonData)
      });
      showToast("Message sent successfully!", true);
      form.reset();
    } catch(err){
      showToast("Failed to send message!", false);
    }
    btn.disabled=false; btn.textContent="Send message";
  });
}

// Services card animation
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".services-section .card");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const index = Array.from(cards).indexOf(entry.target);
        entry.target.style.animation = `fadeSlideUp 0.6s forwards ${index*0.15}s`;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));
});

// Counters animation
const counters = document.querySelectorAll('.counter');
const animateCounter = counter => {
  const target = +counter.getAttribute('data-target');
  const speed = 200;
  const increment = target/speed;
  const update = () => {
    const count = +counter.innerText;
    if(count<target){
      counter.innerText = Math.ceil(count+increment);
      requestAnimationFrame(update);
    } else { counter.innerText = target; }
  };
  update();
};
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
},{ threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));
