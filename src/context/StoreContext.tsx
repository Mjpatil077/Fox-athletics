"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";
import confetti from "canvas-confetti";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string; image: string };
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, size: string, color?: { name: string; hex: string; image: string }, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateCartQuantity: (productId: string, size: string, colorName: string, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  clearCart: () => void;
  orderCount: number;
  incrementOrderCount: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderCount, setOrderCount] = useState(0);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("fox_cart");
    const savedWishlist = localStorage.getItem("fox_wishlist");
    if (savedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart local storage", e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist local storage", e);
      }
    }
    
    const savedOrderCount = localStorage.getItem("fox_order_count");
    if (savedOrderCount) {
      try {
        setOrderCount(parseInt(savedOrderCount, 10));
      } catch (e) {
        console.error("Failed to parse order count", e);
      }
    }
  }, []);

  // Save to localStorage when state changes
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("fox_cart", JSON.stringify(newCart));
  };

  const saveWishlistToStorage = (newWishlist: Product[]) => {
    setWishlist(newWishlist);
    localStorage.setItem("fox_wishlist", JSON.stringify(newWishlist));
  };

  const addToCart = (
    product: Product,
    size: string,
    color?: { name: string; hex: string; image: string },
    quantity = 1,
    openDrawer = true
  ) => {
    const activeColor = color || product.colors[0];
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor.name === activeColor.name
    );

    const newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        product,
        quantity,
        selectedSize: size,
        selectedColor: activeColor,
      });
    }
    saveCartToStorage(newCart);
    if (openDrawer) {
      setIsCartOpen(true); // Open drawer automatically
    }
  };

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    const newCart = cart.filter(
      (item) =>
        !(
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName
        )
    );
    saveCartToStorage(newCart);
  };

  const updateCartQuantity = (
    productId: string,
    size: string,
    colorName: string,
    qty: number
  ) => {
    if (qty <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }
    const newCart = cart.map((item) => {
      if (
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === colorName
      ) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    saveCartToStorage(newCart);
  };

  const toggleWishlist = (product: Product) => {
    const isExist = wishlist.some((item) => item.id === product.id);
    let newWishlist = [];
    if (isExist) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      newWishlist = [...wishlist, product];
    }
    saveWishlistToStorage(newWishlist);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const incrementOrderCount = () => {
    const newCount = orderCount + 1;
    setOrderCount(newCount);
    localStorage.setItem("fox_order_count", newCount.toString());
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        clearCart,
        orderCount,
        incrementOrderCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
