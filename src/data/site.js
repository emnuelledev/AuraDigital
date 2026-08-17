// Centralized, editable content for the Aura Digital home page.
// Nothing in the section components is hardcoded — edit copy, prices,
// services, work and links here. (Same pattern as the studio's other projects.)

export const brand = { a: 'Aura', b: 'Digital' }

export const nav = {
  links: [
    { label: 'Studio', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Labs', to: '/labs' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'Start a project', href: '#contact' },
  // Mobile menu (numbered). `to` renders a router link, `href` an anchor.
  mobile: [
    { n: '01', label: 'Studio', href: '#about' },
    { n: '02', label: 'Services', href: '#services' },
    { n: '03', label: 'Work', href: '#work' },
    { n: '04', label: 'Labs', to: '/labs' },
    { n: '05', label: 'Pricing', href: '#pricing' },
    { n: '06', label: 'FAQ', href: '#faq' },
    { n: '07', label: 'Contact', href: '#contact' },
  ],
  mobileFoot: 'Valencia, Spain \u2014 Working worldwide',
}

export const loader = { cap: 'Aura Digital \u2014 Valencia, Spain' }

export const hero = {
  eyebrow: 'Digital transformation \u00b7 AI \u00b7 Creative technology',
  l1: 'Transforming ideas into',
  lav: 'intelligent',
  l2rest: ' digital experiences.',
  sub: 'Aura Digital combines artificial intelligence, software engineering and strategic design to help businesses adapt, innovate and grow in the digital era.',
  ctas: [
    { label: 'Start a Project', href: '#contact', primary: true, arw: true },
    { label: 'Explore Services', href: '#services', primary: false },
  ],
}

export const about = {
  eyebrow: 'The Studio',
  statement: 'We don&apos;t just design. We build <em>intelligent digital solutions</em> &mdash; where strategy, technology and creativity meet.',
  lede: [
    'Aura Digital is a digital studio working where <strong>software engineering, artificial intelligence and design</strong> meet. We&apos;re not a template factory and we&apos;re not a one-trick agency &mdash; we&apos;re obsessed with how technology and creativity, together, make a business move.',
    'Every project begins the same way: not with a colour or a font, but with your business. We map who you serve, what you sell and where you&apos;re going &mdash; <strong>strategy before design, always</strong>. Only then do we shape the identity, the website and the assets into one coherent, premium whole.',
    'The result is transformation you can measure: sharper positioning, stronger perception, and a presence that finally looks like the ambition behind it.',
  ],
  principles: [
    { n: '01', t: 'Strategy first', d: 'We understand the business before we open the canvas.' },
    { n: '02', t: 'One coherent system', d: 'Identity, web and content built to move as one.' },
    { n: '03', t: 'Editorial craft', d: 'Typography, space and detail treated like couture.' },
    { n: '04', t: 'Built worldwide', d: 'Based in Valencia, working with clients across continents.' },
  ],
}

export const philosophy = {
  eyebrow: 'Our philosophy',
  head: 'Technology with intention.<br/><span class="grad">Creativity with strategy.</span>',
  body: [
    'We believe technology should not replace human creativity &mdash; it should <strong>amplify</strong> it.',
    'Aura Digital connects strategy, design and artificial intelligence to create solutions that are meaningful, efficient and adaptable.',
    'The future belongs to those who can combine human intuition with technological possibilities.',
  ],
}

export const marquee = [
  { t: 'Digital Transformation' },
  { t: 'AI Implementation', ital: true },
  { t: 'Creative Technology' },
  { t: 'Software Engineering', ital: true },
  { t: 'Digital Strategy' },
]

export const services = {
  eyebrow: 'What we do',
  head: 'Three pillars, one intelligent practice.',
  items: [
    {
      idx: 'S\u201401', title: 'Digital Transformation',
      desc: 'AI and automation applied to real business processes.',
      long: [
        'Technology should make business simpler \u2014 not more complicated.',
        'We explore where AI, automation and digital systems can create meaningful improvements in the way a business operates. From optimizing processes to designing smarter workflows, the goal is to turn technology into practical, sustainable business value.',
      ],
      tags: ['AI Implementation Consulting', 'Business Process Optimization', 'Digital Strategy', 'Automation Solutions'],
    },
    {
      idx: 'S\u201402', title: 'Digital Experiences',
      desc: 'Interfaces, identities and products people actually feel.',
      long: [
        'A digital presence should feel as intentional as the business behind it.',
        'We create websites, identities and digital experiences that bring strategy, design and usability together \u2014 translating ideas into clear, distinctive and functional experiences people can actually connect with.',
      ],
      tags: ['Websites & Landing Pages', 'Brand Identity', 'UI/UX Design', 'Digital Presence'],
    },
    {
      idx: 'S\u201403', title: 'Creative Intelligence',
      desc: 'Where content, products and AI meet.',
      long: [
        'The most interesting ideas often live between disciplines.',
        'We combine creativity, technology and artificial intelligence to explore new ways of creating content, products and digital solutions. From AI-assisted systems to experimental product concepts, this is where we test what becomes possible when creative thinking meets emerging technology.',
      ],
      tags: ['AI-assisted Content Systems', 'Digital Product Concepts', 'Knowledge Products', 'Creative Technology Solutions'],
    },
  ],
}

export const featured = {
  tag: 'Featured Package',
  head: 'The <em>Digital Launch</em>. Everything you need to arrive.',
  lede: 'One considered system for businesses stepping into the market &mdash; a complete identity, a page that converts, and the assets to show up everywhere with the same confident voice.',
  price: { eur: '\u20ac990', usd: '$1,070' },
  priceLabel: 'Complete launch \u2014 EUR / USD',
  cta: { label: 'Start your launch', href: '#contact' },
  items: [
    { t: 'Visual Identity', d: 'system + guide' },
    { t: 'Landing Page', d: 'responsive + SEO' },
    { t: 'Media Kit', d: 'editorial PDF' },
    { t: 'Creative Direction', d: 'campaigns + content' },
    { t: 'eBook Design', d: 'lead magnet' },
  ],
}

export const pricing = {
  eyebrow: 'Investment',
  head: 'Transparent pricing. No surprises.',
  packages: [
    {
      name: 'Starter Presence', title: 'Look established from day one.',
      obj: 'A professional starting kit for freelancers and brand-new businesses.',
      amount: { eur: '450', usd: '486' }, from: 'Starting from',
      items: ['Logo Design', 'Essential Visual Identity', 'Media Kit'],
      cta: 'Choose Starter', ghost: true,
    },
    {
      name: 'Digital Launch', title: 'The complete market entrance.', badge: 'Most chosen', feature: true,
      obj: 'A full identity, a converting page and content — everything to launch at once.',
      amount: { eur: '990', usd: '1,070' }, from: 'Starting from',
      items: ['Visual Identity', 'Landing Page', 'Media Kit', 'Creative Direction', 'eBook / Digital Product'],
      cta: 'Choose Launch \u2197', ghost: false,
    },
    {
      name: 'Business Growth', title: 'Premium presence, ready to scale.',
      obj: 'The full solution for established businesses ready for their next chapter.',
      amount: { eur: '1,750', usd: '1,890' }, from: 'Starting from',
      items: ['Visual Identity', 'Business Website', 'Creative Direction', 'Media Kit', 'Pitch Deck'],
      cta: 'Choose Growth', ghost: true,
    },
    {
      name: 'Digital Partnership', title: 'A digital partner, not an agency.',
      obj: 'Ongoing creative and technical support for businesses that keep moving.',
      amount: { eur: '2,000', usd: '2,160' }, from: 'per month',
      items: ['Digital Strategy Sessions', 'Website Evolution', 'Creative Direction', 'Campaign Support', 'AI Workflow Advice', 'Aura Blueprint\u2122'],
      cta: 'Become a Partner', ghost: true,
    },
  ],
  alacarte: [
    { n: 'A\u201401', t: 'Logo Design', d: 'Memorable mark, secondary logo, icon — PNG / SVG / PDF / AI.', pre: { eur: '\u20ac', usd: '$' }, amt: { eur: '350', usd: '380' } },
    { n: 'A\u201402', t: 'Visual Identity', d: 'Full system — logo, palette, type, graphic elements, brand guide.', pre: { eur: '\u20ac', usd: '$' }, amt: { eur: '500', usd: '540' } },
    { n: 'A\u201403', t: 'Brand Evolution', d: 'Reposition or refresh an existing brand into a premium system.', amt: { eur: 'Custom', usd: 'Custom' } },
    { n: 'A\u201404', t: 'Landing Page', d: 'Conversion-focused, responsive, basic SEO, contact + WhatsApp.', pre: { eur: '\u20ac', usd: '$' }, amt: { eur: '450', usd: '490' } },
    { n: 'A\u201405', t: 'Business Website', d: 'Up to 5 pages, responsive, animations, SEO, contact page.', pre: { eur: '\u20ac', usd: '$' }, amt: { eur: '850', usd: '920' } },
    { n: 'A\u201406', t: 'Advanced Digital Experience', d: 'Custom, multi-page build with advanced interactions and motion.', amt: { eur: 'Custom', usd: 'Custom' } },
    { n: 'A\u201407', t: 'Media Kit', d: 'Editorial presentation for partnerships and opportunities.', pre: { eur: '\u20ac', usd: '$' }, amt: { eur: '180', usd: '195' } },
    { n: 'A\u201408', t: 'eBook Design', d: 'Editorial layout, icons, tables, interactive PDF, mockups.', pre: { eur: '\u20ac', usd: '$' }, amt: { eur: '250', usd: '270' } },
    { n: 'A\u201409', t: 'Pitch Deck', d: 'Investor-ready design, charts, icons — PDF + PPT.', pre: { eur: '\u20ac', usd: '$' }, amt: { eur: '300', usd: '325' } },
    { n: 'A\u201410', t: 'Content & Communication Direction', d: 'Creative direction, campaigns and content systems for brand consistency.', pre: { eur: 'from \u20ac', usd: 'from $' }, amt: { eur: '500', usd: '540' } },
  ],
  note: 'Payments accepted in EUR (\u20ac) and USD ($). USD shown at an approximate rate. Custom items quoted per project.',
}

export const work = {
  eyebrow: 'Selected work',
  head: 'Transformations, not decorations.',
  cases: [
    {
      kind: 'live', first: true,
      cn: 'Beauty & Wellness \u00b7 Brand + Website',
      title: 'A Brazilian glow, built to book itself.',
      cd: 'A premium bronceado brasile\u00f1o studio in Valencia — full identity plus a fast Next.js site with real, optimized studio photography, a curated five-star Google Reviews carousel and a live Instagram feed.',
      tags: ['Brand Identity', 'Next.js Website', 'Google Reviews', 'Instagram Feed'],
      stats: [{ n: '3 yrs', l: 'Consolidated in Valencia' }, { n: 'Live', l: 'Instagram feed' }],
      url: 'https://sweet-bronze-next.vercel.app/',
      siteUrl: 'sweet-bronze-next.vercel.app',
      liveLabel: 'Visit the live site',
    },
    {
      kind: 'mock', mkTheme: 'd',
      mkEyebrow: 'Previdenciary Law · São Paulo', mkH: 'Lucilene Ferraz',
      cn: 'Legal · Website + eBooks',
      title: 'Thirty years of practice, finally with a home online.',
      cd: 'A calm, editorial site for a social-security law practice — built alongside a small library of free, plain-language eBooks that turn dense legislation into something people can actually use.',
      tags: ['Business Website', 'eBook Design', 'Content Library'],
      stats: [{ n: '2', l: 'eBooks published' }, { n: '30+', l: 'Years of practice' }],
      url: 'https://lucilene-ferraz-next.vercel.app/',
      siteUrl: 'lucilene-ferraz-next.vercel.app',
      liveLabel: 'Visit the live site',
    },
    {
      kind: 'mock', mkTheme: 'e',
      mkEyebrow: 'Nutrition · Método Metamorfose', mkH: 'Sarah Victoria',
      cn: 'Nutrition · Website',
      title: 'A strong Instagram following, now with a home base.',
      cd: 'Sarah had already built real trust on Instagram — we gave that audience somewhere to land: a warm, editorial site carrying her method, her content and her voice into a booking-ready home.',
      tags: ['Business Website', 'Content Strategy', 'Brand Voice'],
      stats: [{ n: '4', l: 'Content pillars live' }, { n: '1', l: 'Booking-ready home' }],
      url: 'https://sarah-vitoria-site.vercel.app/',
      siteUrl: 'sarah-vitoria-site.vercel.app',
      liveLabel: 'Visit the live site',
    },
  ],
}

export const why = {
  eyebrow: 'Why Aura',
  head: 'Studio thinking. Boutique attention.',
  items: [
    { t: 'Strategy, not decoration', d: 'We start with your business model and your customer — design is the outcome, never the opening move.' },
    { t: 'One studio, everything', d: 'Identity, website, products and content built together, so nothing feels stitched from different hands.' },
    { t: 'Editorial-grade craft', d: 'Typography and detail treated the way a fashion house treats a garment — considered to the millimetre.' },
    { t: 'Premium perception', d: 'Clients report looking twice their size — and charging like it — within weeks of relaunch.' },
    { t: 'Human, direct', d: 'You talk to the people doing the work. No account layers, no lost briefs, no telephone game.' },
    { t: 'Made for the world', d: 'Rooted in Valencia, fluent across markets — we ship in EUR and USD, on any timezone.' },
  ],
}

export const testimonials = {
  eyebrow: 'In their words',
  head: 'The kind of studio you tell people about.',
  items: [
    { wide: true, quote: 'I loved the work and the care that went into every detail. From the website to the e-book, everything was thoughtfully developed, and I&apos;m very happy with what we&apos;ve created together. I&apos;m looking forward to continuing with our future projects.', name: 'Lucilene Ferraz', role: 'Lawyer, Previdenciary Law' },
    { quote: 'It turned out absolutely beautiful. You can really see how much care and dedication went into everything, and it came at exactly the right moment. I&apos;m incredibly grateful for the work and attention to detail.', name: 'Sarah Victoria', role: 'Nutritionist, Metamorfose Method' },
    { quote: 'I&apos;m very happy with the final project. The work was handled with great care and professionalism, and the result really represents Sweet Bronze and what we wanted for the business.', name: 'Dayane B.', role: 'Manager, Sweet Bronze' },
  ],
}

export const founder = {
  eyebrow: 'The founder',
  head: 'The mind behind Aura Digital.',
  caption: { n: 'Emanuelle Soares', r: 'Founder \u00b7 Digital Strategist' },
  alt: 'Emanuelle Soares, founder of Aura Digital',
  lead: 'A multidisciplinary professional working at the intersection of <span class="grad">technology, creativity and business strategy</span>.',
  story: [
    'With a background in <strong>Software Engineering</strong> and experience exploring digital solutions, automation and emerging technologies, she combines technical knowledge with creative thinking to build meaningful digital experiences.',
    'Her journey connects software development, marketing strategy, retail management and product thinking, allowing her to understand both the technology behind solutions and the people who use them.',
    'In recent years, Emanuelle has been deeply focused on <strong>AI Implementation and applied Artificial Intelligence</strong>, researching and testing how AI can solve real business challenges, optimize processes and create smarter digital experiences.',
    'Through Aura Digital, she explores the bridge between innovation and human creativity, helping businesses understand how technology can become a practical tool for growth.',
  ],
  chips: ['Founder & Digital Strategist', 'Software Engineer', 'AI Implementation Specialist', 'Creative Technologist', 'Digital Transformation Enthusiast'],
  links: {
    linkedin: 'https://www.linkedin.com/in/emanuelle-soares-54b661382/',
    github: 'https://github.com/emnuelledev',
  },
}

export const portal = {
  eyebrow: 'Aura Digital / Labs',
  head: 'Experiments beyond the brief.',
  lede: 'A space for applied AI, software, interfaces and ideas that don&apos;t fit neatly inside a service list. Some become products, services or systems. Some stay questions.',
  cta: 'Enter the Labs',
  freq: 'One studio \u00b7 Multiple frequencies',
  cards: [
    { id: '001', dot: 'p', status: 'Prototype', title: 'Lumo', meta: 'Applied AI \u00b7 Business Tools' },
    { id: '002', dot: 'o', status: 'Ongoing', title: 'AI Value Research', meta: 'Research \u00b7 Artificial Intelligence' },
    { id: '003', dot: 'e', status: 'Exploring', title: 'AI-assisted QA', meta: 'Software \u00b7 Quality Assurance', ghost: true },
  ],
}

export const faq = {
  eyebrow: 'Good to know',
  head: 'Questions, answered.',
  items: [
    { q: 'How does a project start?', a: 'Always with a discovery call. We learn your business, your audience and your goals before we quote or design anything — strategy comes first, so the creative work is built on solid ground.' },
    { q: 'How long does it take?', a: 'A logo or single deliverable typically runs one to two weeks. A full identity or the Digital Launch package usually takes three to five weeks, depending on scope and how quickly feedback flows.' },
    { q: 'Do you work with clients outside Spain?', a: 'Constantly. We\u2019re based in Valencia but work worldwide, across timezones, and invoice in both EUR and USD to keep things simple wherever you are.' },
    { q: 'Are the prices fixed?', a: 'The figures shown are starting points. After the discovery call we send a clear, fixed proposal for your specific scope — no hidden extras, no surprises on the invoice.' },
    { q: 'Can I book a single service instead of a package?', a: 'Absolutely. Everything is available \u00e0 la carte. Packages simply bundle related work at a lower combined cost while keeping your brand consistent across every touchpoint.' },
    { q: 'What do I receive at the end?', a: 'Organised, ready-to-use files in every format you need — PNG, SVG, PDF and source files where relevant — plus guidelines so your brand stays consistent long after we hand off.' },
  ],
}

export const contact = {
  eyebrow: 'Let\u2019s begin',
  head: 'Let&apos;s build something<br/>worth <em>remembering.</em>',
  sub: 'Tell us where your brand is headed. We&apos;ll bring the strategy, the craft and the aura.',
  channels: [
    { label: 'Linkedin', href: 'https://www.linkedin.com/in/emanuelle-soares-54b661382/' },
    { label: 'Email', href: 'mailto:emma.auradigital@gmail.com' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61592869186651' },
  ],
  cta: { label: 'Book a discovery call' },
  loc: ['Valencia, Spain', 'Working worldwide', 'EUR / USD'],
}

export const footer = {
  word: { a: 'Aura', b: 'Spectrum to Digital' },
  blurb: {
    brand: 'Designing brands. Building digital presence.',
    text: 'A boutique creative studio for modern businesses — identity, web, digital products and social, made with strategy and editorial craft.',
  },
  cols: [
    { h: 'Studio', links: [{ label: 'About', href: '#about' }, { label: 'Work', href: '#work' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }] },
    { h: 'Services', links: [{ label: 'Brand Identity', href: '#services' }, { label: 'Websites', href: '#services' }, { label: 'Digital Products', href: '#services' }, { label: 'Social Media', href: '#services' }] },
    { h: 'Connect', links: [{ label: 'Email', href: 'mailto:emma.auradigital@gmail.com' }, { label: 'WhatsApp', href: 'https://wa.me/34674270180' }, { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61592869186651' }, { label: 'Book a call', href: '#contact' }] },
  ],
  bottom: { left: '\u00a9 2025 Aura Digital \u2014 Valencia, Spain', mid: 'Creative \u00b7 Brand \u00b7 Digital Studio' },
}
