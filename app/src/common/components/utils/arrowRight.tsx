import { ArrowForwardIos } from "@mui/icons-material";
export default function ArrowRight({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute right-2 bg-[rgb(var(--primary-),.1)] rounded-full p-2 cursor-pointer  hover:bg-white"
        >
            <ArrowForwardIos fontSize="small" />
        </button>
    );
}
