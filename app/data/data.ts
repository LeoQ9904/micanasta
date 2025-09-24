import { ICategory } from "../src/interfaces/product/Category";
import { IProduct } from "../src/interfaces/product/Product";

export interface cardNotas {
    description: string;
    bg: string;
}

export interface INotions {
    description: string;
}

export const notions: INotions[] = [
    {
        description: "Productos 100% Frescos",
    },
    {
        description: "Envío gratis en compras mayores a $50.000 COP",
    },
    {
        description: "Productos orgánicos certificados",
    },
    {
        description: "Entrega el mismo día",
    },
];

export const productos: IProduct[] = [
    {
        title: "Fresh Apples",
        description: "Crisp and juicy apples, perfect for snacking.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-1.jpg?v=1656924060&width=1066",
        price: 3.99,
        discount: 10,
        categories: [
            { id: 2, name: "Fruits", description: "Fresh fruits" },
            { id: 4, name: "Organic", description: "Organic products" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-1.jpg?v=1656924060&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=1066",
        ],
    },
    {
        title: "Bananas",
        description: "Sweet and ripe bananas, great for smoothies.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-14-1.jpg?v=1663044435&width=1066",
        price: 1.29,
        discount: 5,
        categories: [
            { id: 2, name: "Fruits", description: "Fresh fruits" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-14-1.jpg?v=1663044435&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-14-2.jpg?v=1663044435&width=1066",
        ],
    },
    {
        title: "Carrots",
        description: "Fresh carrots, perfect for salads and snacks.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-4-1.jpg?v=1656924056&width=1066",
        price: 2.49,
        discount: 15,
        categories: [{ id: 3, name: "Vegetables", description: "Fresh vegetables" }],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-4-1.jpg?v=1656924056&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-4-2.jpg?v=1656924056&width=1066",
        ],
    },
    {
        title: "Broccoli",
        description: "Healthy and green broccoli, great for steaming.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-5-1.jpg?v=1656924057&width=1066",
        price: 2.99,
        discount: 20,
        categories: [{ id: 3, name: "Vegetables", description: "Fresh vegetables" }],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-5-1.jpg?v=1656924057&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-5-2.jpg?v=1656924057&width=1066",
        ],
    },
    {
        title: "Strawberries",
        description: "Sweet and juicy strawberries, perfect for desserts.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-10-1.jpg?v=1656924061&width=1066",
        price: 4.99,
        discount: 12,
        categories: [
            { id: 2, name: "Fruits", description: "Fresh fruits" },
            { id: 5, name: "Berries", description: "Delicious berries" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-10-1.jpg?v=1656924061&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-10-2.jpg?v=1656924061&width=1066",
        ],
    },
    {
        title: "Spinach",
        description: "Fresh spinach leaves, great for salads and smoothies.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-6-1.jpg?v=1656924058&width=1066",
        price: 3.49,
        discount: 8,
        categories: [
            { id: 3, name: "Vegetables", description: "Fresh vegetables" },
            { id: 6, name: "Leafy Greens", description: "Healthy leafy greens" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-6-1.jpg?v=1656924058&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-6-2.jpg?v=1656924058&width=1066",
        ],
    },
    {
        title: "Cucumbers",
        description: "Crisp cucumbers, great for salads and sandwiches.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-7-1.jpg?v=1656924059&width=1066",
        price: 1.99,
        discount: 7,
        categories: [{ id: 3, name: "Vegetables", description: "Fresh vegetables" }],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-7-1.jpg?v=1656924059&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-7-2.jpg?v=1656924059&width=1066",
        ],
    },
    {
        title: "Lettuce",
        description: "Crisp lettuce leaves, great for salads and wraps.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-8-1.jpg?v=1656924060&width=1066",
        price: 2.29,
        discount: 6,
        categories: [
            { id: 3, name: "Vegetables", description: "Fresh vegetables" },
            { id: 6, name: "Leafy Greens", description: "Healthy leafy greens" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-8-1.jpg?v=1656924060&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-8-2.jpg?v=1656924060&width=1066",
        ],
    },
    {
        title: "Mangoes",
        description: "Sweet and tropical mangoes, perfect for snacking.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-13-1.jpg?v=1663044435&width=1066",
        price: 1.99,
        discount: 11,
        categories: [
            { id: 2, name: "Fruits", description: "Fresh fruits" },
            { id: 7, name: "Tropical", description: "Tropical fruits" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-13-1.jpg?v=1663044435&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-13-2.jpg?v=1663044435&width=1066",
        ],
    },
    {
        title: "Tomatoes",
        description: "Ripe tomatoes, great for salads and sauces.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-3-1.jpg?v=1656924055&width=1066",
        price: 2.79,
        discount: 13,
        categories: [{ id: 3, name: "Vegetables", description: "Fresh vegetables" }],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-3-1.jpg?v=1656924055&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-3-2.jpg?v=1656924055&width=1066",
        ],
    },
    {
        title: "Potatoes",
        description: "Fresh potatoes, perfect for roasting and mashing.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-1.jpg?v=1656924054&width=1066",
        price: 2.59,
        discount: 4,
        categories: [{ id: 8, name: "Root Vegetables", description: "Root vegetables" }],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-1.jpg?v=1656924054&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2.jpg?v=1656924054&width=1066",
        ],
    },
    {
        title: "Oranges",
        description: "Juicy oranges, great for snacking and juicing.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
        price: 3.29,
        discount: 3,
        categories: [{ id: 9, name: "Citrus", description: "Citrus fruits" }],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-2.jpg?v=1656924053&width=1066",
        ],
    },
];

export const categories: ICategory[] = [
    { id: 1, name: "Todas", description: "All products" },
    { id: 2, name: "Fruits", description: "Fresh fruits" },
    { id: 3, name: "Vegetables", description: "Fresh vegetables" },
    { id: 4, name: "Organic", description: "Organic products" },
    { id: 5, name: "Berries", description: "Fresh berries" },
    { id: 6, name: "Leafy Greens", description: "Leafy green vegetables" },
    { id: 7, name: "Tropical", description: "Tropical fruits" },
    { id: 8, name: "Root Vegetables", description: "Root vegetables" },
    { id: 9, name: "Citrus", description: "Citrus fruits" },
];

export const cardNotas: cardNotas[] = [
    {
        description: "Everyday Fresh & Clean with Our Products",
        bg: "https://boostify-nesst.myshopify.com/cdn/shop/files/banner-1.png?crop=center&height=631&v=1659435495&width=1076",
    },
    {
        description: "Make your breakfast Healthy and Easy",
        bg: "https://boostify-nesst.myshopify.com/cdn/shop/files/banner-2.png?crop=center&height=631&v=1659491181&width=1076",
    },
    {
        description: "The best Organic Products Online",
        bg: "https://boostify-nesst.myshopify.com/cdn/shop/files/banner-3.png?crop=center&height=631&v=1659491181&width=1076",
    },
];
