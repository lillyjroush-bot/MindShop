# MindCart – Project Specification

## What This App Is
MindCart is a personal shopping reflection app. Users save products they're
considering buying, organize them into custom lists, and do a monthly review
to decide if they still want each item. The goal is mindful, intentional
shopping — not impulse buying.

---

## Core User Flow
1. User sees a product while shopping online
2. They copy the URL and open MindCart
3. They paste the URL → app auto-fills name, price, image
4. They pick a list to save it to → item is "pinned"
5. Once a month, they open Review mode and go through each item one by one
6. For each item: Still Want It / Over It / Not Sure
7. Recap tab shows totals, money saved by removing items, breakdown by list

---

## Tech Stack
- React Native + Expo
- react-native-svg (for custom tab icons)
- No other external UI libraries
- All state in useState (no Redux, no Context yet)
- No backend yet — all data is local/in-memory for now

---

## Design System

### Colors
```
bg:          #fafaf9   (off-white background)
white:       #ffffff
black:       #111110
gray1:       #f5f4f2   (light card bg)
gray2:       #e8e5e1   (borders)
gray3:       #b0a89e   (secondary text, inactive icons)
gray4:       #6b6560   (body text)
accent:      #c1674a   (terracotta — primary action color)
accentLight: #f5e8e3   (light terracotta for backgrounds)
```

### Typography
- App title: 22px, weight 700, letterSpacing -0.5
- Section labels: 11px, uppercase, letterSpacing 1.2, gray3
- Card name: 13px, weight 600
- Price: 14px, weight 700 (cards), 22-28px (detail/review)
- Body: 13-14px, gray4
- Tabs: 11px, weight 600

### Aesthetic
- Clean minimal — thin lines, lots of white space
- No gradients, no shadows (just subtle borders)
- Rounded corners: cards 14px, buttons 14-20px, badges 12px
- Everything feels light and considered

---

## Custom SVG Tab Icons
All icons: stroke-width 1.5, no fill, same visual weight

### Saves Tab — Bookmark
```svg
<svg viewBox="0 0 24 28" fill="none">
  <path d="M4 2 H20 V26 L12 20 L4 26 Z"
    stroke="{color}" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
</svg>
```

### Review Tab — Document with ✓ and ✕ circles
```svg
<svg viewBox="0 0 32 26" fill="none">
  <rect x="2" y="1" width="16" height="22" rx="2"
    stroke="{color}" stroke-width="1.5" fill="none"/>
  <line x1="6" y1="7" x2="14" y2="7"
    stroke="{color}" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="6" y1="11" x2="14" y2="11"
    stroke="{color}" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="6" y1="15" x2="11" y2="15"
    stroke="{color}" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="25" cy="7.5" r="4.5"
    stroke="{color}" stroke-width="1.5" fill="none"/>
  <polyline points="22.5,7.5 24,9 27.5,5.5"
    stroke="{color}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="25" cy="18.5" r="4.5"
    stroke="{color}" stroke-width="1.5" fill="none"/>
  <line x1="22.8" y1="16.3" x2="27.2" y2="20.7"
    stroke="{color}" stroke-width="1.3" stroke-linecap="round"/>
  <line x1="27.2" y1="16.3" x2="22.8" y2="20.7"
    stroke="{color}" stroke-width="1.3" stroke-linecap="round"/>
</svg>
```

