import { User, Product, Cart, ApiResponse, PaginatedResponse } from '@/interfaces'
import { mockUsers, mockProducts, mockCart } from './mockData'
import { sleep } from '@/utils'

class ApiService {
  private async simulateDelay(): Promise<void> {
    await sleep(Math.random() * 500 + 200)
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    await this.simulateDelay()
    return {
      data: mockUsers,
      message: 'Users retrieved successfully',
      success: true,
      timestamp: new Date(),
    }
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    await this.simulateDelay()
    const user = mockUsers.find(u => u.id === id)
    
    if (!user) {
      throw new Error('User not found')
    }

    return {
      data: user,
      message: 'User retrieved successfully',
      success: true,
      timestamp: new Date(),
    }
  }

  async getProducts(): Promise<ApiResponse<Product[]>> {
    await this.simulateDelay()
    return {
      data: mockProducts,
      message: 'Products retrieved successfully',
      success: true,
      timestamp: new Date(),
    }
  }

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    await this.simulateDelay()
    const product = mockProducts.find(p => p.id === id)
    
    if (!product) {
      throw new Error('Product not found')
    }

    return {
      data: product,
      message: 'Product retrieved successfully',
      success: true,
      timestamp: new Date(),
    }
  }

  async getCart(userId: string): Promise<ApiResponse<Cart>> {
    await this.simulateDelay()
    
    if (mockCart.userId !== userId) {
      throw new Error('Cart not found for this user')
    }

    return {
      data: mockCart,
      message: 'Cart retrieved successfully',
      success: true,
      timestamp: new Date(),
    }
  }

  async getProductsPaginated(page = 1, limit = 10): Promise<PaginatedResponse<Product>> {
    await this.simulateDelay()
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = mockProducts.slice(startIndex, endIndex)
    
    return {
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: mockProducts.length,
        totalPages: Math.ceil(mockProducts.length / limit),
      },
      message: 'Products retrieved successfully',
      success: true,
      timestamp: new Date(),
    }
  }
}

export const apiService = new ApiService()
