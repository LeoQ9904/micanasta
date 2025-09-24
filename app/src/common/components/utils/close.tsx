import { Close } from "@mui/icons-material";

export default function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
            <Close fontSize="large" />
        </button>
    );
}
