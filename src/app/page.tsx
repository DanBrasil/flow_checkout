"use client";

import { useState, useEffect } from "react";
import HomePage from "@/pages/HomePage";
import CardPage from "@/pages/card";
import ProductDetailsPage from "@/pages/product_details";
import { AuthForm } from "@/components/auth/AuthForm";
import { Loader2 } from "lucide-react";
import { Product } from "@/interfaces";

export const dynamic = "force-dynamic";

type Page = "home" | "card" | "product";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [cartItems, setCardItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage("home");
  };

  const goToCard = () => setCurrentPage("card");
  const goToHome = () => setCurrentPage("home");
  const goToProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage("product");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <AuthForm onSuccess={handleAuthSuccess} />;

  return (
    <>
      {currentPage === "home" && (
        <HomePage
          userName={user?.name}
          onLogout={handleLogout}
          goToCard={goToCard}
          goToProduct={goToProduct}
          cardItems={cartItems}
          setCardItems={setCardItems}
        />
      )}
      {currentPage === "card" && (
        <CardPage
          goBack={goToHome}
          cardItems={cartItems}
          setCardItems={setCardItems}
        />
      )}
      {currentPage === "product" && selectedProductId && (
        <ProductDetailsPage
          productId={selectedProductId}
          goBack={goToHome}
          onAddToCart={goToCard}
        />
      )}
    </>
  );
}
