"use client";
import { Search } from "@mui/icons-material";
import { Badge, Button, Drawer, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";
import PopoverMenuComponent from "./PopoverMenuComponent";
import CartIcon from "../../assets/icons/cart";
import UserIcon from "../../assets/icons/user";
import ContactIcon from "../../assets/icons/contact";
import { useScroll } from "../hooks/useScroll";
import { categories } from "@/app/data/data";
import Cart from "@/app/cart/components/cart";
import { notions } from "@/app/data/data";
import CloseButton from "./utils/close";
import { useCartStore } from "../../store/cartStore";
import CategoriesListComponent from "./CatagoriesListComponent";
import LoginModal from "./LoginModal";
export default function HeaderComponent() {
    const { scrollY } = useScroll();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const totalItemsCart = useCartStore((state) =>
        state.items.reduce((acc, item) => acc + item.quantity, 0)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % notions.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <header className="w-full flex justify-center items-center py-2 border-b border-gray-100 border-solid">
                <h6 className="font-black text-[#7e7e7e] transition-opacity duration-1000">
                    {notions[currentIndex].description}
                </h6>
            </header>
            <header
                className={
                    "bg-white w-full flex justify-between md:justify-center items-center py-4 border-b border-gray-100 border-solid px-4 " +
                    (scrollY > 150
                        ? " fixed top-0 left-0  z-50 duration-900 "
                        : " relative")
                }
            >
                <Image
                    src="/logo.svg"
                    alt="Mi Canasta"
                    width={120}
                    height={40}
                    className="cursor-pointer"
                    onClick={() => (window.location.href = "/")}
                />
                <div className="hidden md:flex gap-4 divide-x-1 divide-gray-300 items-center border-2 border-[var(--border-color)] rounded-md ml-8 px-2 py-1 w-1/2">
                    <select className="px-3 py-2 bg-transparent outline-none font-bold cursor-pointer">
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center flex-grow">
                        <input
                            type="text"
                            className="w-full px-4 py-2 outline-none bg-transparent"
                            placeholder="Buscar productos"
                        />
                        <IconButton className="">
                            <Search className="" />
                        </IconButton>
                    </div>
                </div>
                <nav className="ml-auto md:ml-auto text-[var(--primary)]">
                    <ul className="flex gap-2 md:gap-4">
                        <li
                            className="flex gap-1 items-center cursor-pointer"
                            onClick={() => useCartStore.getState().toggleCart()}
                        >
                            <Badge
                                badgeContent={totalItemsCart}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "var(--primary)",
                                        color: "white",
                                    },
                                }}
                            >
                                <CartIcon />
                            </Badge>
                            <a href="#" className="hidden md:block">
                                Canasta
                            </a>
                        </li>
                        <li
                            className="flex gap-1 items-center cursor-pointer"
                            onClick={() => setLoginModalOpen(true)}
                        >
                            <UserIcon />
                            <a href="#" className="hidden md:block">
                                Iniciar sesión
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            <header className="hidden md:flex w-full justify-center items-center py-2 px-4 border-b border-gray-100 border-solid">
                <nav className="w-full">
                    <ul className="flex gap-8 text-gray-600 font-bold">
                        <li>
                            <PopoverMenuComponent
                                Title="Categorías"
                                Children={<CategoriesListComponent />}
                            />
                        </li>
                        <li className="">
                            <Button
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "700",
                                    color: "#4b5563",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        color: "var(--primary)",
                                    },
                                    fontSize: "16px",
                                }}
                            >
                                Ofertas del día
                            </Button>
                        </li>
                        <li className="">
                            <Button
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "700",
                                    color: "#4b5563",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        color: "var(--primary)",
                                    },
                                    fontSize: "16px",
                                }}
                            >
                                Nuevos productos
                            </Button>
                        </li>
                    </ul>
                </nav>
                <div className="flex gap-2">
                    <ContactIcon />
                    <p className="flex flex-col text-2xl font-black text-[var(--primary)]">
                        316-729-5051
                        <span className="text-sm text-gray-400 font-bold">
                            24/7 Soporte
                        </span>
                    </p>
                </div>
            </header>
            <div className="md:hidden w-full px-4 py-2 border-b border-gray-100">
                <div className="flex gap-2 items-center border-2 border-[var(--border-color)] rounded-md px-2 py-1 mb-3">
                    <input
                        type="text"
                        className="w-full px-2 py-1 outline-none bg-transparent text-sm"
                        placeholder="Buscar productos"
                    />
                    <IconButton size="small">
                        <Search />
                    </IconButton>
                </div>
                <nav className="w-full">
                    <ul className="flex gap-4 text-gray-600 font-bold text-sm overflow-x-auto">
                        <li className="whitespace-nowrap">
                            <PopoverMenuComponent
                                Title="Categorías"
                                Children={<CategoriesListComponent />}
                            />
                        </li>
                        <li className="whitespace-nowrap">
                            <Button
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "700",
                                    color: "#4b5563",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        color: "var(--primary)",
                                    },
                                    fontSize: "14px",
                                    minWidth: "auto",
                                }}
                            >
                                Ofertas del día
                            </Button>
                        </li>
                        <li className="whitespace-nowrap">
                            <Button
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "700",
                                    color: "#4b5563",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        color: "var(--primary)",
                                    },
                                    fontSize: "14px",
                                    minWidth: "auto",
                                }}
                            >
                                Nuevos productos
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <Drawer
                anchor="right"
                open={useCartStore.getState().openCart}
                onClose={() => useCartStore.getState().toggleCart()}
                sx={{
                    "& .MuiDrawer-paper": {
                        marginTop: { xs: "0px", md: "16px" },
                        marginRight: { xs: "0px", md: "16px" },
                        height: { xs: "100vh", md: "calc(100vh - 10px)" },
                        borderRadius: { xs: "0px", md: "8px" },
                        width: { xs: "100vw", md: "450px" },
                    },
                }}
            >
                <CloseButton
                    onClick={() => useCartStore.getState().toggleCart()}
                />
                <Cart />
            </Drawer>
            <LoginModal
                open={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
        </>
    );
}
