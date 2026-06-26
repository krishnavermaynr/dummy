import { Product, Review, TeamMember, ServiceItem, FAQItem } from './types';
import fanFuelJerseyFront from './assets/images/fanfuel_jersey_front_1781762547388.jpg';
import fanFuelJerseyAngled from './assets/images/fanfuel_jersey_angled_1781762565412.jpg';
import fanFuelJerseyDetail from './assets/images/fanfuel_jersey_detail_1781762580709.jpg';
import adjustableDumbbell from './assets/images/adjustable_dumbbell_set_1781762846235.jpg';
import officialFootball from './assets/images/official_match_football_1781762862950.jpg';
import cricketBat from './assets/images/english_willow_cricket_bat_1781762875308.jpg';
import jumpRope from './assets/images/speed_jump_rope_1781762888774.jpg';
import resistanceBands from './assets/images/resistance_bands_set_1781762900962.jpg';
import foamRoller from './assets/images/high_density_foam_roller_1781763094605.jpg';
import tennisRacket from './assets/images/pro_tennis_racket_1781763110377.jpg';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'FanFuel Elite Jersey',
    price: 1999,
    category: 'Sports Apparel',
    image: fanFuelJerseyFront,
    images: [
      fanFuelJerseyFront,
      fanFuelJerseyAngled,
      fanFuelJerseyDetail
    ],
    features: ['Breathable Fabric', 'Sweat-Wicking Technology', 'Lightweight Design'],
    rating: 4.9,
    popular: true,
    desc: 'The ultimate professional-grade sportswear jersey. Custom-tailored structure designed to wick moisture rapidly, keeping you dry and agile on the field.'
  },
  {
    id: 'p2',
    name: 'Velocity Running Shoes',
    price: 4499,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&fm=webp',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Shock Absorption', 'Ultra Grip Outsole', 'Breathable Mesh Knit'],
    rating: 4.8,
    popular: true,
    desc: 'Engineered for speed and endurance, the Velocity Running Shoes feature advanced energetic return foam with a lightweight high-traction profile.'
  },
  {
    id: 'p3',
    name: 'Pro Training Kit',
    price: 2299,
    category: 'Sports Apparel',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
    features: ['All-in-One Sports Setup', 'Premium Microfibers', 'Comfort Fit'],
    rating: 4.9,
    popular: true,
    desc: 'A complete performance pack including training tee and breathable compression tracks designed to amplify freedom of movement during heavy routines.'
  },
  {
    id: 'p4',
    name: 'Sports Backpack',
    price: 1499,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    features: ['Water Resistant Canvas', 'Shoe Compartment', 'Reflective Strips'],
    rating: 4.7,
    popular: true,
    desc: 'Spacious and durable athletic travel essential. Equipped with padded shoulder straps, isolated wet-chamber and dedicated compartments for dirty sneakers.'
  },
  {
    id: 'p5',
    name: 'Performance Hoodie',
    price: 2499,
    category: 'Sports Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    features: ['Athletic Fit', 'Soft Fleece Interior', 'Weather Resistant'],
    rating: 4.8,
    popular: false,
    desc: 'Our supreme athletic hoodie tailored for chilly early morning drills. Features lightweight weather protection with cozy interior insulation.'
  },
  {
    id: 'p6',
    name: 'Training Shorts',
    price: 999,
    category: 'Sports Apparel',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=800&q=80',
    features: ['Stretch Fabric', 'Quick Dry Material', 'Maximum Comfort'],
    rating: 4.6,
    popular: false,
    desc: 'Durable activewear shorts engineered for leg mobility. Includes zipper pocket locks, anti-friction flatlock flat seams and mesh cooling zones.'
  },
  {
    id: 'p7',
    name: 'Velocity X Running Shoes',
    price: 4499,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    features: ['Reinforced Heal Arch', 'Carbon Propulsion Plates', 'Reflective Glow Night Run'],
    rating: 5.0,
    popular: false,
    desc: 'The upgraded race-day edition of our signature footwear. Imbued with explosive kinetic energy plate technology to boost athlete step pace.'
  },
  {
    id: 'p8',
    name: 'PowerSprint Trainers',
    price: 3999,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    features: ['Cross-training Multi-stiffness Grip', 'Sturdy Lateral Support', 'Padded Ankle Arch'],
    rating: 4.7,
    popular: false,
    desc: 'The master stable trainer for explosive weight lifts, agility metrics, box jumps and quick-pivot sprint intervals.'
  },
  {
    id: 'p9',
    name: 'Gym Gloves',
    price: 899,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    features: ['Silicon Palm Grip', 'Extended Wrist Support Wrap', 'Lightweight Washable'],
    rating: 4.5,
    popular: false,
    desc: 'Ergonomic heavy lifting gloves styled for anti-blister skin protection and sturdy, locked-in wrist alignment stabilizers.'
  },
  {
    id: 'p10',
    name: 'Sports Water Bottle',
    price: 599,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    features: ['Double-wall Vacuum Insulated', 'Leakproof Sports Lock Cap', 'BPA Free Stainless Steel'],
    rating: 4.8,
    popular: false,
    desc: 'Durable, rustproof and powder-coated steel bottle keeping your electrolyte beverages ice cold for up to 24 hours under the sun.'
  },
  {
    id: 'p11',
    name: 'Sweatband Set',
    price: 399,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    features: ['Premium Stretched Terry Cloth', 'Unisex Fit Comfort', 'Set of 1 Headband, 2 Wristbands'],
    rating: 4.4,
    popular: false,
    desc: 'High absorbency compression set perfect for tennis, heavy sweat-inducing weight tracks or outdoor basketball runs.'
  },
  {
    id: 'p12',
    name: 'Adjustable Dumbbell Set',
    price: 8999,
    category: 'Equipment',
    image: adjustableDumbbell,
    features: ['Quick Adjust Mechanism', 'Textured Grip Handle', 'Space Saving Design'],
    rating: 4.9,
    popular: true,
    desc: 'Versatile and compact adjustable dumbbells covering all required weight increments. Essential for home gyms and progressive overload strength training.'
  },
  {
    id: 'p13',
    name: 'Pro Yoga & Pilates Mat',
    price: 1899,
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&w=800&q=80',
    features: ['Eco-friendly TPE Material', 'Anti-slip Base', '8mm Extra Thick Cushioning'],
    rating: 4.8,
    popular: true,
    desc: 'High-density premium yoga mat with excellent shock-absorption and comfortable traction tailored for intense studio routines and floor stretching.'
  },
  {
    id: 'p14',
    name: 'Resistance Bands Set',
    price: 1199,
    category: 'Equipment',
    image: resistanceBands,
    features: ['5 Tension Levels', 'Snap-Resistant Latex', 'Carrying System Included'],
    rating: 4.7,
    popular: false,
    desc: 'Complete full-body resistance training kit complete with ankle straps and door anchors to amplify home or hotel workouts.'
  },
  {
    id: 'p15',
    name: 'Speed Jump Rope',
    price: 499,
    category: 'Equipment',
    image: jumpRope,
    features: ['Adjustable Length', 'Ball-bearing Spin System', 'Ergonomic Handles'],
    rating: 4.6,
    popular: false,
    desc: 'Professional grade speed jump rope engineered for high-velocity rotations, intense boxing warm-ups and double-under endurance skips.'
  },
  {
    id: 'p16',
    name: 'High-Density Foam Roller',
    price: 999,
    category: 'Equipment',
    image: foamRoller,
    features: ['Deep Tissue Massage Grid', 'Robust EPP Construction', 'Lightweight Structure'],
    rating: 4.7,
    popular: false,
    desc: 'Durable self-massage tissue release instrument targeting stubborn muscle knots, post-run soreness and increasing athletic mobility.'
  },
  {
    id: 'p17',
    name: 'Official Match Football',
    price: 1599,
    category: 'Outdoor Games',
    image: officialFootball,
    features: ['FIFA Quality Pro Certified', 'Thermal Bonded Seamless Surface', 'Butyl Bladder for Air Retention'],
    rating: 4.8,
    popular: true,
    desc: 'Professional grade match football engineered for precise flight and exceptional control in all weather conditions.'
  },
  {
    id: 'p18',
    name: 'Premium Leather Basketball',
    price: 1899,
    category: 'Outdoor Games',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
    features: ['Composite Leather Cover', 'Deep Channel Design', 'Official Size 7'],
    rating: 4.9,
    popular: true,
    desc: 'Indoor/outdoor premium composite leather basketball providing exceptional grip and superior handling.'
  },
  {
    id: 'p19',
    name: 'Pro Tennis Racket',
    price: 5499,
    category: 'Outdoor Games',
    image: tennisRacket,
    features: ['Carbon Fiber Frame', 'Lightweight 290g', 'Vibration Dampening'],
    rating: 4.7,
    popular: false,
    desc: 'Tournament-ready tennis racket with an optimal blend of power, control, and precision for baseline players.'
  },
  {
    id: 'p20',
    name: 'English Willow Cricket Bat',
    price: 8999,
    category: 'Outdoor Games',
    image: cricketBat,
    features: ['Grade 1 English Willow', 'Mid-Low Sweet Spot', 'Pre-Knocked'],
    rating: 4.9,
    popular: true,
    desc: 'Handcrafted premium English Willow cricket bat designed for explosive stroke play and perfect balance.'
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Rahul Mehta',
    rating: 5,
    content: 'Excellent quality and comfortable sportswear. The Elite Jersey has weathered multiple laundry washes without any thread stretches or fading.',
    role: 'Amateur Footballer'
  },
  {
    id: 'r2',
    author: 'Priya Sharma',
    rating: 5,
    content: 'Best sports merchandise store I\'ve found. The custom team jacket rendering and speedy delivery times were genuinely super impressive!',
    role: 'Marathon Runner'
  },
  {
    id: 'r3',
    author: 'Vikram Grover',
    rating: 5,
    content: 'The Velocity shoes felt extremely springy right out of the box. Highly recommended for daily outdoor workout splits and track drills.',
    role: 'Crossfit Coach'
  }
];

