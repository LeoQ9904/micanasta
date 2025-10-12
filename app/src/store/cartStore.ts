"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../interfaces/product/Product";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    openCart: boolean;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productTitle: string) => void;
    updateQuantity: (productTitle: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getDiscount: () => number;
    toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            openCart: false,

            toggleCart: () => {
                set((state) => ({ openCart: !state.openCart }));
            },

            addItem: (product: Product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.product.name === product.name
                    );

                    useCartStore.getState().toggleCart();

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.product.name === product.name
                                    ? {
                                          ...item,
                                          quantity: item.quantity + quantity,
                                      }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { product, quantity }],
                    };
                });
            },

            removeItem: (productTitle: string) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.product.name !== productTitle
                    ),
                }));
            },

            updateQuantity: (productTitle: string, quantity: number) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.name === productTitle
                            ? { ...item, quantity }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                const { items } = get();
                return items.reduce((sum, item) => {
                    const discountedPrice =
                        item.product.price * (1 - item.product.discount / 100);
                    return sum + discountedPrice * item.quantity;
                }, 0);
            },

            getDiscount: () => {
                const { items } = get();
                return items.reduce((sum, item) => {
                    const discountAmount =
                        item.product.price *
                        (item.product.discount / 100) *
                        item.quantity;
                    return sum + discountAmount;
                }, 0);
            },
        }),
        {
            name: "cart-storage", // nombre de la clave en localStorage
        }
    )
);
