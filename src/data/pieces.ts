export type Piece = {
  id: string
  title: string
  description: string
  image_url: string
  category: 'art' | 'bowl' | 'cup' | 'set' | 'process'
  price?: number
  stock?: number
}

const pieces: Piece[] = [
  {
    id: 'art-01',
    title: 'Sculptural Form I',
    description: 'Stoneware, food-safe glaze',
    image_url: '/assets/pottery/art-01.jpg',
    category: 'art',
    price: 185,
    stock: 1,
  },
  {
    id: 'art-02',
    title: 'Sculptural Form II',
    description: 'Stoneware, food-safe glaze',
    image_url: '/assets/pottery/art-02.jpg',
    category: 'art',
    price: 195,
    stock: 1,
  },
  {
    id: 'art-03',
    title: 'Sculptural Form III',
    description: 'Stoneware, food-safe glaze',
    image_url: '/assets/pottery/art-03.jpg',
    category: 'art',
    price: 175,
    stock: 2,
  },
  {
    id: 'bowl-01',
    title: 'Wheel-thrown Bowl',
    description: 'Porcelain, celadon glaze',
    image_url: '/assets/pottery/bowl-01.jpg',
    category: 'bowl',
    price: 65,
    stock: 4,
  },
  {
    id: 'cup-01',
    title: 'Cup I',
    description: 'Stoneware, ash glaze',
    image_url: '/assets/pottery/cup-01.jpg',
    category: 'cup',
    price: 45,
    stock: 6,
  },
  {
    id: 'cup-02',
    title: 'Cup II',
    description: 'Stoneware, ash glaze',
    image_url: '/assets/pottery/cup-02.jpg',
    category: 'cup',
    price: 45,
    stock: 5,
  },
  {
    id: 'cup-03',
    title: 'Cup III',
    description: 'Stoneware, ash glaze',
    image_url: '/assets/pottery/cup-03.jpg',
    category: 'cup',
    price: 48,
    stock: 0,
  },
  {
    id: 'set-01',
    title: 'Tableware Set I',
    description: 'Porcelain, food-safe glaze',
    image_url: '/assets/pottery/set-01.jpg',
    category: 'set',
    price: 120,
    stock: 3,
  },
  {
    id: 'set-02',
    title: 'Tableware Set II',
    description: 'Porcelain, food-safe glaze',
    image_url: '/assets/pottery/set-02.jpg',
    category: 'set',
    price: 135,
    stock: 2,
  },
  {
    id: 'process-01',
    title: 'Studio Process I',
    description: 'Behind the scenes',
    image_url: '/assets/pottery/process-01.jpg',
    category: 'process',
  },
  {
    id: 'process-02',
    title: 'Studio Process II',
    description: 'Behind the scenes',
    image_url: '/assets/pottery/process-02.jpg',
    category: 'process',
  },
  {
    id: 'process-03',
    title: 'Studio Process III',
    description: 'Behind the scenes',
    image_url: '/assets/pottery/process-03.jpg',
    category: 'process',
  },
]

export default pieces
