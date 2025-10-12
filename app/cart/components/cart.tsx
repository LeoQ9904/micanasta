"use client";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../src/store/cartStore";
import { Button } from "@mui/material";
import { useCurrencyFormat } from "@/app/src/hooks/useCurrencyFormat";
import ListItems from "./ListItems";

export default function Cart() {
    const router = useRouter();
    const { items, getTotal } = useCartStore();
    const total = getTotal();
    const formatCurrency = useCurrencyFormat({ currency: "COP" });

    return (
        <div className="py-4 md:py-10 px-4 md:px-6 flex flex-col justify-around h-[95%]">
            <h2 className="text-2xl md:text-4xl font-bold">Tu canasta</h2>
            <ListItems />
            {items.length > 0 && (
                <div className="flex flex-col gap-3 mt-4 md:mt-6">
                    <p className="text-lg md:text-xl text-[var(--primary)] font-semibold">
                        Subtotal:{" "}
                        <span className="text-2xl md:text-4xl">
                            {formatCurrency(total.toFixed(2))}
                        </span>
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                        Al subtotal se le puede agregar impuestos y costos de
                        envío según corresponda.
                    </p>
                    <Button
                        variant="contained"
                        className="h-10 md:h-12"
                        onClick={() => {
                            router.push("/checkout");
                            useCartStore.getState().toggleCart();
                        }}
                        sx={{
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            fontWeight: "bold",
                            backgroundColor: "var(--primary)",
                            "&:hover": { backgroundColor: "var(--primary)" },
                        }}
                    >
                        Confirmar pedido
                    </Button>
                </div>
            )}
        </div>
    );
}
