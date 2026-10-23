/* =====================================================
   SCRIPT.JS - Portofolio Lathifah
   Daftar isi:
   1. Navigasi
   2. Animasi bar skill
   3. Tab hobi
   4. Tahun di footer
   ===================================================== */

/* ============ 1. NAVIGASI ============ */
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Buka/tutup menu di layar kecil
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// Tutup menu setelah salah satu link diklik
// (smooth scroll sendiri ditangani CSS: scroll-behavior: smooth)
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
  });
});

// Tandai menu aktif sesuai bagian yang sedang terlihat
const sections = document.querySelectorAll('main section[id]');
const links = navLinks.querySelectorAll('a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id)
      );
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ============ 2. ANIMASI BAR SKILL ============ */
// Lebar bar diambil dari atribut data-level di HTML (0-100)
const bars = document.querySelectorAll('.bar i');

const barObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + '%';
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

bars.forEach(b => barObserver.observe(b));

/* ============ 3. TAB HOBI (Membaca vs Memasak) ============ */
const tabs   = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

function activateTab(tab) {
  tabs.forEach(t => t.setAttribute('aria-selected', t === tab));
  panels.forEach(p => p.classList.toggle('show', p.id === 'panel-' + tab.dataset.target));
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => activateTab(tab));

  // Navigasi keyboard: panah kiri/kanan
  tab.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const step = e.key === 'ArrowRight' ? 1 : tabs.length - 1;
      const next = tabs[(i + step) % tabs.length];
      next.focus();
      activateTab(next);
    }
  });
});

/* ============ 4. TAHUN DI FOOTER ============ */
document.getElementById('year').textContent = new Date().getFullYear();