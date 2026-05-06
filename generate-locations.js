const fs = require('fs');
const path = require('path');

const locations = [
  {
    slug: 'mission-hills',
    city: 'Mission Hills',
    zip: '91345',
    desc: 'Our home neighborhood in Mission Hills, CA — walk-ins welcome daily at our Sepulveda Blvd shop.',
    h1sub: 'Your Local Florist on Sepulveda Blvd',
    nearby: 'Sylmar, Granada Hills, North Hills',
    landmark: 'San Fernando Valley',
  },
  {
    slug: 'sylmar',
    city: 'Sylmar',
    zip: '91342',
    desc: 'Serving Sylmar families with fresh flower arrangements for every occasion — just minutes away.',
    h1sub: 'Fresh Flowers Delivered to Sylmar',
    nearby: 'Mission Hills, San Fernando, Pacoima',
    landmark: 'northern San Fernando Valley',
  },
  {
    slug: 'granada-hills',
    city: 'Granada Hills',
    zip: '91344',
    desc: 'Beautiful custom arrangements delivered to Granada Hills homes and events.',
    h1sub: 'Granada Hills Flower Delivery & Arrangements',
    nearby: 'Northridge, Mission Hills, Chatsworth',
    landmark: 'northwest San Fernando Valley',
  },
  {
    slug: 'northridge',
    city: 'Northridge',
    zip: '91324',
    desc: 'Premium floral designs for Northridge weddings, quinceañeras, and everyday bouquets.',
    h1sub: 'Northridge Florist — Weddings & Events',
    nearby: 'Reseda, Granada Hills, Van Nuys',
    landmark: 'central San Fernando Valley',
  },
  {
    slug: 'chatsworth',
    city: 'Chatsworth',
    zip: '91311',
    desc: 'Hand-crafted flower arrangements for Chatsworth celebrations, funerals, and gifts.',
    h1sub: 'Chatsworth Flower Shop & Delivery',
    nearby: 'Granada Hills, Northridge, West Hills',
    landmark: 'western San Fernando Valley',
  },
  {
    slug: 'san-fernando',
    city: 'San Fernando',
    zip: '91340',
    desc: 'Serving the City of San Fernando with 100% locally grown, hand-made flower arrangements.',
    h1sub: 'San Fernando Valley Florist — 40 Years Strong',
    nearby: 'Mission Hills, Sylmar, Pacoima',
    landmark: 'City of San Fernando',
  },
  {
    slug: 'reseda',
    city: 'Reseda',
    zip: '91335',
    desc: 'Custom floral arrangements delivered to Reseda — roses, sunflowers, sympathy sprays & more.',
    h1sub: 'Reseda Flower Delivery & Custom Bouquets',
    nearby: 'Northridge, Van Nuys, Tarzana',
    landmark: 'central San Fernando Valley',
  },
  {
    slug: 'van-nuys',
    city: 'Van Nuys',
    zip: '91405',
    desc: 'Fresh flowers for Van Nuys birthdays, weddings, and special events from our Mission Hills shop.',
    h1sub: 'Van Nuys Florist — Same-Day Arrangements',
    nearby: 'Reseda, North Hills, Panorama City',
    landmark: 'heart of the San Fernando Valley',
  },
  {
    slug: 'north-hills',
    city: 'North Hills',
    zip: '91343',
    desc: 'Serving North Hills with vibrant, hand-grown flower arrangements at unbeatable prices.',
    h1sub: 'North Hills Flower Shop & Delivery',
    nearby: 'Mission Hills, Van Nuys, Panorama City',
    landmark: 'northeast San Fernando Valley',
  },
  {
    slug: 'panorama-city',
    city: 'Panorama City',
    zip: '91402',
    desc: 'Colorful custom bouquets and event florals serving Panorama City and surrounding areas.',
    h1sub: 'Panorama City Florist — Events & Everyday',
    nearby: 'North Hills, Van Nuys, Arleta',
    landmark: 'eastern San Fernando Valley',
  },
];

