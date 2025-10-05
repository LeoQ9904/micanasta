import { ArrowRightAlt } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFetchNotifications } from "@/app/src/hooks/useNotifications.hook";
import { useRouter } from "next/navigation";

export default function NotasComponent() {
    const { data } = useFetchNotifications();
    const router = useRouter();

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-8">
            {data?.map((card, index) => (
                <Card
                    key={index}
                    className="w-full md:w-1/3 h-[280px] p-4 flex flex-col justify-between"
                    sx={{
                        boxShadow: "none",
                        borderRadius: "16px",
                        backgroundImage: card.backgroundImage
                            ? `url(${card.backgroundImage})`
                            : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minWidth: { xs: "100%", md: "500px" },
                        maxWidth: { xs: "100%", md: "500px" },
                    }}
                >
                    <CardContent className="hover:scale-[1.02] transition-transform duration-300 flex-grow flex items-center justify-center">
                        <p className="text-2xl font-bold text-gray-600 text-center">
                            {card.title}
                        </p>
                    </CardContent>
                    <div className="flex justify-start w-full mt-auto">
                        <button
                            className="py-2 px-4 bg-[var(--primary)] text-white font-bold rounded-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                            onClick={() =>
                                router.push(`/products/?category=Todos`)
                            }
                        >
                            Ver más
                            <ArrowRightAlt className="ml-1" />
                        </button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
