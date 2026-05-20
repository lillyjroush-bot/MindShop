// MindShop — Sample data and data model
//
// Item shape:
// {
//   id: number,
//   name: string,
//   store: string,
//   price: number,
//   image: string,        // URL
//   savedDate: string,    // e.g. "Apr 12"
//   list: string,         // list name
//   verdict: null | 'yes' | 'no' | 'maybe',
//   notes: string,
// }

export const DEFAULT_LISTS = ['Home Refresh', 'For Me', 'Kitchen', 'Birthday Ideas'];

export const SAMPLE_ITEMS = [
  {
    id: 1,
    name: 'Linen Duvet Cover',
    store: 'Parachute',
    price: 149,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
    savedDate: 'Apr 12',
    list: 'Home Refresh',
    verdict: null,
    notes: '',
  },
  {
    id: 2,
    name: 'Leather Tote Bag',
    store: 'Cuyana',
    price: 195,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    savedDate: 'Apr 28',
    list: 'For Me',
    verdict: null,
    notes: '',
  },
  {
    id: 3,
    name: 'Ceramic Pour-Over',
    store: 'Fellow',
    price: 65,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    savedDate: 'May 1',
    list: 'Kitchen',
    verdict: null,
    notes: '',
  },
  {
    id: 4,
    name: 'Wool Throw Blanket',
    store: 'Jenni Kayne',
    price: 198,
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=400',
    savedDate: 'May 3',
    list: 'Home Refresh',
    verdict: null,
    notes: '',
  },
  {
    id: 5,
    name: 'Matcha Whisk Set',
    store: 'Ippodo',
    price: 28,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    savedDate: 'May 9',
    list: 'Kitchen',
    verdict: null,
    notes: '',
  },
  {
    id: 6,
    name: 'Aesop Hand Wash',
    store: 'Aesop',
    price: 38,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    savedDate: 'May 14',
    list: 'For Me',
    verdict: null,
    notes: '',
  },
];