const footerMap = `
      <iframe
        title="Flowers El Ranchito location map"
        src="https://maps.google.com/maps?q=Flowers+El+Ranchito+Mission+Hills+CA&output=embed&z=16"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen>
      </iframe>
      <div class="map-label">
        <span>📍 10648 1/2 Sepulveda Blvd, Mission Hills CA</span>
        <a href="https://maps.google.com/?q=Flowers+El+Ranchito+Mission+Hills+CA" target="_blank" rel="noopener">Get Directions →</a>
      </div>`;

const footerNavLinks = `
        <a href="../index.html">Home</a>
        <a href="../our-work.html">Our Work</a>
        <a href="../pricing.html">Pricing</a>
        <a href="../index.html#contact">Contact</a>
        <a href="../privacy.html">Privacy</a>`;

const socialSVGs = `
        <a href="https://www.instagram.com/flowerselranchito/" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://g.page/r/CYGmpNmzfyX0EBA" target="_blank" rel="noopener" class="social-btn" aria-label="Google Business">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </a>
        <a href="tel:+18186127515" class="social-btn" aria-label="Call us">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.35 6.35l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>`;

const locationLinksForFooter = locations.map(l =>
  `        <a href="../locations/${l.slug}.html">${l.city}</a>`
).join('\n');

