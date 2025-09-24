import AddButton from "./add";
import RemoveButton from "./remove";

export default function Quantity({
    quantity,
    onIncrement,
    onDecrement,
    setQuantity,
}: {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    setQuantity: (value: number) => void;
}) {
    return (
        <div className="flex items-center border border-gray-300 rounded">
            <RemoveButton onClick={() => onDecrement()} />
            <input
                type="number"
                value={quantity}
                onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center py-2 border-0 outline-none"
                min="1"
            />
            <AddButton onClick={() => onIncrement()} />
        </div>
    );
}
