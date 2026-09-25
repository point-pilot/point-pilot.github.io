'use strict';
(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const data = JSON.parse(document.querySelector('#transfer-data').textContent);
  const average = values => { const valid = values.filter(v => v !== null); return valid.reduce((a, b) => a + b, 0) / valid.length; };
  const format = value => value === null ? '—' : value.toFixed(1);
  document.querySelectorAll('[data-embodiment]').forEach(button => {
    button.addEventListener('click', () => {
      const embodiment = button.dataset.embodiment;
      document.querySelectorAll('[data-embodiment]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      const result = data[embodiment], ours = average(result.ours), baseline = average(result.baseline);
      document.querySelector('#ours-score').textContent = ours.toFixed(1) + '%';
      document.querySelector('#baseline-score').textContent = baseline.toFixed(1) + '%';
      document.querySelector('#ours-bar').style.width = ours + '%';
      document.querySelector('#baseline-bar').style.width = baseline + '%';
      document.querySelector('#transfer-caption').textContent = embodiment + ' · Success rate (%)';
      const body = document.querySelector('#transfer-body'); body.replaceChildren();
      data.tasks.forEach((task, i) => {
        const row = document.createElement('tr'), heading = document.createElement('th');
        heading.scope = 'row'; heading.textContent = task; row.append(heading);
        [result.ours[i], result.baseline[i]].forEach(value => { const cell = document.createElement('td'); cell.textContent = format(value); row.append(cell); });
        body.append(row);
      });
      document.querySelector('#transfer-note').textContent = embodiment === 'Piper'
        ? '7 compatible tasks · 10 trials per evaluated task. Alarm-clock task excluded. Piper is unseen during policy training.'
        : embodiment === 'ARX'
          ? '8 tasks · 10 trials per evaluated task. ARX is unseen during policy training.'
          : '8 tasks · 10 trials per evaluated task. ALOHA is the source embodiment.';
    });
  });
  document.querySelectorAll('[data-benchmark]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-benchmark]').forEach(b => {
      const active = b === button; b.setAttribute('aria-pressed', String(active));
      document.querySelector('#benchmark-' + b.dataset.benchmark).hidden = !active;
    });
  }));
  const dialog = document.querySelector('#figure-dialog');
  let lastFigureTrigger;
  document.querySelectorAll('.zoomable').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || !dialog.showModal) return;
    event.preventDefault(); lastFigureTrigger = link;
    const image = document.querySelector('#dialog-image'); image.src = link.href; image.alt = link.querySelector('img').alt;
    document.querySelector('#figure-dialog-title').textContent = link.dataset.caption;
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }));
  const closeFigure = () => dialog.close();
  document.querySelector('#close-figure').addEventListener('click', closeFigure);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeFigure(); } });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastFigureTrigger?.focus({preventScroll: true}); });
  document.querySelector('#copy-citation').addEventListener('click', async () => {
    const text = document.querySelector('#bibtex').textContent;
    const status = document.querySelector('#copy-status');
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const field = document.createElement('textarea'); field.value = text; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.append(field); field.select();
        const copied = document.execCommand('copy'); field.remove(); if (!copied) throw new Error('Clipboard unavailable');
      }
      status.textContent = 'Citation copied.';
    } catch { status.textContent = 'Select the citation text above to copy it.'; }
  });
})();