function buildPage(loc) {
  const otherLocations = locations.filter(l => l.slug !== loc.slug);
  const otherLocLinks = otherLocations.slice(0, 5).map(l =>
    `<a href="${l.slug}.html" class="loc-link">${l.city}</a>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Florist in ${loc.city} CA | Flowers El Ranchito | ${loc.zip}</title>
  <meta name="description" content="Looking for a florist in ${loc.city}, CA? Flowers El Ranchito delivers hand-crafted arrangements for weddings, quinceañeras, funerals & everyday bouquets. Call (818) 612-7515." />
  <link rel="canonical" href="https://elranchitogrowers.com/locations/${loc.slug}.html" />
  <link rel="stylesheet" href="../assets/css/style.css" />
  <style>
    .loc-hero { padding: 8rem 2rem 4rem; background: linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%); text-align: center; position: relative; overflow: hidden; }
    .loc-hero::before { content: ''; position: absolute; inset: 0; background: url('../assets/img/hero.png') center/cover; opacity: 0.15; }
    .loc-hero .inner { position: relative; z-index: 2; }
    .loc-hero .badge { display: inline-block; background: rgba(200,151,60,0.2); border: 1px solid var(--gold); color: var(--gold-light); padding: 0.35rem 1rem; border-radius: 50px; font-size: 0.75rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 1rem; }
    .loc-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,5vw,3.5rem); color: white; line-height: 1.15; margin-bottom: 0.75rem; }
    .loc-hero h1 span { color: var(--gold-light); }
    .loc-hero p { color: rgba(255,255,255,0.8); font-size: 1rem; max-width: 560px; margin: 0 auto 2rem; }
    .loc-hero .actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

    .loc-body { padding: 5rem 2rem; background: var(--cream); }
    .loc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 1100px; margin: 0 auto; align-items: start; }
    @media(max-width:768px){ .loc-grid { grid-template-columns: 1fr; } }

    .loc-content h2 { font-family: 'Playfair Display', serif; font-size: 1.9rem; color: var(--green-dark); margin-bottom: 1rem; }
    .loc-content p { color: var(--text-mid); line-height: 1.75; margin-bottom: 1rem; font-size: 0.95rem; }
    .loc-services { margin-top: 1.5rem; }
    .loc-services h3 { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--green-dark); margin-bottom: 1rem; }
    .loc-service-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
    .loc-service-list li { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: var(--text-mid); }
    .loc-service-list li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--green-mid); flex-shrink: 0; }

    .loc-sidebar { display: flex; flex-direction: column; gap: 1.25rem; }
    .info-card { background: white; border-radius: var(--radius); padding: 1.5rem; box-shadow: var(--shadow); }
    .info-card h4 { font-size: 0.75rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.75rem; }
    .info-card p, .info-card a { font-size: 0.9rem; color: var(--text-mid); display: block; }
    .info-card a { color: var(--green-mid); font-weight: 600; margin-top: 0.25rem; }
    .info-card a:hover { color: var(--green-dark); }
    .cta-card { background: var(--green-dark); border-radius: var(--radius); padding: 1.75rem; text-align: center; }
    .cta-card h3 { font-family: 'Playfair Display', serif; color: white; font-size: 1.25rem; margin-bottom: 0.5rem; }
    .cta-card p { color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 1.25rem; }

    .nearby-section { background: white; padding: 3.5rem 2rem; }
    .nearby-section .container { max-width: 1100px; margin: 0 auto; }
    .nearby-section h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--green-dark); margin-bottom: 1.5rem; }
    .loc-link { display: inline-block; padding: 0.5rem 1.25rem; border: 2px solid var(--green-mid); border-radius: 50px; color: var(--green-dark); font-size: 0.875rem; font-weight: 500; margin: 0.25rem; transition: var(--transition); }
    .loc-link:hover { background: var(--green-mid); color: white; }

    .schema-section { background: var(--cream); padding: 3rem 2rem; }
  </style>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Florist",
    "name": "Flowers El Ranchito",
    "description": "Family-owned florist serving ${loc.city} and the San Fernando Valley for over 40 years.",
    "address": { "@type": "PostalAddress", "streetAddress": "10648 1/2 Sepulveda Blvd", "addressLocality": "Mission Hills", "addressRegion": "CA", "postalCode": "91345" },
    "telephone": "+18186127515",
    "openingHours": "Mo-Su 07:00-18:00",
    "url": "https://elranchitogrowers.com/locations/${loc.slug}.html",
    "areaServed": { "@type": "City", "name": "${loc.city}" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "120" }
  }
  </script>
</head>
<body>

<nav class="nav" id="main-nav">
  <a href="../index.html" class="nav-brand">
    <span class="line1">Flowers</span>
    <span class="line2">El Ranchito</span>
  </a>
  <div class="nav-links" id="nav-links">
    <a href="../our-work.html">Our Work</a>
    <a href="../pricing.html">Pricing</a>
    <a href="../index.html#reviews">Reviews</a>
    <a href="../index.html#faq">FAQ</a>
    <a href="../index.html#contact" class="nav-cta">Order Now</a>
  </div>
  <div class="nav-hamburger" id="hamburger" aria-label="Menu" role="button" tabindex="0">
    <span></span><span></span><span></span>
  </div>
</nav>

<!-- HERO -->
<div class="loc-hero">
  <div class="inner">
    <div class="badge">📍 Serving ${loc.city}, CA ${loc.zip}</div>
    <h1>Florist Near <span>${loc.city}</span></h1>
    <p>${loc.h1sub}. Hand-crafted arrangements from our family shop in the ${loc.landmark}.</p>
    <div class="actions">
      <a href="tel:+18186127515" class="btn-primary">📞 (818) 612-7515</a>
      <a href="../pricing.html" class="btn-outline">View Pricing →</a>
    </div>
  </div>
</div>

<!-- BODY -->
<section class="loc-body">
  <div class="loc-grid">
    <div class="loc-content">
      <div class="section-label">Serving ${loc.city}</div>
      <h2>Flowers El Ranchito — ${loc.city}'s Favorite Local Florist</h2>
      <p>${loc.desc} We've been serving families across the ${loc.landmark} for over 40 years with 100% naturally grown, hand-made flower arrangements.</p>
      <p>Whether you need a quick birthday bouquet, a grand wedding centerpiece, or a respectful funeral arrangement — we handle it all with care and craftsmanship. No pesticides, no hormones, just pure beautiful flowers grown with love.</p>
      <p>Our shop is located at <strong>10648 1/2 Sepulveda Blvd, Mission Hills</strong> — just a short drive from ${loc.city}. We also offer delivery for larger orders and special events.</p>
      <div class="loc-services">
        <h3>What We Offer for ${loc.city} Residents</h3>
        <ul class="loc-service-list">
          <li>Wedding &amp; Quinceañera Florals</li>
          <li>Birthday &amp; Graduation Bouquets</li>
          <li>Funeral &amp; Sympathy Arrangements</li>
          <li>Valentine's Day &amp; Mother's Day Specials</li>
          <li>Holiday &amp; Seasonal Arrangements</li>
          <li>Custom Home &amp; Event Décor</li>
          <li>Delivery to ${loc.city} (large orders &amp; events)</li>
          <li>Walk-in same-day bouquets from $7</li>
        </ul>
      </div>
    </div>
    <div class="loc-sidebar">
      <div class="info-card">
        <h4>Shop Info</h4>
        <p><strong>Address</strong></p>
        <p>10648 1/2 Sepulveda Blvd<br>Mission Hills, CA 91345</p>
        <p style="margin-top:0.75rem;"><strong>Hours</strong></p>
        <p>Mon – Sun · 7:00am – 6:00pm</p>
        <p>Open on all major holidays</p>
        <a href="https://maps.google.com/?q=Flowers+El+Ranchito+Mission+Hills+CA" target="_blank" rel="noopener">Get Directions →</a>
      </div>
      <div class="info-card">
        <h4>Rating</h4>
        <p style="font-size:1.5rem;font-weight:700;color:var(--green-dark);">4.6 ★</p>
        <p>Based on 120+ Google Reviews</p>
        <a href="https://www.google.com/search?q=flowers+el+ranchito" target="_blank" rel="noopener">Read Reviews on Google →</a>
      </div>
      <div class="cta-card">
        <h3>Ready to Order?</h3>
        <p>Call us or send a custom order request — same-day arrangements available!</p>
        <a href="tel:+18186127515" class="btn-primary" style="display:inline-flex;justify-content:center;width:100%;">📞 Call Now</a>
        <a href="../index.html#contact" class="btn-outline" style="display:inline-flex;justify-content:center;width:100%;margin-top:0.75rem;font-size:0.85rem;">Send a Message →</a>
      </div>
    </div>
  </div>
</section>

<!-- NEARBY LOCATIONS -->
<section class="nearby-section">
  <div class="container">
    <div class="section-label">Also Serving</div>
    <h2>Nearby Areas We Serve</h2>
    <p style="color:var(--text-mid);margin-bottom:1.5rem;">We deliver and serve customers across the San Fernando Valley, including ${loc.nearby} and beyond.</p>
    ${otherLocLinks}
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-left">
      <div class="footer-brand">
        <span>Flowers</span>
        El Ranchito
      </div>
      <div class="social-row">${socialSVGs}
      </div>
      <div class="footer-contact">
        <div><strong>Phone</strong><a href="tel:+18186127515">(818) 612-7515</a></div>
        <div><strong>Address</strong><p>10648 1/2 Sepulveda Blvd, Mission Hills, CA 91345</p></div>
        <div><strong>Hours</strong><p>Mon – Sun · 7:00am – 6:00pm · Open on Holidays</p></div>
      </div>
      <div class="footer-links">${footerNavLinks}
      </div>
      <div class="footer-links" style="margin-top:0.5rem;">
        <strong style="color:rgba(255,255,255,0.35);font-size:0.7rem;text-transform:uppercase;letter-spacing:1px;width:100%;display:block;margin-bottom:0.4rem;">Service Areas</strong>
${locationLinksForFooter}
      </div>
      <p class="copy">© 2025 Flowers El Ranchito. All rights reserved.</p>
    </div>
    <div class="footer-map">${footerMap}
    </div>
  </div>
</footer>

<script src="../assets/js/main.js"></script>
</body>
</html>`;
}

locations.forEach(loc => {
  const html = buildPage(loc);
  const outPath = path.join(__dirname, 'locations', `${loc.slug}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✅ Created: locations/${loc.slug}.html`);
});

console.log(`\n🌸 All ${locations.length} location pages generated!`);
