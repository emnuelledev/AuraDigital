// Experiment archive — data kept separate from presentation.
// Add a new object here and it appears in the grid; no component changes needed.
export const experiments = [
  {
    id: '001', title: 'Lumo', year: '2026',
    disciplines: ['Applied AI', 'Business Tools'],
    status: 'Prototype', freq: 'iris', cta: 'View experiment', link: '#',
    desc: 'A lightweight business management environment exploring how AI can become useful infrastructure for small businesses — instead of an unnecessary layer of complexity.',
  },
  {
    id: '002', title: 'AI Value Research', year: '2026',
    disciplines: ['Research', 'Artificial Intelligence'],
    status: 'Ongoing', freq: 'cyan', cta: 'Open research', link: '#',
    desc: 'Mapping the boundary between what AI can do and where it creates sustainable business value — separating genuine leverage from noise.',
  },
  {
    id: '003', title: 'AI-assisted QA', year: '2026',
    disciplines: ['Software', 'Quality Assurance'],
    status: 'Exploring', freq: 'violet', cta: 'Follow along', link: '#',
    desc: 'Testing how far AI can support software testing — drafting cases, reading logs, triaging bugs — and, just as usefully, where it quietly gets things wrong.',
  },
  {
    id: '004', title: '— currently forming', year: '',
    disciplines: ['New frequency'],
    status: 'Exploring', freq: 'soft', cta: '', link: '', placeholder: true,
    desc: "A question we're still sitting with. New experiments enter the archive as they emerge.",
  },
]