export const statistics = [
  { value: '100,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '15+', label: 'Sports Categories' },
  { value: '4.9/5', label: 'Customer Rating' }
];

export const services: ServiceItem[] = [
  {
    title: 'Custom Team Jerseys',
    description: 'Design personalized jerseys for clubs, schools, and professional sports teams. High precision sublimation with customizable colors, emblem decals, custom names, and athletic numbers.',
    iconName: 'Shirt',
    benefits: ['Full sublimation print', 'All sizes from XS to 3XL', 'Breathable athletic material', 'Zero ink peeling']
  },
  {
    title: 'Sports Merchandise Printing',
    description: 'Customized fan merchandise including premium t-shirts, comfortable fleece hoodies, sports caps, custom banners, water bottles, and accessories.',
    iconName: 'Printer',
    benefits: ['High resolution vector prints', 'Eco-friendly breathable ink', 'Fast sample mockups', 'No minimum setup order']
  },
  {
    title: 'Bulk Corporate Orders',
    description: 'Special high-volume pricing modules and branding solutions for companies, corporate athletic retreats, and sports organizations.',
    iconName: 'Package',
    benefits: ['Massive bulk price reductions', 'Custom organizational branding', 'Express global courier delivery', 'Dedicated account manager']
  },
  {
    title: 'Sports Event Partnerships',
    description: 'Serving as the official licensed merchandise supplier and printing support partner for tournaments, localized dynamic leagues, and larger sporting meets.',
    iconName: 'Trophy',
    benefits: ['On-site pop up stalls option', 'Exclusive participant kit packing', 'Sponsorship branding spots', 'Live fan booth supply']
  },
  {
    title: 'Athlete Sponsorship Programs',
    description: 'Empowering, backing, and supporting emerging regional and national athletes through professional-grade gear setups, grants, and gear sponsorships.',
    iconName: 'Award',
    benefits: ['Complimentary gear packages', 'Marketing and digital exposure', 'Championship entry fee support', 'Community representation']
  }
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How long does delivery take?',
    answer: 'Standard deliveries take 3–7 business days across India. Remote locations and custom jerseys may require an additional 2–3 days for safe production and dispatch.'
  },
  {
    id: 'faq2',
    question: 'Can I return products?',
    answer: 'Yes! We offer a hassle-free, no-questions-asked 30-day return policy for unused products in their original packaging. Please note that fully customized jerseys cannot be returned.'
  },
  {
    id: 'faq3',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to selected international destinations including North America, Europe, Australia, and parts of Southeast Asia. Customs, duties, and air-express shipping rates are calculated dynamically at checkout.'
  },
  {
    id: 'faq4',
    question: 'How can I track my order?',
    answer: 'Once your order is handed over to our premium courier dispatch partners, safe tracking links, and real-time transit telemetry are instantly sent to your email.'
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Aman Verma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Former athlete and state-level basketball captain. Aman founded FanFuel with a fire to bring premium sportswear within reach of every sports enthusiast in India.'
  },
  {
    name: 'Neha Gupta',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'A visionary designer from NIFT with 8+ years of sportswear design expertise. Neha integrates athletic cooling systems and comfortable fit cuts into modern streetwear aesthetics.'
  },
  {
    name: 'Arjun Malhotra',
    role: 'Marketing Head',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'A performance branding specialist. Arjun leads our community partnerships, sports federation events, and grassroots digital marketing campaigns.'
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Manager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Supply chain expert and logistics maven. Priya ensures that our manufacturing units maintain supreme control and delivery grids remain fast and secure.'
  }
];

export const whyChooseBenefits = [
  {
    title: 'Premium Quality Materials',
    description: 'We weave every single jersey with premium heat-regulated moisture microfibers.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Performance-Focused Design',
    description: 'Every stitching pattern, pocket position, and mesh zone is engineered for real athletes.',
    iconName: 'Zap'
  },
  {
    title: 'Fast & Secure Delivery',
    description: 'Equipped with trusted express transport chains so your gear arrives safely and on time.',
    iconName: 'Truck'
  },
  {
    title: 'Affordable Pricing',
    description: 'Direct-to-athlete pricing models removing intermediate markup cuts.',
    iconName: 'Tag'
  },
  {
    title: 'Trusted by 100,000+ Enthusists',
    description: 'High-rated, trusted sportswear loved by local clubs and elite runners.',
    iconName: 'Users'
  }
];
