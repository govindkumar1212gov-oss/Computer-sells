import { Product, AdminSettings, Order } from '../types';

export const INITIAL_SETTINGS: AdminSettings = {
  businessName: 'GS COMPUTER',
  tagline: 'Your Tech Partner',
  ownerName: 'Govind Patrkar',
  ownerDesignation: 'Founder & Owner – GS COMPUTER',
  address: 'Paschim Sharira, Kaushambi, Uttar Pradesh – 212214',
  primaryPhone: '9161765722',
  secondaryPhone: '7318427120',
  whatsappNumber: '+919161765722',
  email: 'edgekca@gmail.com',
  deliveryAvailable: true,
  storePickupAvailable: true,
  deliveryCharge: 80,
  freeDeliveryThreshold: 4999,
  deliveryAreas: [
    'Paschim Sharira',
    'Manjhanpur',
    'Bharwari',
    'Sirathu',
    'Sarai Akil',
    'Karari',
    'Kaushambi District',
    'Prayagraj & Neighboring UP Areas'
  ],
  estimatedDeliveryTime: '24 to 48 Hours',
  codEnabled: true,
  onlinePaymentEnabled: true,
  testPaymentModeNotice: true,
  bannerNotice: '⚡ Visit our store in Paschim Sharira or order online! 100% Tested & Verified Laptops with Warranty.'
};

