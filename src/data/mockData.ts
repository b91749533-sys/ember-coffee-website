import { Product, BlogPost, BrewGuideItem, Coupon, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ember-signature-blend',
    name: 'Ember Signature Blend',
    subtitle: 'Balanced, Velvet & Dark Honey',
    price: 24,
    originalPrice: 28,
    rating: 4.9,
    reviewsCount: 142,
    category: 'Signature Blend',
    origin: 'Guatemala & Ethiopia',
    roastLevel: 'Medium',
    flavorNotes: ['Dark Chocolate', 'Toasted Hazelnut', 'Caramel', 'Ripe Plum'],
    description: 'Our award-winning house blend crafted for morning clarity. Micro-roasted in small batches, offering a velvety body with subtle floral top notes and a deep cocoa finish.',
    story: 'Conceived in our founding roastery in 2021, Ember Signature combines high-altitude Huehuetenango beans with sun-dried Yirgacheffe micro-lots for maximum sweetness.',
    elevation: '1,800 - 2,100m',
    process: 'Washed & Sun-Dried Natural',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [250, 500, 1000],
    stock: 45,
    isBestSeller: true,
    isFeatured: true,
    brewingRecommendation: 'V60 Pour-Over or Aeropress with a 1:16 brew ratio.',
    reviewsList: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2026-07-28',
        title: 'The absolute benchmark for morning coffee',
        comment: 'Remarkably clean cup with velvety chocolate undertones. Never bitter. Ordering the 1kg bag next time!',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        rating: 5,
        date: '2026-07-15',
        title: 'Sensational aroma',
        comment: 'The fragrance right after grinding is heavenly. You can taste the care put into this roast.',
        verified: true
      }
    ]
  },
  {
    id: 'ethiopian-yirgacheffe',
    name: 'Ethiopian Yirgacheffe',
    subtitle: 'Floral Jasmine & Meyer Lemon',
    price: 28,
    rating: 5.0,
    reviewsCount: 98,
    category: 'Single Origin',
    origin: 'Gedeo Zone, Ethiopia',
    roastLevel: 'Light',
    flavorNotes: ['Jasmine', 'Meyer Lemon', 'Bergamot', 'Wild Peach'],
    description: 'An exquisite Heirloom variety showcasing vibrant citrus brightness, silky body, and delicate jasmine tea nuance. Truly the champagne of coffees.',
    story: 'Hand-picked by smallholder farmers in the mist-shrouded highlands of Yirgacheffe, harvested only when cherries reach peak burgundy ripeness.',
    elevation: '2,000 - 2,200m',
    process: 'Washed',
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [250, 500, 1000],
    stock: 28,
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
    brewingRecommendation: 'V60 Pour-Over at 92°C to accentuate floral top notes.',
    reviewsList: [
      {
        id: 'rev-3',
        author: 'Sophia Chen',
        rating: 5,
        date: '2026-08-01',
        title: 'Complex and elegant',
        comment: 'Feels like drinking fine jasmine tea with rich fruit sweetness. Best pour-over coffee I have tried this year.',
        verified: true
      }
    ]
  },
  {
    id: 'velvet-espresso',
    name: 'Velvet Espresso',
    subtitle: 'Rich Crema, Dark Cocoa & Vanilla',
    price: 26,
    originalPrice: 30,
    rating: 4.8,
    reviewsCount: 115,
    category: 'Espresso',
    origin: 'Colombia & Brazil Santos',
    roastLevel: 'Medium-Dark',
    flavorNotes: ['85% Dark Cocoa', 'Toasted Almond', 'Madagascar Vanilla', 'Molasses'],
    description: 'Engineered specifically for espresso lovers. Produces a thick, tiger-striped golden crema with dense sweetness that holds up beautifully in cortados and lattes.',
    story: 'Roasted slightly slower to caramelize natural sugars without imparting smoky bitterness.',
    elevation: '1,500 - 1,900m',
    process: 'Pulped Natural / Honey',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [250, 500, 1000],
    stock: 60,
    isBestSeller: true,
    isFeatured: true,
    brewingRecommendation: 'Espresso Machine: 18g in, 36g out in 28-30 seconds.',
    reviewsList: [
      {
        id: 'rev-4',
        author: 'Julian Thorne',
        rating: 5,
        date: '2026-07-22',
        title: 'Crema for days!',
        comment: 'Produces incredible crema on my La Marzocco. Rich cocoa profile with zero sourness.',
        verified: true
      }
    ]
  },
  {
    id: 'golden-sunrise',
    name: 'Golden Sunrise',
    subtitle: 'Bright Honey, Clementine & Macadamia',
    price: 25,
    rating: 4.9,
    reviewsCount: 76,
    category: 'Single Origin',
    origin: 'Tarrazú, Costa Rica',
    roastLevel: 'Light',
    flavorNotes: ['Clementine', 'Wildflower Honey', 'Macadamia Nut', 'Red Apple'],
    description: 'A glowing light roast that sparkles with juicy stonefruit sweetness and a clean macadamia nut finish. Ideal for refreshing morning cups.',
    story: 'Sourced from La Minita estate in Costa Rica, where volcanic soil and cool nights create dense beans packed with complex acidity.',
    elevation: '1,700m',
    process: 'Honey Processed',
    images: [
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [250, 500, 1000],
    stock: 35,
    isFeatured: true,
    brewingRecommendation: 'Chemex or Kalita Wave for crisp fruit clarity.',
    reviewsList: []
  },
  {
    id: 'midnight-roast',
    name: 'Midnight Roast',
    subtitle: 'Smoky Oak, Dark Chocolate & Spice',
    price: 23,
    rating: 4.7,
    reviewsCount: 88,
    category: 'Dark Roast',
    origin: 'Sumatra Mandheling & Brazil',
    roastLevel: 'Dark',
    flavorNotes: ['Smoky Cedar', '90% Dark Chocolate', 'Cinnamon', 'Black Cherry'],
    description: 'Bold, intense, and deeply mysterious. Designed for dark roast purists who desire full-bodied depth, earthiness, and zero acidity.',
    story: 'Triple-sorted volcanic beans from North Sumatra blended with heavy-body Brazilian Santos beans for an unforgettable evening brew.',
    elevation: '1,400 - 1,600m',
    process: 'Wet-Hulled (Giling Basah)',
    images: [
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [250, 500, 1000],
    stock: 50,
    isBestSeller: false,
    brewingRecommendation: 'French Press with coarse grind and 4 minute steep time.',
    reviewsList: []
  },
  {
    id: 'colombian-supremo',
    name: 'Colombian Supremo',
    subtitle: 'Sweet Caramel, Red Berries & Walnut',
    price: 25,
    rating: 4.9,
    reviewsCount: 104,
    category: 'Single Origin',
    origin: 'Huila, Colombia',
    roastLevel: 'Medium',
    flavorNotes: ['Brown Sugar', 'Red Currant', 'Walnut', 'Milk Chocolate'],
    description: 'Classic Colombian perfection. Features big bold Supremo screen size 17/18 beans with juicy berry notes rounded by rich brown sugar sweetness.',
    story: 'Grown on steep Andean mountain slopes in Huila by the Los Naranjos grower collective.',
    elevation: '1,750m',
    process: 'Washed',
    images: [
      'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [250, 500, 1000],
    stock: 40,
    isBestSeller: true,
    brewingRecommendation: 'Auto drip machine or French Press.',
    reviewsList: []
  },
  {
    id: 'brazil-santos',
    name: 'Brazil Santos',
    subtitle: 'Creamy Peanut Butter & Milk Chocolate',
    price: 22,
    rating: 4.8,
    reviewsCount: 62,
    category: 'Single Origin',
    origin: 'Minas Gerais, Brazil',
    roastLevel: 'Medium',
    flavorNotes: ['Peanut Butter', 'Milk Chocolate', 'Pecan', 'Low Acid'],
    description: 'Smooth as silk with low acidity and comforting nutty undertones. An exceptionally drinkable all-day coffee.',
    story: 'Natural process beans dried under the tropical sun on vast patio beds in Sul de Minas.',
    elevation: '1,100m',
    process: 'Natural Sun-Dried',
    images: [
      'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [250, 500, 1000],
    stock: 75,
    brewingRecommendation: 'Cold Brew or Espresso blend base.',
    reviewsList: []
  },
  {
    id: 'mountain-reserve-panama',
    name: 'Mountain Reserve (Panama Geisha)',
    subtitle: 'Ultra-Rare Passionfruit, Bergamot & Mango',
    price: 48,
    originalPrice: 55,
    rating: 5.0,
    reviewsCount: 34,
    category: 'Single Origin',
    origin: 'Boquete, Panama',
    roastLevel: 'Light',
    flavorNotes: ['Passionfruit', 'Dried Mango', 'Bergamot Tea', 'Eldeflower'],
    description: 'Our most prestigious micro-lot. Harvested from 70-year-old Geisha trees in Boquete volcanic soil. Explosive tropical fruit complexity and tea-like elegance.',
    story: 'Only 50 bags produced annually. Sourced directly from Hacienda La Esmeralda.',
    elevation: '1,950m',
    process: 'Anaerobic Natural Slow-Dry',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [250, 500],
    stock: 12,
    isNew: true,
    isFeatured: true,
    brewingRecommendation: 'Precision Pour-Over with filtered mineral water at 91°C.',
    reviewsList: [
      {
        id: 'rev-5',
        author: 'Chef Antoine Laurent',
        rating: 5,
        date: '2026-08-04',
        title: 'Mind-blowing flavor clarity',
        comment: 'Tastes literally like passionfruit juice fused with bergamot. Worth every penny for coffee aficionados.',
        verified: true
      }
    ]
  },
  {
    id: 'ember-kettle-black',
    name: 'Ember Precision Pour-Over Kettle',
    subtitle: 'Matte Obsidian & Walnut Wood',
    price: 149,
    originalPrice: 175,
    rating: 4.9,
    reviewsCount: 53,
    category: 'Brewing Gear',
    origin: 'Design in California',
    roastLevel: 'Medium',
    flavorNotes: ['Precision Temperature Control', 'Gooseneck Spout', 'PID Thermostat'],
    description: 'Precision electric gooseneck kettle with variable digital temperature dial, real-time OLED screen, built-in stopwatch, and genuine walnut handle.',
    story: 'Engineered for consistent flow rate control during pour-over extractions.',
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?auto=format&fit=crop&w=1000&q=80'
    ],
    weightOptions: [1000],
    stock: 18,
    isBestSeller: true,
    brewingRecommendation: 'Set temperature to 93°C for medium roasts.',
    reviewsList: []
  }
];

export const BREW_GUIDES: BrewGuideItem[] = [
  {
    id: 'v60',
    name: 'V60 Pour-Over',
    subtitle: 'Clean, Vibrant & Highly Expressive',
    ratio: '1:16',
    grindSize: 'Medium-Fine (Sea Salt)',
    temp: '92°C - 94°C',
    brewTime: '3:00 - 3:30 mins',
    difficulty: 'Medium',
    description: 'The standard choice for single-origin coffees. Highlights delicate floral notes and fruit acidities.',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?auto=format&fit=crop&w=1000&q=80',
    steps: [
      { title: '1. Rinse Filter', instruction: 'Fold paper filter, place in V60 cone, and rinse thoroughly with hot water. Discard water.' },
      { title: '2. Measure & Bloom', instruction: 'Add 20g ground coffee. Pour 60g water in spiral motions and let bloom for 45 seconds.' },
      { title: '3. Main Pour', instruction: 'Pour steadily up to 320g total weight in gentle concentric circles, avoiding filter edges.' },
      { title: '4. Swirl & Drawdown', instruction: 'Give a gentle swirl at 2:30 and let liquid filter through completely. Serve in pre-warmed glass carafe.' }
    ]
  },
  {
    id: 'french-press',
    name: 'French Press',
    subtitle: 'Full-Bodied, Rich & Indulgent',
    ratio: '1:15',
    grindSize: 'Coarse (Breadcrumbs)',
    temp: '95°C',
    brewTime: '4:00 - 5:00 mins',
    difficulty: 'Easy',
    description: 'Immerses coffee grounds directly in hot water for a heavy, comforting cup with abundant aromatic oils.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
    steps: [
      { title: '1. Preheat Press', instruction: 'Swirl hot water in glass carafe and discard.' },
      { title: '2. Add Grounds & Water', instruction: 'Add 30g coarse ground coffee. Pour 450g hot water saturating all grounds.' },
      { title: '3. Steep & Crust Crust', instruction: 'Let steep for 4 minutes. Gently break crust with spoon and skim foam.' },
      { title: '4. Press Gently', instruction: 'Insert plunger and press slowly with zero force. Decant immediately into cup.' }
    ]
  },
  {
    id: 'espresso',
    name: 'Espresso',
    subtitle: 'Concentrated, Crema-Rich Intensity',
    ratio: '1:2',
    grindSize: 'Extra-Fine (Table Salt)',
    temp: '93°C',
    brewTime: '25 - 30 secs',
    difficulty: 'Advanced',
    description: 'Extracted under 9 bars of pressure for thick crema, lingering sweetness, and syrup-like viscosity.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1000&q=80',
    steps: [
      { title: '1. Prep Portafilter', instruction: 'Dose 18g fine espresso grind into clean, dry 58mm basket.' },
      { title: '2. Distribute & Tamp', instruction: 'Distribute grounds evenly with WDT tool and tamp level with 30 lbs pressure.' },
      { title: '3. Extract', instruction: 'Lock in portafilter and pull shot. Target 36g liquid in 27-29 seconds.' }
    ]
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    subtitle: 'Smooth, Low-Acid Refreshment',
    ratio: '1:8 (Concentrate)',
    grindSize: 'Extra-Coarse',
    temp: 'Chilled / Room Temp',
    brewTime: '16 - 18 Hours',
    difficulty: 'Easy',
    description: 'Slow extraction with cold water eliminates harsh acids, creating chocolate-forward sweetness.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80',
    steps: [
      { title: '1. Combine Ingredients', instruction: 'Combine 100g extra coarse grounds with 800ml cold filtered water in mason jar.' },
      { title: '2. Steep in Fridge', instruction: 'Stir well, cover tightly, and chill in refrigerator for 16 hours.' },
      { title: '3. Double Filter', instruction: 'Strain through fine mesh filter followed by paper filter.' },
      { title: '4. Dilute & Enjoy', instruction: 'Pour over ice with equal parts milk or oat milk.' }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'chemistry-of-coffee-extraction',
    title: 'The Hidden Chemistry of Extraction: TDS and EY Decoded',
    excerpt: 'How water chemistry, temperature, and grind particle distribution define every flavor note in your morning cup.',
    category: 'Coffee Science',
    author: 'Youssef Manssouri',
    authorRole: 'Master Roaster & Founder',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'August 2, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1000&q=80',
    tags: ['Science', 'Roasting', 'Brewing'],
    content: `Coffee extraction is both an exact science and a culinary art. When hot water contacts ground coffee, organic compounds dissolve in a precise sequence: acids first, followed by sugars, and finally heavier lipids and bitter plant fibers.

    Understanding Total Dissolved Solids (TDS) and Extraction Yield (EY) allows home baristas to dial in any bag of specialty coffee to perfection. A target EY between 18% and 22% yields harmonious balance, avoiding sour under-extraction and dry, astringent over-extraction.`
  },
  {
    id: 'direct-trade-ethiopia',
    title: 'Highland Harvest: Inside our Direct-Trade Partnership in Yirgacheffe',
    excerpt: 'Journey to 2,200 meters above sea level to discover how smallholder farmers cultivate world-renowned Heirloom varieties.',
    category: 'Origin Stories',
    author: 'Camilla Vasquez',
    authorRole: 'Head of Coffee Sourcing',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    date: 'July 20, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80',
    tags: ['Ethiopia', 'Sustainability', 'Direct Trade'],
    content: `Nestled in the southern highlands of Ethiopia, Yirgacheffe is widely regarded as the birthplace of Arabica coffee. Here, coffee is grown naturally under native shade canopy trees without synthetic fertilizers.

    Through our direct-trade model, we pay 45% above Fair Trade minimum prices directly to farming cooperatives, supporting community clean water infrastructure and local schools while securing exclusive micro-lots.`
  },
  {
    id: 'mastering-pour-over-water-recipe',
    title: 'Why Water Quality Changes Everything: Crafting the Perfect Brew Water',
    excerpt: 'Coffee is 98.5% water. Here is how magnesium and calcium ions extract bright fruit clarity in your pour-over.',
    category: 'Barista Techniques',
    author: 'Marcus Vance',
    authorRole: 'Lead Quality Control',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'June 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?auto=format&fit=crop&w=1000&q=80',
    tags: ['Water', 'V60', 'Barista Skills'],
    content: `Tap water contains chlorine and unbalanced mineral levels that can dull vibrant acidity or produce harsh chalky bitterness.

    By remineralizing distilled water with magnesium sulfate (Epsom salt) and sodium bicarbonate (baking soda), you create custom brew water optimized for specialty light roasts.`
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'EMBER15',
    discountPercent: 15,
    minSpend: 30,
    description: '15% OFF your order over $30',
    active: true
  },
  {
    code: 'SPARK20',
    discountPercent: 20,
    minSpend: 50,
    description: '20% OFF premium coffee orders over $50',
    active: true
  },
  {
    code: 'WELCOME10',
    discountPercent: 10,
    minSpend: 0,
    description: '10% OFF first-time subscription orders',
    active: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-89421',
    date: '2026-08-04',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.r@example.com',
    shippingAddress: '742 Evergreen Terrace',
    city: 'San Francisco, CA',
    postalCode: '94102',
    items: [
      {
        productId: 'ember-signature-blend',
        productName: 'Ember Signature Blend',
        productImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80',
        price: 24,
        quantity: 2,
        weight: 500,
        grind: 'Whole Bean'
      }
    ],
    subtotal: 48,
    discount: 7.2,
    shippingCost: 0,
    total: 40.8,
    status: 'Shipped',
    trackingNumber: 'FDX-994182941',
    estimatedDelivery: 'August 8, 2026'
  },
  {
    id: 'ORD-89422',
    date: '2026-08-05',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.v@example.com',
    shippingAddress: '100 Madison Ave, Apt 4B',
    city: 'New York, NY',
    postalCode: '10016',
    items: [
      {
        productId: 'mountain-reserve-panama',
        productName: 'Mountain Reserve (Panama Geisha)',
        productImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
        price: 48,
        quantity: 1,
        weight: 250,
        grind: 'Filter / V60'
      }
    ],
    subtotal: 48,
    discount: 0,
    shippingCost: 5,
    total: 53,
    status: 'Roasted',
    estimatedDelivery: 'August 9, 2026'
  }
];
