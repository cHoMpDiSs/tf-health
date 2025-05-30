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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  }
]; 