// ─────────────────────────────────────────────────────────────
//  Your products. Add, edit or remove sets here.
//  price is in rupees (a plain number). For photos, drop image files in
//  the /public folder and set image: '/my-photo.jpg'. Categories create
//  the filter buttons automatically.
//
//  rating (out of 5) and ratingCount show on the product page. You can also
//  give any product its own `reviews` array; otherwise sampleReviews is shown.
// ─────────────────────────────────────────────────────────────

export const categories = ['All', 'Co-ord Sets', 'Kurta Sets', 'Festive', 'Everyday']

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const products = [
  {
    id: 'bandhani',
    name: 'Bandhani Co-ord Set',
    category: 'Co-ord Sets',
    price: 2499,
    swatch: '#7A1F2B',
    image: '',
    fabric: 'Pure cotton',
    fit: 'Relaxed fit',
    pattern: 'Bandhani tie-dye',
    rating: 4.6,
    ratingCount: 184,
    description: 'Classic Bandhani tie-dye co-ord in deep maroon with fine detailing.',
  },
  {
    id: 'chikankari',
    name: 'Chikankari Kurta Set',
    category: 'Kurta Sets',
    price: 3299,
    swatch: '#EBE3D3',
    image: '',
    fabric: 'Mul cotton',
    fit: 'Regular fit',
    pattern: 'Lucknowi Chikankari',
    rating: 4.8,
    ratingCount: 92,
    description: 'Hand-inspired Lucknowi Chikankari embroidery on soft ivory.',
  },
  {
    id: 'ikat',
    name: 'Ikat Co-ord Set',
    category: 'Co-ord Sets',
    price: 2799,
    swatch: '#1F5C57',
    image: '',
    fabric: 'Handloom cotton',
    fit: 'Relaxed fit',
    pattern: 'Woven Ikat',
    rating: 4.5,
    ratingCount: 143,
    description: 'Woven Ikat pattern in teal, a timeless everyday statement.',
  },
  {
    id: 'blockprint',
    name: 'Block Print Co-ord',
    category: 'Everyday',
    price: 1999,
    swatch: '#C97B84',
    image: '',
    fabric: 'Cotton cambric',
    fit: 'Relaxed fit',
    pattern: 'Hand block print',
    rating: 4.4,
    ratingCount: 210,
    description: 'Hand block printed florals, light and breezy for daily wear.',
  },
  {
    id: 'banarasi',
    name: 'Banarasi Kurta Set',
    category: 'Festive',
    price: 4499,
    swatch: '#E4A11B',
    image: '',
    fabric: 'Banarasi silk blend',
    fit: 'Regular fit',
    pattern: 'Banarasi zari weave',
    rating: 4.9,
    ratingCount: 76,
    description: 'Festive Banarasi weave with golden zari, made to celebrate.',
  },
  {
    id: 'kalamkari',
    name: 'Kalamkari Co-ord',
    category: 'Co-ord Sets',
    price: 2599,
    swatch: '#8A5A2B',
    image: '',
    fabric: 'Cotton',
    fit: 'Relaxed fit',
    pattern: 'Kalamkari print',
    rating: 4.5,
    ratingCount: 118,
    description: 'Traditional Kalamkari storytelling prints in earthy tones.',
  },
  {
    id: 'mulcotton',
    name: 'Mul Cotton Co-ord',
    category: 'Everyday',
    price: 1799,
    swatch: '#B7C4B1',
    image: '',
    fabric: 'Mul cotton',
    fit: 'Relaxed fit',
    pattern: 'Solid',
    rating: 4.3,
    ratingCount: 165,
    description: 'Feather-light mul cotton for warm days, easy to layer.',
  },
  {
    id: 'ajrakh',
    name: 'Ajrakh Co-ord Set',
    category: 'Festive',
    price: 3099,
    swatch: '#274060',
    image: '',
    fabric: 'Ajrakh cotton',
    fit: 'Regular fit',
    pattern: 'Ajrakh block print',
    rating: 4.7,
    ratingCount: 88,
    description: 'Indigo Ajrakh block prints with intricate geometric motifs.',
  },
]

// Shown on every product page. Edit freely.
export const productExtras = {
  care: ['Gentle hand wash in cold water', 'Do not bleach', 'Dry in shade', 'Warm iron if needed'],
  delivery: 'Ships in 3 to 5 days. Free delivery on orders above ₹1,999. Easy 7-day returns.',
}

// Placeholder reviews used when a product has no reviews of its own.
export const sampleReviews = [
  { name: 'Priya M.', stars: 5, date: '2 weeks ago', text: 'Beautiful fabric and the fit is perfect. Colours are exactly as shown.' },
  { name: 'Sneha T.', stars: 4, date: '1 month ago', text: 'Really comfortable and looks premium. Delivery was quick too.' },
  { name: 'Ritika S.', stars: 5, date: '1 month ago', text: 'Got so many compliments. Will definitely order again.' },
]
