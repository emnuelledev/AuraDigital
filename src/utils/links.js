// True for anything that leaves the site (http(s), mailto, tel) — used to
// decide whether a link should open in a new tab.
export function isExternal(href) {
  return typeof href === 'string' && /^(https?:|mailto:|tel:)/i.test(href)
}

// Spread onto an <a> for external links so they open in a new tab safely.
export function externalProps(href) {
  return isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
