import { categories } from "@/app/data/data";
import CategoryPageClient from "./components/CategoryPageClient";

export async function generateStaticParams() {
    return categories.map((category) => ({
        id: category.id.toString(),
    }));
}

interface CategoriesSelectComponentProps {
    params: Promise<{ id: string }>;
}

export default async function CategoriesSelectComponent({
    params,
}: CategoriesSelectComponentProps) {
    const { id } = await params;
    const categoryId = Number(id);

    return <CategoryPageClient categoryId={categoryId} />;
}
