import Quantity from "@/app/src/common/components/utils/quantity";
import { useCartStore } from "@/app/src/store/cartStore";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { calculateDiscountedPrice } from "@/app/src/common/hooks/useCalculateDiscounted";
import { useCurrencyFormat } from "@/app/src/hooks/useCurrencyFormat";

export default function ListItems() {
    const { items, updateQuantity, removeItem } = useCartStore();
    const formatCurrency = useCurrencyFormat({ currency: "COP" });

    return (
        <div className="flex flex-col divide-y-1 divide-gray-300 gap-4 mt-6 h-full overflow-y-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-start gap-3 md:gap-4 py-2"
                >
                    <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1 gap-2 md:gap-3">
                        <div className="font-semibold text-sm md:text-xl leading-tight flex justify-between">
                            <h3>{item.product.name}</h3>
                            <IconButton
                                onClick={() => removeItem(item.product.name)}
                                size="small"
                                sx={{ color: "#ef4444" }}
                            >
                                <Close fontSize="small" />
                            </IconButton>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-5 md:justify-between">
                            <Quantity
                                quantity={item.quantity}
                                onIncrement={() =>
                                    updateQuantity(
                                        item.product.name,
                                        item.quantity + 1
                                    )
                                }
                                onDecrement={() => {
                                    if (item.quantity === 1) {
                                        removeItem(item.product.name);
                                    } else {
                                        updateQuantity(
                                            item.product.name,
                                            item.quantity - 1
                                        );
                                    }
                                }}
                                setQuantity={(value) =>
                                    updateQuantity(item.product.name, value)
                                }
                            />
                            <div className="md:text-xl text-gray-400 font-bold">
                                X {item.product.unit}
                            </div>
                            <div className="flex flex-col font-bold">
                                <span className="text-lg md:text-xl text-[var(--primary)]">
                                    {formatCurrency(item.product.price)}
                                </span>
                                {item.product.discount > 0 && (
                                    <>
                                        <span className="text-xs md:text-sm text-gray-400">
                                            {formatCurrency(
                                                calculateDiscountedPrice(
                                                    item.product.price,
                                                    item.product.discount
                                                )
                                            )}
                                        </span>
                                        <span className="text-lg text-green-500">
                                            - {item.product.discount} %
                                        </span>
                                    </>
                                )}
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
    );
}
