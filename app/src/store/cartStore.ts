"use client";
import { create } from "zustand";
import { IProduct } from "../interfaces/product/Product";

export interface CartItem {
    product: IProduct;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    openCart: boolean;
    addItem: (product: IProduct, quantity?: number) => void;
    removeItem: (productTitle: string) => void;
    updateQuantity: (productTitle: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    toggleCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    openCart: false,

    toggleCart: () => {
        set((state) => ({ openCart: !state.openCart }));
    },

    addItem: (product: IProduct, quantity = 1) => {
        set((state) => {
            const existingItem = state.items.find(
                (item) => item.product.title === product.title
            );

            useCartStore.getState().toggleCart();

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
