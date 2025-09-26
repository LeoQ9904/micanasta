"use client";
import Quantity from "@/app/src/common/components/utils/quantity";
import { useCartStore } from "../../src/store/cartStore";
import { calculateDiscountedPrice } from "@/app/src/common/hooks/useCalculateDiscounted";
import { Button } from "@mui/material";
import { ShoppingCart, WhatsApp } from "@mui/icons-material";

export default function Cart() {
    const { items, getTotal, updateQuantity, removeItem } = useCartStore();
    const total = getTotal();

    return (
        <div className="py-4 md:py-10 px-4 md:px-6 flex flex-col justify-between h-full">
            <h2 className="text-2xl md:text-4xl font-bold">Tu canasta</h2>
            <div className="flex flex-col divide-y-1 divide-gray-300 gap-4 mt-6 h-full overflow-y-auto">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 md:gap-4 py-2">
                        <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex flex-col flex-1 gap-2 md:gap-3">
                            <h3 className="font-semibold text-sm md:text-xl leading-tight">
                                {item.product.title}
                            </h3>
                            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-5 md:justify-between">
                                <Quantity
                                    quantity={item.quantity}
                                    onIncrement={() =>
                                        updateQuantity(
                                            item.product.title,
                                            item.quantity + 1
                                        )
                                    }
                                    onDecrement={() => {
                                        if (item.quantity === 1) {
                                            removeItem(item.product.title);
                                        } else {
                                            updateQuantity(
                                                item.product.title,
                                                item.quantity - 1
                                            );
                                        }
                                    }}
                                    setQuantity={(value) =>
                                        updateQuantity(
                                            item.product.title,
                                            value
                                        )
                                    }
                                />
                                <div className="flex flex-col font-bold">
                                    <span className="text-lg md:text-xl text-[var(--primary)]">
                                        ${item.product.price}
                                    </span>
                                    <span className="line-through text-xs md:text-sm text-gray-400">
                                        $
                                        {calculateDiscountedPrice(
                                            item.product.price,
                                            item.product.discount
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                        Tu canasta está vacía
                    </p>
                )}
            </div>
            {items.length > 0 && (
                <div className="flex flex-col gap-3 mt-4 md:mt-6">
                    <p className="text-lg md:text-xl text-[var(--primary)] font-semibold">
                        Subtotal:{" "}
                        <span className="text-2xl md:text-4xl">${total.toFixed(2)}</span>
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                        Al subtotal se le puede agregar impuestos y costos de
                        envío según corresponda.
                    </p>
                    <Button
                        variant="contained"
                        className="h-10 md:h-12"
                        sx={{
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            fontWeight: "bold",
                            backgroundColor: "var(--primary)",
                            "&:hover": { backgroundColor: "var(--primary)" },
                        }}
                    >
                        Proceder al pago
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="outlined"
                            className="h-9 md:h-10 flex-1"
                            sx={{
                                fontSize: { xs: "0.9rem", md: "1.1rem" },
                                fontWeight: "semibold",
                                color: "var(--primary)",
                                borderColor: "var(--primary)",
                                minWidth: { xs: "auto", md: "120px" },
                                "&:hover": {
                                    borderColor: "var(--primary)",
                                    color: "var(--primary)",
                                },
                            }}
                        >
                            <ShoppingCart className="block md:hidden" />
                            <span className="hidden md:block">Ver canasta completa</span>
                        </Button>
                        <Button
                            variant="outlined"
                            className="h-9 md:h-10 flex-1"
                            sx={{
                                fontSize: { xs: "0.9rem", md: "1.1rem" },
                                fontWeight: "semibold",
                                color: "var(--primary)",
                                borderColor: "var(--primary)",
                                minWidth: { xs: "auto", md: "120px" },
                                "&:hover": {
                                    borderColor: "var(--primary)",
                                    color: "var(--primary)",
                                },
                            }}
                        >
                            <WhatsApp className="block md:hidden" />
                            <span className="hidden md:block">Comprar por WhatsApp</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
