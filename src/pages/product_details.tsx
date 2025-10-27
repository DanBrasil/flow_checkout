"use client";

import { useState, useEffect } from "react";
import { apiService } from "@/services";
import { Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductDetailsPageProps {
  productId: string;
  goBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailsPage = ({
  productId,
  goBack,
  onAddToCart,
}: ProductDetailsPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button className="mb-6" onClick={goBack}>
        Voltar
      </Button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagem do produto */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full md:w-96 h-auto object-cover rounded-lg shadow"
          />
        </div>

        {/* Detalhes do produto */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">Categoria: {product.category}</p>
            <p className="font-semibold">
              Em estoque: {product.inStock ? "Sim" : "Não"}
            </p>
            <p className="font-bold text-xl">R$ {product.price.toFixed(2)}</p>
          </div>

          <Button
            className="mt-4 w-full md:w-1/2"
            onClick={() => onAddToCart(product)}
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
