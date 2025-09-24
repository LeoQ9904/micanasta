import { Add } from "@mui/icons-material";

export default function AddButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
            <Add fontSize="small" />
        </button>
    );
}
