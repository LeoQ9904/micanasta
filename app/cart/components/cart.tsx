"use client";
import Quantity from "@/app/src/common/components/utils/quantity";
import { useCartStore } from "../../src/store/cartStore";
import { calculateDiscountedPrice } from "@/app/src/common/hooks/useCalculateDiscounted";
import { Button } from "@mui/material";

export default function Cart() {
    const { items, getTotal, updateQuantity, removeItem } = useCartStore();
    const total = getTotal();

    return (
        <div className="py-10 px-6 flex flex-col justify-between h-full">
            <h2 className="text-4xl font-bold">Tu canasta</h2>
            <div className="flex flex-col divide-y-1 divide-gray-300 gap-4 mt-6 h-full overflow-y-auto">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full object-cover rounded"
                        />
                        <div className="flex flex-col flex-1 gap-3">
                            <h3 className="font-semibold text-xl">
                                {item.product.title}
                            </h3>
                            <div className="flex items-center space-x-5 justify-between">
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
                                <div className="flex flex-col font-bold w-full">
                                    <span className="text-xl text-[var(--primary)]">
                                        ${item.product.price}
                                    </span>
                                    <span className="line-through text-sm text-gray-400">
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
                <div className="flex flex-col gap-3 mt-6">
                    <p className="text-xl text-[var(--primary)] font-semibold">
                        Subtotal:{" "}
                        <span className="text-4xl">${total.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        Al subtotal se le puede agregar impuestos y costos de
                        envío según corresponda.
                    </p>
                    <Button
                        variant="contained"
                        className="h-12"
                        sx={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            backgroundColor: "var(--primary)",
                            "&:hover": { backgroundColor: "var(--primary)" },
                        }}
                    >
                        Proceder al pago
                    </Button>
                    <Button
                        variant="outlined"
                        className="h-10"
                        sx={{
                            fontSize: "1.1rem",
                            fontWeight: "semibold",
                            color: "var(--primary)",
                            borderColor: "var(--primary)",
                            "&:hover": {
                                borderColor: "var(--primary)",
                                color: "var(--primary)",
                            },
                        }}
                    >
                        Ver canasta completa
                    </Button>
                    <Button
                        variant="outlined"
                        className="h-10"
                        sx={{
                            fontSize: "1.1rem",
                            fontWeight: "semibold",
                            color: "var(--primary)",
                            borderColor: "var(--primary)",
                            "&:hover": {
                                borderColor: "var(--primary)",
                                color: "var(--primary)",
                            },
                        }}
                    >
                        Comprar por WhatsApp
                    </Button>
                </div>
            )}
        </div>
    );
}
