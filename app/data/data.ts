import { ICategory } from "../src/interfaces/product/Category";
import { IProduct } from "../src/interfaces/product/Product";

export interface cardNotas {
    description: string;
    subDescription?: string;
    img: string;
}

export interface INotions {
    description: string;
}

export const notions: INotions[] = [
    {
        description: "Productos 100% Frescos",
    },
    {
        description: "Envío gratis",
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
        title: "Manzanas Rojas",
        description: "Manzanas frescas y crujientes, perfectas para snacks.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-1.jpg?v=1656924060&width=1066",
        price: 8500,
        discount: 10,
        popular: true,
        categories: [
            { id: 2, name: "Frutas", description: "Frutas frescas" },
            { id: 4, name: "Orgánico", description: "Productos orgánicos" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-1.jpg?v=1656924060&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=1066",
        ],
    },
    {
        title: "Bananos",
        description: "Bananos dulces y maduros, ideales para batidos.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-14-1.jpg?v=1663044435&width=1066",
        price: 3200,
        discount: 5,
        popular: true,
        categories: [{ id: 2, name: "Frutas", description: "Frutas frescas" }],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-14-1.jpg?v=1663044435&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-14-2.jpg?v=1663044435&width=1066",
        ],
    },
    {
        title: "Zanahorias",
        description: "Zanahorias frescas, perfectas para ensaladas y snacks.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-4-1.jpg?v=1656924056&width=1066",
        price: 4500,
        discount: 15,
        popular: true,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-4-1.jpg?v=1656924056&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-4-2.jpg?v=1656924056&width=1066",
        ],
    },
    {
        title: "Brócoli",
        description: "Brócoli verde y saludable, ideal para cocinar al vapor.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-5-1.jpg?v=1656924057&width=1066",
        price: 6800,
        discount: 20,
        popular: true,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-5-1.jpg?v=1656924057&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-5-2.jpg?v=1656924057&width=1066",
        ],
    },
    {
        title: "Fresas",
        description: "Fresas dulces y jugosas, perfectas para postres.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-10-1.jpg?v=1656924061&width=1066",
        price: 12500,
        discount: 12,
        popular: true,
        categories: [
            { id: 2, name: "Frutas", description: "Frutas frescas" },
            {
                id: 5,
                name: "Frutos Rojos",
                description: "Frutos rojos deliciosos",
            },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-10-1.jpg?v=1656924061&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-10-2.jpg?v=1656924061&width=1066",
        ],
    },
    {
        title: "Espinacas",
        description:
            "Hojas de espinaca frescas, ideales para ensaladas y batidos.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-6-1.jpg?v=1656924058&width=1066",
        price: 7200,
        discount: 8,
        popular: true,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
            {
                id: 6,
                name: "Hojas Verdes",
                description: "Hojas verdes saludables",
            },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-6-1.jpg?v=1656924058&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-6-2.jpg?v=1656924058&width=1066",
        ],
    },
    {
        title: "Pepinos",
        description: "Pepinos crujientes, ideales para ensaladas y sándwiches.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-7-1.jpg?v=1656924059&width=1066",
        price: 4200,
        discount: 7,
        popular: true,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-7-1.jpg?v=1656924059&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-7-2.jpg?v=1656924059&width=1066",
        ],
    },
    {
        title: "Lechuga",
        description:
            "Hojas de lechuga crujientes, perfectas para ensaladas y wraps.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-8-1.jpg?v=1656924060&width=1066",
        price: 5800,
        discount: 6,
        popular: true,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
            {
                id: 6,
                name: "Hojas Verdes",
                description: "Hojas verdes saludables",
            },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-8-1.jpg?v=1656924060&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-8-2.jpg?v=1656924060&width=1066",
        ],
    },
    {
        title: "Mangos",
        description: "Mangos dulces y tropicales, perfectos para snacks.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-13-1.jpg?v=1663044435&width=1066",
        price: 4800,
        discount: 11,
        popular: true,
        categories: [
            { id: 2, name: "Frutas", description: "Frutas frescas" },
            { id: 7, name: "Tropical", description: "Frutas tropicales" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-13-1.jpg?v=1663044435&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-13-2.jpg?v=1663044435&width=1066",
        ],
    },
    {
        title: "Tomates",
        description: "Tomates maduros, ideales para ensaladas y salsas.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-3-1.jpg?v=1656924055&width=1066",
        price: 6200,
        discount: 13,
        popular: true,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-3-1.jpg?v=1656924055&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-3-2.jpg?v=1656924055&width=1066",
        ],
    },
    {
        title: "Papas",
        description: "Papas frescas, perfectas para asar y hacer puré.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-1.jpg?v=1656924054&width=1066",
        price: 3800,
        discount: 4,
        popular: true,
        categories: [
            { id: 8, name: "Tubérculos", description: "Tubérculos frescos" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-1.jpg?v=1656924054&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2.jpg?v=1656924054&width=1066",
        ],
    },
    {
        title: "Naranjas",
        description: "Naranjas jugosas, ideales para snacks y jugos.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
        price: 7500,
        discount: 3,
        popular: true,
        categories: [
            { id: 9, name: "Cítricos", description: "Frutas cítricas" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-2.jpg?v=1656924053&width=1066",
        ],
    },
    {
        title: "Aguacates",
        description:
            "Aguacates cremosos, perfectos para guacamole y ensaladas.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
        price: 9500,
        discount: 8,
        popular: true,
        categories: [
            { id: 2, name: "Frutas", description: "Frutas frescas" },
            { id: 4, name: "Orgánico", description: "Productos orgánicos" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-2.jpg?v=1656924053&width=1066",
        ],
    },
    {
        title: "Limones",
        description:
            "Limones ácidos y frescos, ideales para cocinar y bebidas.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
        price: 4500,
        discount: 5,
        popular: true,
        categories: [
            { id: 9, name: "Cítricos", description: "Frutas cítricas" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-2.jpg?v=1656924053&width=1066",
        ],
    },
    {
        title: "Pimentones",
        description: "Pimentones coloridos, perfectos para ensaladas y guisos.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
        price: 8200,
        discount: 12,
        popular: true,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-2.jpg?v=1656924053&width=1066",
        ],
    },
    {
        title: "Cebollas",
        description: "Cebollas frescas, esenciales para la cocina colombiana.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
        price: 3500,
        discount: 6,
        popular: false,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-2.jpg?v=1656924053&width=1066",
        ],
    },
    {
        title: "Apio",
        description: "Apio fresco y crujiente, ideal para sopas y jugos.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
        price: 5200,
        discount: 9,
        popular: false,
        categories: [
            { id: 3, name: "Verduras", description: "Verduras frescas" },
            {
                id: 6,
                name: "Hojas Verdes",
                description: "Hojas verdes saludables",
            },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-2.jpg?v=1656924053&width=1066",
        ],
    },
    {
        title: "Piña",
        description: "Piña dulce y tropical, perfecta para postres y jugos.",
        image: "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
        price: 12000,
        discount: 15,
        popular: false,
        categories: [
            { id: 2, name: "Frutas", description: "Frutas frescas" },
            { id: 7, name: "Tropical", description: "Frutas tropicales" },
        ],
        images: [
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-1.jpg?v=1656924053&width=1066",
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-1-2.jpg?v=1656924053&width=1066",
        ],
    },
];

export const categories: ICategory[] = [
    { id: 1, name: "Todas", description: "Todos los productos" },
    { id: 2, name: "Frutas", description: "Frutas frescas" },
    { id: 3, name: "Verduras", description: "Verduras frescas" },
    { id: 4, name: "Orgánico", description: "Productos orgánicos" },
    { id: 5, name: "Frutos Rojos", description: "Frutos rojos frescos" },
    { id: 6, name: "Hojas Verdes", description: "Hojas verdes saludables" },
    { id: 7, name: "Tropical", description: "Frutas tropicales" },
    { id: 8, name: "Tubérculos", description: "Tubérculos frescos" },
    { id: 9, name: "Cítricos", description: "Frutas cítricas" },
];
export const cardNotas: cardNotas[] = [
    {
        description: "Everyday Fresh & Clean with Our Products",
        img: "https://boostify-nesst.myshopify.com/cdn/shop/files/banner-1.png?crop=center&height=631&v=1659435495&width=1076",
    },
    {
        description: "Make your breakfast Healthy and Easy",
        img: "https://boostify-nesst.myshopify.com/cdn/shop/files/banner-2.png?crop=center&height=631&v=1659491181&width=1076",
    },
    {
        description: "The best Organic Products Online",
        img: "https://boostify-nesst.myshopify.com/cdn/shop/files/banner-3.png?crop=center&height=631&v=1659491181&width=1076",
    },
];

export const cardFooter: cardNotas[] = [
    {
        description: "Los mejores precios y ofertas",
        subDescription: "Aprovecha nuestras promociones exclusivas",
        img: "/off.svg",
    },
    {
        description: "Devoluciones fáciles",
        subDescription: "Política de devolución sin complicaciones",
        img: "/icon-box-5.svg",
    },
    {
        description: "Pago seguro",
        subDescription: "Tus datos están protegidos con nosotros",
        img: "/icon-box-2.svg",
    },
    {
        description: "Amplio surtido",
        subDescription: "Encuentra todo lo que necesitas en un solo lugar",
        img: "/icon-box-4.svg",
    },
];
