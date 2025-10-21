'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulação de API - em produção, fazer chamada real
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Validação simples para demonstração
      if (email === 'admin@test.com' && password === '123456') {
        const userData: User = {
          id: '1',
          email,
          name: 'Admin User'
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      }
      
      // Para outros emails, criar usuário automaticamente
      const userData: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0]
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  }

  const register = async (name: string, email: string): Promise<boolean> => {
    try {
      // Simulação de API - em produção, fazer chamada real
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData: User = {
        id: Date.now().toString(),
        email,
        name
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    } catch (error) {
      console.error('Erro no cadastro:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
