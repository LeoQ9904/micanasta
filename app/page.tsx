import Destacados from "./products/components/destacados";
import NotasComponent from "./src/common/components/NotasComponent";

export default function Home() {
    return (
        <main className="flex flex-col gap-8">
            <NotasComponent />
            <Destacados />
        </main>
    );
}
