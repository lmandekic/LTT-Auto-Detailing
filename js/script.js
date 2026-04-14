// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // Highlight today's opening hours
  const hoursList = document.querySelector('.hours-list');
  if (hoursList) {
    const todayIdx = new Date().getDay(); // 0=Sun..6=Sat
    // Map: list items are Mon..Sun (0..6)
    const listIdx = todayIdx === 0 ? 6 : todayIdx - 1;
    const items = hoursList.querySelectorAll('li');
    if (items[listIdx]) items[listIdx].classList.add('today');
  }

  // Contact form handler (demo — prikazuje uspješnu poruku)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // osnovna validacija required polja
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // ukloni prethodnu poruku (ako postoji)
      const old = form.querySelector('.form-success');
      if (old) old.remove();

      // sakrij polja i submit gumb
      const fields = form.querySelectorAll('.form-row, button[type="submit"], p');
      fields.forEach(el => el.style.display = 'none');

      // prikazi poruku uspjeha
      const success = document.createElement('div');
      success.className = 'form-success';
      success.innerHTML = `
        <div class="success-icon" aria-hidden="true">✓</div>
        <h3>Poruka je poslana</h3>
        <p>Hvala na upitu! Odgovorit ćemo u najkraćem roku.</p>
      `;
      form.appendChild(success);
      form.reset();

      // nakon 10 sekundi vrati praznu formu (s animacijom)
      setTimeout(() => {
        success.classList.add('fade-out');
        success.addEventListener('animationend', () => {
          success.remove();
          fields.forEach(el => {
            el.style.display = '';
            el.classList.add('fade-in');
            el.addEventListener('animationend', () => el.classList.remove('fade-in'), { once: true });
          });
        }, { once: true });
      }, 10000);
    });
  }

  // Set current year in footer
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
});
