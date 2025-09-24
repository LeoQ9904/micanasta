import { ArrowBackIos } from "@mui/icons-material";

export default function ArrowLeft({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute left-2 bg-[rgb(var(--primary-),.1)] rounded-full p-2 cursor-pointer  hover:bg-white"
        >
            <ArrowBackIos fontSize="small" />
        </button>
    );
}
