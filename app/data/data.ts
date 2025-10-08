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
