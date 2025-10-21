'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/interfaces'
import { apiService } from '@/services'
import { ProductCard, Footer, LoadingSpinner } from '@/components/generic'
import { SimpleHeader } from '@/components/generic/SimpleHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Star, TrendingUp } from 'lucide-react'

interface HomePageProps {
  userName?: string
  onLogout?: () => void
}

const HomePage = ({ userName, onLogout }: HomePageProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItemsCount, setCartItemsCount] = useState(3)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const response = await apiService.getProducts()
        setProducts(response.data)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddToCart = (product: Product) => {
    console.log('Adicionando ao carrinho:', product.name)
    setCartItemsCount(prev => prev + 1)
  }

  const handleViewDetails = (product: Product) => {
    console.log('Visualizando detalhes:', product.name)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const stats = [
    { label: 'Produtos', value: products.length, icon: ShoppingCart },
    { label: 'Categorias', value: new Set(products.map(p => p.category)).size, icon: Star },
    { label: 'Em Estoque', value: products.filter(p => p.inStock).length, icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader 
        cartItemsCount={cartItemsCount}
        onSearch={handleSearch}
        onCartClick={() => console.log('Carrinho clicado')}
        onLogout={onLogout}
        userName={userName}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Bem-vindo ao Test Colmeia
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra os melhores produtos com qualidade garantida e preços competitivos
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-2">
                  <stat.icon className="h-8 w-8 mx-auto text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
              <Badge variant="outline" className="text-sm">
                {filteredProducts.length} produtos encontrados
              </Badge>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado para &quot;{searchQuery}&quot;
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery('')}
                >
                  Limpar busca
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