### Recap Tab — Circular arrows
```svg
<svg viewBox="0 0 24 24" fill="none">
  <path d="M22 12 A10 10 0 1 1 17.5 4"
    stroke="{color}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <polyline points="17 1 17.5 4 20.5 4"
    stroke="{color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

Icons are white when tab is active (black bg), gray3 when inactive.

---

## App Structure

### Header
- App name: "MindCart" (bold, large)
- Tagline: "your mindful cart · {n} saves" (small, gray3)
- Top right: terracotta "+ Pin" button (rounded pill)

### Tab Bar (3 tabs)
- Saves | Review | Recap
- Active tab: black background, white icon + text
- Inactive: gray icon + text, white background

---

## Screens

### 1. Saves Screen
- Horizontal scrollable list filter pills (All + custom lists)
- Black circle "+" button at end of pill row (terracotta) → opens New List modal
- Vertical list of product cards
- Empty state: bookmark icon + "Nothing pinned here yet" + Pin button

**Product Card layout:**
- Left: 88x88 product image (square, no border radius)
- Right: product name (2 lines max), store · list (small gray), price (bold) + save date, optional italic notes preview
- Top right of card: verdict badge (small colored circle with ✓ ✕ ～)

**Verdict badge colors:**
- yes: bg #eaf4ef, text #2d6a4f, symbol ✓
- no: bg #fdecea, text #9b2c2c, symbol ✕
- maybe: bg #fdf3e3, text #7a5c1e, symbol ～

### 2. Review Screen
- Progress dots at top (one per unreviewed item, terracotta = reviewed)
- "{n} of {total}" counter
- Full-width product image (260px tall)
- Store + save date (small gray)
- Product name (large bold)
- Price (terracotta, 22px bold)
- Thin divider line
- "Do you still want this?" (centered, gray)
- 3 verdict buttons side by side (colored bg, symbol + label)
- When all reviewed: done state with ✓ symbol and "See Recap" button

### 3. Recap Screen
- Month label (uppercase, gray, letter-spaced)
- 2x2 stat grid:
  - Still want (green bg) | Over it (red bg)
  - Not sure (tan bg) | Unreviewed (gray bg)
  - Each shows: symbol, big number, label
- Dark card (black bg): "Still in consideration" + total $ + divider + Removed $ + Total saves count
- "By List" section: white card, each list shows name + item count + total $

### 4. Item Detail Modal (slide up)
- Full product image (280px)
- Back arrow button (top left, floating on image)
- Store + save date
- Product name (large)
- Price (terracotta)
- Verdict selector (3 buttons, highlights active)
- Notes text input ("Notes to future you")
- "Save & Close" button

### 5. Pin a Product Modal (slide up)
- Back arrow
- "Pin a Product" title
- Fields: Name, Store, Price ($), Image URL (optional)
- Horizontal list selector pills + "+ New List" dashed pill
- "Pin It" button (black, full width)

### 6. New List Modal (slide up)
- Back arrow
- "New List" title
- Name text input
- Symbol picker grid (8 options: — · ○ △ □ ◇ / ∞)
- Live preview pill (black bg, terracotta symbol + white name)
- "Create List" button (disabled/faded if no name)

---

## Data Model

```javascript
// Item
{
  id: number,
  name: string,
  store: string,
  price: number,
  image: string,        // URL
  savedDate: string,    // e.g. "Apr 12"
  list: string,         // list name
  verdict: null | 'yes' | 'no' | 'maybe',
  notes: string,
}

// Lists are stored as a simple string array
// Default lists: ['Home Refresh', 'For Me', 'Kitchen', 'Birthday Ideas']
```

---

## Sample Data (for development/testing)
```javascript
[
  { id: 1, name: 'Linen Duvet Cover', store: 'Parachute', price: 149,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
    savedDate: 'Apr 12', list: 'Home Refresh', verdict: null, notes: '' },
  { id: 2, name: 'Leather Tote Bag', store: 'Cuyana', price: 195,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    savedDate: 'Apr 28', list: 'For Me', verdict: null, notes: '' },
  { id: 3, name: 'Ceramic Pour-Over', store: 'Fellow', price: 65,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    savedDate: 'May 1', list: 'Kitchen', verdict: null, notes: '' },
  { id: 4, name: 'Wool Throw Blanket', store: 'Jenni Kayne', price: 198,
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=400',
    savedDate: 'May 3', list: 'Home Refresh', verdict: null, notes: '' },
  { id: 5, name: 'Matcha Whisk Set', store: 'Ippodo', price: 28,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    savedDate: 'May 9', list: 'Kitchen', verdict: null, notes: '' },
  { id: 6, name: 'Aesop Hand Wash', store: 'Aesop', price: 38,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    savedDate: 'May 14', list: 'For Me', verdict: null, notes: '' },
]
```

---

## What To Build Next (not built yet)
- [ ] Auto-fill product info from pasted URL (scraper)
- [ ] Image picker from scraped page
- [ ] iOS Share Extension (share from Safari directly to MindCart)
- [ ] Persistent storage (AsyncStorage or Supabase)
- [ ] User accounts
- [ ] Price drop alerts
- [ ] Share lists with friends
- [ ] Affiliate link integration
```