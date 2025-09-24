import Destacados from "./products/components/destacados";
import NotasComponent from "./src/common/components/NotasComponent";

export default function Home() {
    return (
        <div className="p-4">
            <main className="flex flex-col gap-8 container mx-auto">
                <NotasComponent />
                <Destacados />
            </main>
        </div>
    );
}