export const INITIAL_PRODUCTS: Product[] = [
  // --- USED / SECOND-HAND LAPTOPS ---
  {
    id: 'prod-used-1',
    name: 'Dell Latitude 5510 15.6" (Refurbished Grade A+)',
    brand: 'Dell',
    category: 'USED / SECOND-HAND LAPTOPS',
    condition: 'Used / Refurbished',
    price: 28699,
    mrp: 65000,
    discount: 56,
    inStock: true,
    stockCount: 4,
    sku: 'GS-USED-DELL5510',
    description: 'High performance business laptop with 10th Gen Intel Core i5 processor, 16GB RAM, 512GB SSD and pristine anti-glare display. Fully tested 30-point hardware diagnostic passed.',
    specifications: {
      processor: 'Intel Core i5 10th Gen (10210U @ 1.6GHz up to 4.2GHz)',
      ram: '16GB DDR4 High Speed RAM',
      storage: '512GB NVMe M.2 Fast SSD',
      display: '15.6-inch Full HD (1920x1080) Anti-glare Display',
      graphics: 'Intel UHD Graphics 620',
      os: 'Windows 11 Pro 64-bit Genuine',
      warranty: '6 Months GS Computer Store Warranty + 1 Year Service Support',
      conditionGrade: 'Like New (Grade A+)',
      batteryHealth: 'Up to 4-5 hours battery backup',
      ports: 'USB Type-C, 3x USB 3.2, HDMI, RJ45 LAN, SD Card Reader'
    },
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isPopular: true,
    deliveryInfo: 'Fast delivery within 24-48 hrs in Kaushambi district'
  },
  {
    id: 'prod-used-2',
    name: 'Lenovo ThinkPad T480 Intel Core i5 8th Gen (Refurbished)',
    brand: 'Lenovo',
    category: 'USED / SECOND-HAND LAPTOPS',
    condition: 'Used / Refurbished',
    price: 18500,
    mrp: 52000,
    discount: 64,
    inStock: true,
    stockCount: 6,
    sku: 'GS-USED-TP480',
    description: 'Legendary ThinkPad durability with spill-resistant keyboard, dual battery setup, and military-grade chassis. Best choice for students, coders, and office professionals.',
    specifications: {
      processor: 'Intel Core i5 8th Gen (8250U Quad-Core)',
      ram: '8GB DDR4 RAM (Expandable to 32GB)',
      storage: '256GB High-Speed SSD',
      display: '14.0-inch Full HD IPS Display',
      graphics: 'Intel UHD 620',
      os: 'Windows 10/11 Pro Genuine',
      warranty: '6 Months GS Computer Store Warranty',
      conditionGrade: 'Excellent (Grade A)',
      batteryHealth: 'Dual Battery with 3.5+ Hours Backup',
      ports: 'Thunderbolt 3, USB-C, 2x USB 3.0, HDMI, Ethernet'
    },
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isPopular: true,
    deliveryInfo: 'Available for immediate store pickup or home delivery'
  },
  {
    id: 'prod-used-3',
    name: 'HP EliteBook 840 G5 Metal Body Slim Laptop',
    brand: 'HP',
    category: 'USED / SECOND-HAND LAPTOPS',
    condition: 'Used / Refurbished',
    price: 21999,
    mrp: 58000,
    discount: 62,
    inStock: true,
    stockCount: 3,
    sku: 'GS-USED-HP840G5',
    description: 'Ultra-premium silver aluminium finish with Bang & Olufsen audio, backlit keyboard, fingerprint reader and vibrant FHD panel.',
    specifications: {
      processor: 'Intel Core i5 8th Gen Quad Core',
      ram: '16GB DDR4 RAM',
      storage: '512GB M.2 NVMe SSD',
      display: '14-inch Full HD IPS Anti-glare',
      graphics: 'Intel UHD Graphics',
      os: 'Windows 11 Pro',
      warranty: '6 Months GS Computer Store Warranty',
      conditionGrade: 'Like New (Grade A+)',
      batteryHealth: '4+ hours battery backup',
      ports: 'USB-C with Thunderbolt, HDMI, 2x USB 3.1, Audio Jack'
    },
    images: [
      'https://images.unsplash.com/photo-1544731612-de292439cc67?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    deliveryInfo: 'Shipped from Paschim Sharira store'
  },
  {
    id: 'prod-used-4',
    name: 'Dell Latitude 3400 i3 8th Gen Budget Laptop',
    brand: 'Dell',
    category: 'USED / SECOND-HAND LAPTOPS',
    condition: 'Used / Refurbished',
    price: 14500,
    mrp: 38000,
    discount: 61,
    inStock: true,
    stockCount: 5,
    sku: 'GS-USED-DELL3400',
    description: 'Budget-friendly second-hand laptop for accounting, online classes, Tally, browsing and light business duties.',
    specifications: {
      processor: 'Intel Core i3 8th Gen',
      ram: '8GB DDR4 RAM',
      storage: '256GB SSD',
      display: '14-inch HD Display',
      graphics: 'Intel HD Graphics',
      os: 'Windows 10 Home Genuine',
      warranty: '3 Months Store Warranty',
      conditionGrade: 'Excellent (Grade A)',
      batteryHealth: '3 Hours Backup'
    },
    images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80'
    ],
    deliveryInfo: 'Cash on delivery available in local area'
  },

  // --- NEW LAPTOPS ---
  {
    id: 'prod-new-1',
    name: 'HP 15s 12th Gen Intel Core i5 (16GB RAM / 512GB SSD)',
    brand: 'HP',
    category: 'NEW LAPTOPS',
    condition: 'New',
    price: 49999,
    mrp: 62990,
    discount: 20,
    inStock: true,
    stockCount: 8,
    sku: 'GS-NEW-HP15S-I5',
    description: 'Brand new sealed HP 15s with 12th Gen Intel Core i5-1235U processor, Micro-Edge FHD display, Alexa built-in, fast charge, and pre-installed MS Office.',
    specifications: {
      processor: '12th Gen Intel Core i5-1235U (10 Cores, up to 4.4 GHz)',
      ram: '16GB DDR4-3200 MHz RAM',
      storage: '512GB PCIe NVMe M.2 SSD',
      display: '15.6" Full HD (1920x1080) Micro-edge, 250 nits',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Home + MS Office 2021 Original',
      warranty: '1 Year HP On-site Brand Warranty',
      conditionGrade: 'Brand New',
      batteryHealth: 'Brand New (Up to 7 hours)'
    },
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544731612-de292439cc67?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isPopular: true,
    deliveryInfo: 'Includes free laptop bag and mouse from GS COMPUTER'
  },
  {
    id: 'prod-new-2',
    name: 'Dell Inspiron 3520 12th Gen Intel Core i3',
    brand: 'Dell',
    category: 'NEW LAPTOPS',
    condition: 'New',
    price: 36490,
    mrp: 45990,
    discount: 21,
    inStock: true,
    stockCount: 5,
    sku: 'GS-NEW-DELL3520',
    description: 'Brand new Dell Inspiron 3520 with 120Hz smooth FHD screen, fast responsive SSD, ExpressCharge, and Dell Cinema color profile.',
    specifications: {
      processor: 'Intel Core i3-1215U (6 Cores, up to 4.40 GHz)',
      ram: '8GB DDR4 RAM',
      storage: '512GB SSD NVMe',
      display: '15.6" FHD 120Hz WVA Anti-Glare LED Backlit',
      graphics: 'Intel UHD Graphics',
      os: 'Windows 11 Home + Office Home & Student',
      warranty: '1 Year Dell On-site Warranty',
      conditionGrade: 'Brand New'
    },
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true,
    deliveryInfo: 'Official GST invoice with serial number warranty'
  },
  {
    id: 'prod-new-3',
    name: 'Lenovo IdeaPad Slim 3 Core i5 12th Gen',
    brand: 'Lenovo',
    category: 'NEW LAPTOPS',
    condition: 'New',
    price: 47990,
    mrp: 59990,
    discount: 20,
    inStock: true,
    stockCount: 4,
    sku: 'GS-NEW-LENSLIM3',
    description: 'Arctic Grey sleek lightweight design with Dolby Audio, privacy shutter camera, and rapid charging support.',
    specifications: {
      processor: '12th Gen Intel Core i5-12450H',
      ram: '16GB LPDDR5 High Speed RAM',
      storage: '512GB SSD NVMe Gen 4',
      display: '15.6-inch FHD IPS Anti-Glare',
      graphics: 'Intel UHD Graphics',
      os: 'Windows 11 Home Genuine',
      warranty: '1 Year Lenovo Premier Support',
      conditionGrade: 'Brand New'
    },
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    deliveryInfo: 'Free setup & software installation support by GS COMPUTER'
  },

  // --- DESKTOP / PC ---
  {
    id: 'prod-desk-1',
    name: 'GS Custom Gaming & Editing Desktop PC (Intel i5 12th Gen / 16GB / RTX 3050)',
    brand: 'GS Assembled',
    category: 'DESKTOP / PC',
    condition: 'New',
    price: 48999,
    mrp: 65000,
    discount: 24,
    inStock: true,
    stockCount: 3,
    sku: 'GS-PC-GAME-I5',
    description: 'Custom assembled by Govind Patrkar at GS COMPUTER. Optimized for 1080p gaming, 4K video editing, AutoCAD, Photoshop and streaming. Equipped with tempered glass RGB cabinet and 550W Bronze PSU.',
    specifications: {
      processor: 'Intel Core i5-12400F 6-Core 12-Thread',
      ram: '16GB DDR4 3200MHz RGB RAM',
      storage: '1TB NVMe M.2 Fast SSD',
      graphics: 'NVIDIA GeForce RTX 3050 6GB GDDR6',
      os: 'Windows 11 Pro 64-Bit',
      warranty: '3 Years Component-Level Warranty',
      conditionGrade: 'Brand New'
    },
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    deliveryInfo: 'Includes power cable, Wi-Fi antenna & free benchmark test report'
  },
  {
    id: 'prod-desk-2',
    name: 'Office & Business Assembled PC (Intel Core i5 / 8GB / 256GB SSD + 500GB HDD)',
    brand: 'GS Assembled',
    category: 'DESKTOP / PC',
    condition: 'New',
    price: 16999,
    mrp: 23500,
    discount: 27,
    inStock: true,
    stockCount: 7,
    sku: 'GS-PC-OFFICE-I5',
    description: 'Reliable office tower designed for CSC centres, cyber cafes, schools, medical stores and daily retail billing with Tally ERP and MS Office.',
    specifications: {
      processor: 'Intel Core i5 Quad Core Processor',
      ram: '8GB DDR3/DDR4 High Performance',
      storage: '256GB Boot SSD + 500GB Data Hard Drive',
      graphics: 'Integrated HD Graphics with HDMI + VGA output',
      os: 'Windows 10 Pro with Lifetime activation',
      warranty: '1 Year GS Computer Comprehensive Warranty',
      conditionGrade: 'Brand New'
    },
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true,
    deliveryInfo: 'Comes pre-loaded with anti-virus, Chrome, Hindi typing tools & PDF reader'
  },
  {
    id: 'prod-desk-3',
    name: 'Dell OptiPlex Mini PC Small Form Factor (Refurbished Core i5)',
    brand: 'Dell',
    category: 'DESKTOP / PC',
    condition: 'Used / Refurbished',
    price: 11999,
    mrp: 32000,
    discount: 62,
    inStock: true,
    stockCount: 5,
    sku: 'GS-PC-OPTI-MINI',
    description: 'Compact ultra-quiet mini desktop PC. Takes zero space on desk. Highly power efficient and durable.',
    specifications: {
      processor: 'Intel Core i5 6th/7th Gen',
      ram: '8GB DDR4 RAM',
      storage: '256GB Fast SSD',
      graphics: 'Intel HD Graphics',
      os: 'Windows 10 Pro Genuine',
      warranty: '6 Months GS Computer Store Warranty',
      conditionGrade: 'Excellent (Grade A)'
    },
    images: [
      'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=800&auto=format&fit=crop&q=80'
    ],
    deliveryInfo: 'Includes power adapter and display converter'
  },

  // --- MONITORS ---
  {
    id: 'prod-mon-1',
    name: 'Samsung 24-inch Borderless IPS Full HD Monitor (75Hz, HDMI/VGA)',
    brand: 'Samsung',
    category: 'MONITORS',
    condition: 'New',
    price: 7899,
    mrp: 11500,
    discount: 31,
    inStock: true,
    stockCount: 6,
    sku: 'GS-MON-SAM24',
    description: 'Crisp IPS panel with 178-degree wide viewing angles, 75Hz refresh rate with AMD FreeSync, and flicker-free eye saver mode.',
    specifications: {
      display: '24 inch Full HD (1920 x 1080) IPS 75Hz',
      ports: 'HDMI 1.4, D-Sub (VGA)',
      warranty: '3 Years Samsung India Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true
  },
  {
    id: 'prod-mon-2',
    name: 'Dell 22-inch Full HD LED Monitor with Anti-Glare',
    brand: 'Dell',
    category: 'MONITORS',
    condition: 'New',
    price: 6499,
    mrp: 8900,
    discount: 26,
    inStock: true,
    stockCount: 4,
    sku: 'GS-MON-DELL22',
    description: 'Reliable office monitor with ComfortView for long working hours and low power consumption.',
    specifications: {
      display: '21.5 inch FHD 1920x1080',
      ports: 'HDMI, VGA',
      warranty: '3 Years Dell Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // --- PRINTERS ---
  {
    id: 'prod-prn-1',
    name: 'HP Laser 108w Single Function Wireless Monochrome Printer',
    brand: 'HP',
    category: 'PRINTERS',
    condition: 'New',
    price: 12999,
    mrp: 15499,
    discount: 16,
    inStock: true,
    stockCount: 3,
    sku: 'GS-PRN-HP108W',
    description: 'Compact wireless laser printer. High-speed printing up to 20 ppm with sharp black text. Print directly from smartphone via HP Smart App.',
    specifications: {
      ports: 'Wi-Fi, Hi-Speed USB 2.0',
      warranty: '1 Year HP India Warranty',
      conditionGrade: 'Brand New'
    },
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true
  },
  {
    id: 'prod-prn-2',
    name: 'Canon PIXMA G3010 All-in-One Ink Tank Colour Printer (Print, Scan, Copy)',
    brand: 'Canon',
    category: 'PRINTERS',
    condition: 'New',
    price: 13890,
    mrp: 17295,
    discount: 19,
    inStock: true,
    stockCount: 4,
    sku: 'GS-PRN-CANONG3010',
    description: 'High volume printing with integrated ink tanks. Low cost per page (approx 9 paise black, 32 paise color). Built-in Wi-Fi for mobile printing.',
    specifications: {
      ports: 'Wi-Fi, USB 2.0',
      warranty: '1 Year or 30,000 prints Canon Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // --- SSD & STORAGE ---
  {
    id: 'prod-ssd-1',
    name: 'Crucial P3 500GB PCIe 3.0 3D NAND NVMe M.2 SSD (Up to 3500MB/s)',
    brand: 'Crucial',
    category: 'SSD',
    condition: 'New',
    price: 3199,
    mrp: 4500,
    discount: 28,
    inStock: true,
    stockCount: 15,
    sku: 'GS-SSD-CRU-500',
    description: 'Upgrade your slow laptop or desktop. Boots Windows in under 8 seconds. 6x faster than conventional SATA SSDs.',
    specifications: {
      storage: '500GB NVMe M.2 2280',
      warranty: '5 Years Manufacturer Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true
  },
  {
    id: 'prod-ssd-2',
    name: 'Kingston A400 240GB SATA 3 2.5 inch Internal SSD',
    brand: 'Kingston',
    category: 'SSD',
    condition: 'New',
    price: 1699,
    mrp: 2700,
    discount: 37,
    inStock: true,
    stockCount: 20,
    sku: 'GS-SSD-KING-240',
    description: 'Revive older computers and laptops. 10x faster than traditional hard drives. Ideal for OS installation and quick everyday tasks.',
    specifications: {
      storage: '240GB 2.5" SATA III',
      warranty: '3 Years Kingston Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true
  },
  {
    id: 'prod-hdd-1',
    name: 'Seagate Expansion 1TB External Portable Hard Drive USB 3.0',
    brand: 'Seagate',
    category: 'HARD DISK',
    condition: 'New',
    price: 4399,
    mrp: 5800,
    discount: 24,
    inStock: true,
    stockCount: 8,
    sku: 'GS-HDD-SEA-1TB',
    description: 'Plug-and-play USB 3.0 backup drive for PC, laptop, and photo storage. Includes Rescue Data Recovery services.',
    specifications: {
      storage: '1TB Portable 2.5"',
      warranty: '3 Years Seagate Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // --- RAM ---
  {
    id: 'prod-ram-1',
    name: 'Crucial Basics 8GB DDR4 3200MHz Laptop RAM (SODIMM)',
    brand: 'Crucial',
    category: 'RAM',
    condition: 'New',
    price: 1549,
    mrp: 2300,
    discount: 32,
    inStock: true,
    stockCount: 18,
    sku: 'GS-RAM-CRU-8GB',
    description: 'Instant laptop performance boost. Eliminates stuttering when running multiple browser tabs and office software.',
    specifications: {
      ram: '8GB DDR4 3200MHz SODIMM',
      warranty: '3 Years Limited Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true
  },
  {
    id: 'prod-ram-2',
    name: 'Corsair Vengeance LPX 16GB (1x16GB) DDR4 3200MHz Desktop RAM',
    brand: 'Corsair',
    category: 'RAM',
    condition: 'New',
    price: 2999,
    mrp: 4200,
    discount: 28,
    inStock: true,
    stockCount: 10,
    sku: 'GS-RAM-COR-16GB',
    description: 'High-speed desktop RAM with pure aluminium heat spreader for faster heat dissipation and overclocking headroom.',
    specifications: {
      ram: '16GB DDR4 3200MHz Desktop DIMM',
      warranty: '10 Years Limited Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // --- KEYBOARDS & MOUSE ---
  {
    id: 'prod-kb-1',
    name: 'Logitech MK240 Nano Wireless Keyboard and Mouse Combo',
    brand: 'Logitech',
    category: 'KEYBOARDS',
    condition: 'New',
    price: 1599,
    mrp: 2195,
    discount: 27,
    inStock: true,
    stockCount: 12,
    sku: 'GS-KB-LOGI-MK240',
    description: 'Space-saving compact keyboard and contoured mouse with tiny 2.4GHz USB receiver. 36-month keyboard and 12-month mouse battery life.',
    specifications: {
      ports: '2.4GHz Wireless USB Nano Receiver',
      warranty: '3 Years Logitech Replacement Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true
  },
  {
    id: 'prod-mouse-1',
    name: 'HP X1000 Wired Optical USB Mouse (1600 DPI)',
    brand: 'HP',
    category: 'MOUSE',
    condition: 'New',
    price: 299,
    mrp: 499,
    discount: 40,
    inStock: true,
    stockCount: 30,
    sku: 'GS-MOU-HP-X1000',
    description: 'Comfortable contoured shape for right or left hand with precise 1600 DPI optical sensor. Plug and play.',
    specifications: {
      ports: 'USB 2.0 / 3.0',
      warranty: '1 Year HP Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-kb-2',
    name: 'Zebronics Transformer RGB Gaming Keyboard with Aluminium Body',
    brand: 'Zebronics',
    category: 'KEYBOARDS',
    condition: 'New',
    price: 999,
    mrp: 1499,
    discount: 33,
    inStock: true,
    stockCount: 9,
    sku: 'GS-KB-ZEB-TRANS',
    description: 'Integrated multi-color LED backlight with breathing mode, gold-plated USB, braided cable and durable keys.',
    specifications: {
      warranty: '1 Year Zebronics Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // --- PENDRIVE ---
  {
    id: 'prod-pen-1',
    name: 'SanDisk Ultra Dual Drive Go Type-C 64GB USB Flash Drive',
    brand: 'SanDisk',
    category: 'PENDRIVE',
    condition: 'New',
    price: 699,
    mrp: 1100,
    discount: 36,
    inStock: true,
    stockCount: 25,
    sku: 'GS-PEN-SAN-64C',
    description: '2-in-1 flash drive with reversible USB Type-C and traditional Type-A connector. Easily move files between phones and laptops.',
    specifications: {
      storage: '64GB Dual USB 3.1',
      warranty: '5 Years SanDisk India Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true
  },

  // --- HEADPHONES & WEBCAM ---
  {
    id: 'prod-head-1',
    name: 'Zebronics Zeb-Rush Wired Gaming Headphone with Mic & RGB',
    brand: 'Zebronics',
    category: 'HEADPHONES',
    condition: 'New',
    price: 849,
    mrp: 1399,
    discount: 39,
    inStock: true,
    stockCount: 11,
    sku: 'GS-HEAD-ZEB-RUSH',
    description: 'Deep bass 40mm drivers, soft cushioned earcups, adjustable headband and flexible boom microphone for clear calling & meetings.',
    specifications: {
      ports: '3.5mm Audio + USB for RGB',
      warranty: '1 Year Zebronics Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-cam-1',
    name: 'GS HD 1080p Web Camera with Built-in Noise-Cancelling Mic',
    brand: 'GS Tech',
    category: 'WEBCAM',
    condition: 'New',
    price: 1199,
    mrp: 1999,
    discount: 40,
    inStock: true,
    stockCount: 14,
    sku: 'GS-CAM-1080P',
    description: 'Full HD 1080p 30FPS streaming camera for Zoom meetings, Google Meet, online tutoring and YouTube video recording. Universal clip for monitors and laptops.',
    specifications: {
      display: '1080p FHD 30FPS Auto Light Correction',
      ports: 'USB Plug & Play',
      warranty: '1 Year GS Replacement Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // --- LAPTOP CHARGER & BAG ---
  {
    id: 'prod-chg-1',
    name: 'Universal 65W Laptop Charger Adapter (For Dell / HP / Lenovo)',
    brand: 'PowerPro',
    category: 'LAPTOP CHARGER',
    condition: 'New',
    price: 799,
    mrp: 1499,
    discount: 46,
    inStock: true,
    stockCount: 16,
    sku: 'GS-CHG-UNIV-65W',
    description: 'High-grade replacement power adapter with over-voltage, short-circuit and overheat protection. Compatible with all popular 19.5V/20V laptops.',
    specifications: {
      warranty: '6 Months Replacement Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-bag-1',
    name: 'GS Heavy Duty Water-Resistant Laptop Backpack (Up to 15.6")',
    brand: 'GS Gear',
    category: 'LAPTOP BAG',
    condition: 'New',
    price: 699,
    mrp: 1299,
    discount: 46,
    inStock: true,
    stockCount: 22,
    sku: 'GS-BAG-PRO-15',
    description: 'Ergonomic padded shoulder straps, dedicated shock-absorbing laptop compartment, water-resistant exterior and anti-theft back pocket.',
    specifications: {
      warranty: '6 Months Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-acc-1',
    name: 'Thermal Grizzly Aeronaut High Performance Thermal Paste (1g)',
    brand: 'Thermal Grizzly',
    category: 'OTHER COMPUTER ACCESSORIES',
    condition: 'New',
    price: 499,
    mrp: 750,
    discount: 33,
    inStock: true,
    stockCount: 12,
    sku: 'GS-ACC-THERMAL-1G',
    description: 'Essential for laptop & desktop overheating issues. Drops CPU & GPU temperatures by 8-15°C.',
    specifications: {
      warranty: '100% Original Genuine'
    },
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80'
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'GS-2026-8812',
    customer: {
      fullName: 'Rahul Mishra',
      mobileNumber: '9839123456',
      email: 'rahul.m@example.com',
      house: 'Ward No. 4',
      street: 'Near SBI Bank, Main Market',
      city: 'Paschim Sharira',
      district: 'Kaushambi',
      state: 'Uttar Pradesh',
      pinCode: '212214'
    },
    deliveryOption: 'Home Delivery',
    deliveryCharge: 80,
    subtotal: 28699,
    discount: 0,
    totalAmount: 28779,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid (Demo Mode)',
    status: 'Out for Delivery',
    trackingNumber: 'GSEXP-91823-UP',
    estimatedDelivery: 'Today by 6:00 PM',
    createdAt: '2026-09-26T10:15:00.000Z',
    items: [
      {
        productId: 'prod-used-1',
        productName: 'Dell Latitude 5510 15.6" (Refurbished Grade A+)',
        brand: 'Dell',
        price: 28699,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
        condition: 'Used / Refurbished'
      }
    ],
    history: [
      { status: 'Order Placed', timestamp: '2026-09-26 10:15 AM', note: 'Order placed by customer via UPI' },
      { status: 'Order Confirmed', timestamp: '2026-09-26 10:45 AM', note: 'Verified by Govind Patrkar at GS COMPUTER' },
      { status: 'Packed', timestamp: '2026-09-26 12:30 PM', note: 'Safely boxed with laptop adapter & warranty card' },
      { status: 'Shipped', timestamp: '2026-09-26 02:00 PM', note: 'Dispatched from Paschim Sharira hub' },
      { status: 'Out for Delivery', timestamp: '2026-09-26 03:30 PM', note: 'Delivery executive on the way to recipient' }
    ]
  },
  {
    id: 'GS-2026-8805',
    customer: {
      fullName: 'Sunil Kumar Yadav',
      mobileNumber: '7007654321',
      house: 'Gram Post Karari',
      street: 'Hospital Road',
      city: 'Karari',
      district: 'Kaushambi',
      state: 'Uttar Pradesh',
      pinCode: '212206'
    },
    deliveryOption: 'Store Pickup',
    deliveryCharge: 0,
    subtotal: 3199,
    discount: 0,
    totalAmount: 3199,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending COD',
    status: 'Packed',
    trackingNumber: 'GSPICK-4412',
    estimatedDelivery: 'Ready for Store Pickup in Paschim Sharira',
    createdAt: '2026-09-25T14:20:00.000Z',
    items: [
      {
        productId: 'prod-ssd-1',
        productName: 'Crucial P3 500GB PCIe 3.0 NVMe M.2 SSD',
        brand: 'Crucial',
        price: 3199,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
        condition: 'New'
      }
    ],
    history: [
      { status: 'Order Placed', timestamp: '2026-09-25 02:20 PM', note: 'Store pickup order received' },
      { status: 'Order Confirmed', timestamp: '2026-09-25 02:40 PM', note: 'Stock reserved at GS COMPUTER counter' },
      { status: 'Packed', timestamp: '2026-09-25 03:00 PM', note: 'Ready for customer pickup at Paschim Sharira store' }
    ]
  }
];
