import { User, Product, Cart, CartItem } from '@/interfaces'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@teste.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'admin',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@teste.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    role: 'user',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Galaxy S24',
    description: 'Smartphone Android com tela de 6.2" e câmera de 50MP',
    price: 2999.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Eletrônicos',
    inStock: true,
    stock: 15,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'Notebook Dell Inspiron',
    description: 'Notebook com processador Intel i7 e 16GB de RAM',
    price: 4599.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    category: 'Eletrônicos',
    inStock: true,
    stock: 8,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '3',
    name: 'Fone de Ouvido Bluetooth',
    description: 'Fone sem fio com cancelamento de ruído',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Acessórios',
    inStock: true,
    stock: 25,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '4',
    name: 'Smartwatch Apple Watch',
    description: 'Relógio inteligente com GPS e monitor de saúde',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    category: 'Eletrônicos',
    inStock: false,
    stock: 0,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
]

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    productId: '1',
    product: mockProducts[0],
    quantity: 1,
    addedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    productId: '3',
    product: mockProducts[2],
    quantity: 2,
    addedAt: new Date('2024-01-20'),
  },
]

export const mockCart: Cart = {
  id: '1',
  userId: '2',
  items: mockCartItems,
  total: 3599.97,
  createdAt: new Date('2024-01-20'),
  updatedAt: new Date('2024-01-20'),
}
