document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const propertyHost = document.querySelector('[data-properties]');
  const searchInput = document.querySelector('[data-search]');
  const filterSelect = document.querySelector('[data-filter]');
  const propertyData = [
    { slug: 'sunbird-capital', name: 'Sunbird Capital', location: 'Lilongwe', type: 'Business Hotel', summary: 'Premium corporate stays, conferences, and refined dining.' },
    { slug: 'sunbird-mt-soch', name: 'Sunbird Mount Soche', location: 'Blantyre', type: 'Conference Hotel', summary: 'Flagship events, city accommodation, and hospitality experiences.' },
    { slug: 'sunbird-mzuzu', name: 'Sunbird Mzuzu', location: 'Mzuzu', type: 'City Hotel', summary: 'Comfortable northern gateway for business and leisure.' },
    { slug: 'sunbird-ziwa', name: 'Sunbird Zomba', location: 'Zomba', type: 'Heritage Hotel', summary: 'Relaxed stay near historic and scenic attractions.' }
  ];

  const renderProperties = () => {
    if (!propertyHost) return;
    const q = (searchInput?.value || '').toLowerCase();
    const f = filterSelect?.value || 'all';
    const filtered = propertyData.filter(p => {
      const matchesSearch = !q || [p.name, p.location, p.type, p.summary].join(' ').toLowerCase().includes(q);
      const matchesFilter = f === 'all' || p.type.toLowerCase().includes(f.toLowerCase()) || p.location.toLowerCase().includes(f.toLowerCase());
      return matchesSearch && matchesFilter;
    });
    propertyHost.innerHTML = filtered.length ? filtered.map(p => `<article class="card"><span class="pill">${p.type}</span><h3>${p.name}</h3><p class="meta">${p.location}</p><p>${p.summary}</p><p><a class="btn dark" href="property.html?slug=${p.slug}">View details</a></p></article>`).join('') : '<div class="card"><h3>No matching properties</h3><p>Try a different search term or filter.</p></div>';
  };
  searchInput?.addEventListener('input', renderProperties);
  filterSelect?.addEventListener('change', renderProperties);
  renderProperties();

  document.querySelectorAll('[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = form.querySelector('[data-form-status]');
      const fields = [...form.querySelectorAll('[required]')];
      const invalid = fields.find(el => !String(el.value || '').trim());
      if (invalid) {
        if (msg) { msg.textContent = 'Please complete all required fields.'; msg.className = 'status error'; msg.style.display = 'block'; }
        invalid.focus();
        return;
      }
      if (msg) { msg.textContent = 'Thank you. Your inquiry has been prepared for submission.'; msg.className = 'status success'; msg.style.display = 'block'; }
      form.reset();
    });
  });
});
const galleryHost = document.querySelector('[data-gallery]');
if (galleryHost) {
  const items = ['Lake Malawi view','Conference setup','Executive room','Dining experience'];
  galleryHost.innerHTML = items.map(item => `<div class="thumb">${item}</div>`).join('');
}
const trustHost = document.querySelector('[data-trust]');
if (trustHost) {
  trustHost.innerHTML = ['National brand','Trusted hospitality','Business-ready','Tourism experience'].map(item => `<div class="card"><strong>${item}</strong></div>`).join('');
}
const faqHost = document.querySelector('[data-faq]');
if (faqHost) {
  faqHost.innerHTML = [
    ['Do you support inquiries?', 'Yes, the contact and property pages are ready for form-based inquiries.'],
    ['Can this grow into bookings?', 'Yes, the structure is prepared for booking and payment integration later.']
  ].map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');
}
