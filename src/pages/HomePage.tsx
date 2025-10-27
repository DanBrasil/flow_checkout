"use client";

import { useState, useRef, useEffect } from "react";
import { Product } from "@/interfaces";
import { apiService } from "@/services";
import { ProductCard, Footer, LoadingSpinner } from "@/components/generic";
import { SimpleHeader } from "@/components/generic/SimpleHeader";
import { motion, AnimatePresence } from "framer-motion";

interface FlyingProduct extends Product {
  startX: number;
  startY: number;
}

interface HomePageProps {
  userName?: string;
  onLogout: () => void;
  goToCard: () => void;
  goToProduct: (id: string) => void;
  cardItems: Product[];
  setCardItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const HomePage = ({
  userName,
  onLogout,
  goToCard,
  goToProduct,
  cardItems,
  setCardItems,
}: HomePageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [flyingItems, setFlyingItems] = useState<FlyingProduct[]>([]);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (event: React.MouseEvent, product: Product) => {
    const { clientX, clientY } = event;
    setFlyingItems((prev) => [
      ...prev,
      { ...product, startX: clientX, startY: clientY },
    ]);

    setTimeout(() => {
      setCardItems((prev) => [...prev, product]);
      setFlyingItems((prev) => prev.filter((p) => p.id !== product.id));
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SimpleHeader
        cartItemsCount={cardItems.length}
        onSearch={setSearchQuery}
        goToCard={goToCard}
        onLogout={onLogout}
        userName={userName}
        cartRef={cartRef}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(e) => handleAddToCart(e, product)}
              goToProduct={() => goToProduct(product.id)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {flyingItems.map((product) => (
          <motion.img
            key={product.id}
            src={product.image}
            initial={{
              top: product.startY,
              left: product.startX,
              scale: 1,
              position: "fixed",
              pointerEvents: "none",
              width: 64,
              height: 64,
            }}
            animate={{
              top: cartRef.current?.getBoundingClientRect().y || 0,
              left: cartRef.current?.getBoundingClientRect().x || 0,
              scale: 0.2,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="rounded-full z-50 pointer-events-none"
          />
        ))}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default HomePage;
