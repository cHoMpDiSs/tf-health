export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  bestSeller: boolean;
  details: {
    benefits: string[];
    ingredients: string;
    dosage: string;
    size: string;
  };
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Multivitamin',
    description: 'Complete daily nutrition with essential vitamins and minerals.',
    price: 29.99,
    category: 'vitamins',
    image: '/products/multivitamin.jpg',
    bestSeller: true,
    details: {
      benefits: [
        'Supports overall health and wellness',
        'Contains essential vitamins and minerals',
        'Promotes immune system function',
        'Enhances energy levels'
      ],
      ingredients: 'Vitamin A, Vitamin C, Vitamin D, Vitamin E, B-Complex Vitamins, Zinc, Magnesium, Calcium',
      dosage: 'Take 1 capsule daily with food',
      size: '60 capsules'
    },
    imageUrl: "https://www.naturemade.com/cdn/shop/products/NM2518L601MULTIfront_8c130ce0-6c6d-4469-b1f8-f0e254f842a9_750x.png?v=1644459005"
  },
  {
    id: 2,
    name: 'Whey Protein Isolate',
    description: 'High-quality protein for muscle recovery and growth.',
    price: 49.99,
    category: 'proteins',
    image: '/products/protein.jpg',
    bestSeller: true,
    details: {
      benefits: [
        'Supports muscle recovery and growth',
        'High protein content per serving',
        'Low in lactose',
        'Fast-absorbing formula'
      ],
      ingredients: 'Whey Protein Isolate, Natural Flavors, Stevia',
      dosage: 'Mix 1 scoop with 8-10 oz of water or milk',
      size: '2 lbs (908g)'
    },
    imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTT6_0vj62oXgf5v3Xxed3Jdwo0GsAZb7Z4IMt6S5UeINP4WFwKuMQg46ZG_nuo6TEzFmdspyhIA6PqLYe5e1HzLdp8riK4LoQgJrkQ_VkObLn7AkIYAMQCD4M2y6jfvp7OVf5KU3e-OQ&usqp=CAc"
  },
  {
    id: 3,
    name: 'Magnesium Complex',
    description: 'Essential mineral for nerve and muscle function.',
    price: 19.99,
    category: 'minerals',
    image: '/products/magnesium.jpg',
    bestSeller: false,
    details: {
      benefits: [
        'Supports nerve and muscle function',
        'Promotes healthy sleep',
        'Aids in energy production',
        'Supports bone health'
      ],
      ingredients: 'Magnesium Citrate, Magnesium Glycinate, Magnesium Malate',
      dosage: 'Take 2 capsules daily with food',
      size: '120 capsules'
    },
    imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQndoBKhjygYDW_phjinUoR1rQuvyxO7PV3AnN8qftS0JeL1gmMDjkAMajdb_dlLbyXYIRw-lDFyO-UdHk9QE1tPFWE1zsiW1ZevBphCcHKavLcXGMS83Wy5fSGtqz-IbEk-tda&usqp=CAc"
  },
  {
    id: 4,
    name: 'Echinacea Extract',
    description: 'Natural immune system support.',
    price: 24.99,
    category: 'herbs',
    image: '/products/echinacea.jpg',
    bestSeller: false,
    details: {
      benefits: [
        'Supports immune system function',
        'Made from organic echinacea',
        'Contains natural antioxidants',
        'Traditional herbal supplement'
      ],
      ingredients: 'Organic Echinacea Purpurea Extract',
      dosage: 'Take 1 ml 2-3 times daily',
      size: '2 fl oz (60ml)'
    },
    imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcaXiV6W_1lnLpq53Oeo0a-5UUnNBFROR7ChCfZYkbylA5-bnPnrxLHrBXUYkt5_M2hZgmF0aCnxjaCsBlhFWr-gi53U0ipxZCAZCLlM79Tg251f7qD__ZYcusEA435KbP9obglGDefg&usqp=CAc"
  },
  {
    id: 5,
    name: 'Omega-3 Fish Oil',
    description: 'High-potency EPA & DHA for heart and brain health.',
    price: 34.99,
    category: 'vitamins',
    image: '/products/fish-oil.jpg',
    bestSeller: true,
    details: {
      benefits: [
        'Supports cardiovascular health',
        'Promotes brain function',
        'Reduces inflammation',
        'Supports eye health'
      ],
      ingredients: 'Fish Oil Concentrate, EPA, DHA, Vitamin E',
      dosage: 'Take 2 softgels daily with meals',
      size: '90 softgels'
    },
    imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSIGizCeHieq3u9ao5ohyjia4A33shiGZH1TQc97D5xBI2LzmRU-18c3lwkZVfSiK4beFp10JYYUxtPkXiw2cmE1tlWrGVQxyfxvY5GMaIi7THgfWcTThn1D7g&usqp=CAc"
  },
  {
    id: 6,
    name: 'Collagen Peptides',
    description: 'Support for skin, hair, nails, and joints.',
    price: 39.99,
    category: 'proteins',
    image: '/products/collagen.jpg',
    bestSeller: true,
    details: {
      benefits: [
        'Promotes skin elasticity',
        'Supports joint health',
        'Strengthens hair and nails',
        'Unflavored and easy to mix'
      ],
      ingredients: 'Hydrolyzed Bovine Collagen Peptides',
      dosage: 'Mix 1-2 scoops with your favorite beverage',
      size: '16 oz (454g)'
    },
    imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ7ols6UadGaF-aNW9he8C8yyq7xZ1qUDvaqSnTpXg-2TlAj7yKPoYS-m3ctCWDaJ9D_BaCybgBY-nSjv1Jl914iXSnmewUEVmKtXp2yTyz3PfNO8KCdOVAjamMshre6i_ZSMKc-RU&usqp=CAc"
  },
  {
    id: 7,
    name: 'Probiotic Complex',
    description: 'Support for digestive and immune health.',
    price: 29.99,
    category: 'digestive-health',
    image: '/products/probiotic.jpg',
    bestSeller: false,
    details: {
      benefits: [
        'Supports digestive health',
        'Boosts immune function',
        'Promotes nutrient absorption',
        'Shelf-stable formula'
      ],
      ingredients: 'Multiple Probiotic Strains, Prebiotic Fiber',
      dosage: 'Take 1 capsule daily with food',
      size: '30 capsules'
    },
    imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTwXKMKKnja-KSKe1_cjnLsPHmjXr6ENjF2CDYpKeXoVQZ7Q2UcJjb-HtKPSxIFS9vGHCoc99tyKOElgEIk_YD0STbP2_jGXD8wVODs_aOlZGywfpkEIcTv_M8JtWXrmvGVZ_sJfVDsHA&usqp=CAc"
  },
  {
    id: 8,
    name: 'Creatine Monohydrate',
    description: 'Pure creatine for strength and performance.',
    price: 24.99,
    category: 'performance',
    image: '/products/creatine.jpg',
    bestSeller: true,
    details: {
      benefits: [
        'Increases strength and power',
        'Supports muscle growth',
        'Enhances exercise performance',
        'Pure and micronized formula'
      ],
      ingredients: 'Micronized Creatine Monohydrate',
      dosage: 'Take 5g daily with water',
      size: '500g powder'
    },
    imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQDKhUYyj7uNwLpPaT3DJVHEqhorbD0rQ9dEIzgK-I4FAAKsQB6Z_cWaQy9fSqyr-afRHX2wNB7sJsHAaElgyj7B0-nlYw-QdrF43rk2hX5hNcEsNdXcY-5pS2JsujTjZCxWDCZdEU&usqp=CAc"
  },
  {
    id: 9,
    name: 'Vitamin D3 + K2',
    description: 'Optimal calcium absorption and bone health.',
    price: 22.99,
    category: 'vitamins',
    image: '/products/vitamin-d.jpg',
    bestSeller: false,
    details: {
      benefits: [
        'Supports bone health',
        'Promotes calcium absorption',
        'Supports immune function',
        'Helps maintain heart health'
      ],
      ingredients: 'Vitamin D3 (Cholecalciferol), Vitamin K2 (MK-7)',
      dosage: 'Take 1 capsule daily with food',
      size: '60 capsules'
    },
    imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSsN2XlhWYkrKKRyr8r_CsVo5XCLhEYpFT026Vy6hO73wVQPNio9X3VRvmQGz_ppuUoDpRRwX6LHLXCfPyjJJ2hNI6GA4DIMa7c1L7NO5-DknOtsj5aH330s0wo4jV58J9hLxPxDhY&usqp=CAc"
  },
  {
    id: 10,
    name: 'Pre-Workout Energy',
    description: 'Clean energy and focus for your workouts.',
    price: 44.99,
    category: 'performance',
    image: '/products/pre-workout.jpg',
    bestSeller: false,
    details: {
      benefits: [
        'Increases energy and focus',
        'Enhances workout performance',
        'Promotes blood flow',
        'Sugar-free formula'
      ],
      ingredients: 'L-Citrulline, Beta-Alanine, Caffeine, B-Vitamins',
      dosage: 'Mix 1 scoop with 8-10 oz water 30 minutes before workout',
      size: '300g powder'
    },
    imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQj3XrugiuM5RJCtN_vcHwgKkjSdIEUDBWtbb1GJlAwbDjSSR_4Ip27CX1oM8Sts-z2X-tOZhBRlLrOqn5CW4n6p-u76KGjGYG1f4oNqJS1sFaeykZlwn49TIY-7BRxqMcTd63b3sE&usqp=CAc"
  }
]; 