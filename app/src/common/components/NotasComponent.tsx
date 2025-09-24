import { cardNotas } from "@/app/data/data";
import { ArrowRightAlt } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function NotasComponent() {
    const cards = cardNotas;
    return (
        <div className="flex gap-8">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    className=" h-[250px] p-4 flex flex-col items-center justify-center gap-4"
                    sx={{
                        boxShadow: "none",
                        borderRadius: "16px",
                        backgroundImage: card.bg ? `url(${card.bg})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <CardContent className="hover:scale-[1.02] transition-transform duration-300">
                        <p className="text-2xl font-bold text-gray-600">
                            {card.description}
                        </p>
                    </CardContent>
                    <div className="flex justify-start w-full">
                        <button className="py-1 px-4 bg-[var(--primary)] text-white font-bold rounded-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                            Ver más
                            <ArrowRightAlt className="ml-1" />
                        </button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
