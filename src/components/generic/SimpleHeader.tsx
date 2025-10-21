'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Search, LogOut } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SimpleHeaderProps {
  cartItemsCount?: number
  onCartClick?: () => void
  onSearch?: (query: string) => void
  onLogout?: () => void
  userName?: string
}

export const SimpleHeader = ({ 
  cartItemsCount = 0, 
  onCartClick, 
  onSearch,
  onLogout,
  userName
}: SimpleHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">
              Test Colmeia
            </h1>
          </div>
          
          <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {userName && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Olá, {userName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair
                </Button>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
