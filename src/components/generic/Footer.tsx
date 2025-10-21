'use client'

import { Card, CardContent } from '@/components/ui/card'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Test Colmeia</h3>
            <p className="text-sm text-muted-foreground">
              Sua loja online com os melhores produtos e preços.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Produtos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Eletrônicos</li>
              <li>Acessórios</li>
              <li>Informática</li>
              <li>Smartphones</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Central de Ajuda</li>
              <li>Contato</li>
              <li>FAQ</li>
              <li>Política de Troca</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sobre Nós</li>
              <li>Carreiras</li>
              <li>Imprensa</li>
              <li>Investidores</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Test Colmeia. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Termos de Uso</span>
              <span className="text-sm text-muted-foreground">Privacidade</span>
              <span className="text-sm text-muted-foreground">Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
