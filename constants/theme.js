// MindShop Design System
// Single source of truth for all colors, typography, and radii.
// Never hardcode these values in components — always import from here.

export const colors = {
  bg:          '#fafaf9',   // off-white background
  white:       '#ffffff',
  black:       '#111110',
  gray1:       '#f5f4f2',   // light card bg
  gray2:       '#e8e5e1',   // borders
  gray3:       '#b0a89e',   // secondary text, inactive icons
  gray4:       '#6b6560',   // body text
  accent:      '#c1674a',   // terracotta — primary action color
  accentLight: '#f5e8e3',   // light terracotta for backgrounds

  // Verdict badge colors
  verdictYesBg:   '#eaf4ef',
  verdictYesText: '#2d6a4f',
  verdictNoBg:    '#fdecea',
  verdictNoText:  '#9b2c2c',
  verdictMaybeBg:   '#fdf3e3',
  verdictMaybeText: '#7a5c1e',
};

export const typography = {
  appTitle:    { fontSize: 22, fontWeight: '700', letterSpacing: -0.5 },
  sectionLabel:{ fontSize: 11, fontWeight: '400', letterSpacing: 1.2, textTransform: 'uppercase' },
  cardName:    { fontSize: 13, fontWeight: '600' },
  priceCard:   { fontSize: 14, fontWeight: '700' },
  priceDetail: { fontSize: 22, fontWeight: '700' },
  priceReview: { fontSize: 22, fontWeight: '700' },
  body:        { fontSize: 13 },
  bodyLarge:   { fontSize: 14 },
  tab:         { fontSize: 11, fontWeight: '600' },
};

export const radii = {
  card:   14,
  button: 14,
  buttonPill: 20,
  badge:  12,
};
