import { Remove } from "@mui/icons-material";

export default function RemoveButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
            <Remove fontSize="small" />
        </button>
    );
}
