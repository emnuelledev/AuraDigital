// Centralized, editable content for the Discovery Call experience.
// Mirrors the pattern in data/site.js — copy, options and labels live here,
// components just render them.

export const intro = {
  eyebrow: 'Discovery Call',
  head: 'Let&rsquo;s understand what you&rsquo;re building.',
  body: [
    'Before we talk, we&rsquo;d love to understand a little about you, your business, and what you&rsquo;re looking to create.',
    'This short discovery form gives us the context we need to make our first conversation more focused, useful, and relevant to you.',
    'You don&rsquo;t need to have everything figured out yet. That&rsquo;s part of what we&rsquo;re here for.',
  ],
  time: 'Estimated time: 3–5 minutes.',
  cta: 'Let&rsquo;s begin',
  back: 'Back to Aura',
}

export const stageOptions = [
  'I’m just getting started',
  'Early-stage business',
  'Established business',
  'Rebranding or repositioning',
  'Launching something new',
  'Personal brand / independent professional',
  'Other',
]

export const serviceOptions = [
  'Website / Landing Page',
  'Brand Identity',
  'Digital Strategy',
  'E-book / Digital Publication',
  'Media Kit / Presentation',
  'AI Implementation / Workflow',
  'Digital Product',
  'Creative Direction',
  'Other',
  'I’m not sure yet',
]

export const materialsOptions = [
  'Yes, most things are ready',
  'I have some materials',
  'We’re starting almost from scratch',
  'I’m not sure what I’ll need yet',
]

export const timelineOptions = [
  'As soon as possible',
  'Within the next month',
  'Within 1–3 months',
  'Later this year',
  'I’m flexible',
  'I’m just exploring for now',
]

export const budgetOptions = [
  'I’m still exploring',
  'Under €500',
  '€500–€1,000',
  '€1,000–€2,000',
  '€2,000–€5,000',
  '€5,000+',
  'I’d prefer to discuss this during the call',
]

export const steps = [
  {
    id: 'about',
    label: '01 / About you',
    intro: 'First, tell us who we’re talking to.',
  },
  {
    id: 'business',
    label: '02 / Your business',
    intro: 'Now, tell us a little about what you do.',
  },
  {
    id: 'project',
    label: '03 / The project',
    intro: 'What can we help you bring to life?',
  },
  {
    id: 'details',
    label: '04 / Project details',
    intro: 'A little context helps us recommend the right direction.',
  },
  {
    id: 'review',
    label: '05 / Almost there',
    intro: 'One last look.',
  },
]

export const review = {
  privacy: 'Your information will only be used to evaluate your enquiry, prepare for our conversation, and contact you regarding your project.',
  cta: 'Send my project',
}

export const success = {
  label: 'Received ✦',
  head: 'Your project is officially on our radar.',
  body: [
    'Thank you for taking the time to tell us about what you’re building.',
    'We’ll review your answers and get back to you with the next steps. If we believe Aura Digital is the right fit for your project, we’ll arrange a Discovery Call to explore the possibilities together.',
    'Until then, keep building the idea. We’ll bring the strategy, the craft and the aura.',
  ],
  cta: 'Back to Aura Digital',
}

export const errorState = {
  head: 'Something interrupted the signal.',
  body: 'Your answers are still here. Please try sending them again.',
  cta: 'Try again',
}
