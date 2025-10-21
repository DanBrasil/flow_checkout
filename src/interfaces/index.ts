export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
  stock: number
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  addedAt: Date
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message: string
  success: boolean
  timestamp: Date
}
