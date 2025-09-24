"use client";
import { create } from "zustand";
import { IProduct } from "../interfaces/product/Product";

export interface CartItem {
    product: IProduct;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: IProduct, quantity?: number) => void;
    removeItem: (productTitle: string) => void;
    updateQuantity: (productTitle: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addItem: (product: IProduct, quantity = 1) => {
        set((state) => {
            const existingItem = state.items.find(
                (item) => item.product.title === product.title
            );

            if (existingItem) {
                return {
                    items: state.items.map((item) =>
                        item.product.title === product.title
                            ? { ...item, quantity: item.quantity + quantity }
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
                (item) => item.product.title !== productTitle
            ),
        }));
    },

    updateQuantity: (productTitle: string, quantity: number) => {
        set((state) => ({
            items: state.items.map((item) =>
                item.product.title === productTitle
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
}));
