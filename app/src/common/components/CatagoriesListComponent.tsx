import { useProductStore } from "../../store/productStore";

export default function CategoriesListComponent() {
    const categories = useProductStore((state) => state.categories);

    const onClickSelect = (category: string) => {
        window.location.href = `/products?category=${encodeURIComponent(category)}`;
    };

    return (
        <div>
            <ul className="flex flex-col gap-2">
                {Array.isArray(categories) &&
                    categories.map((category, index) => (
                        <li
                            className="py-2 px-4 hover:bg-gray-100 border border-[rgb(var(--primary-),.1)] rounded text-[rgb(var(--primary-))] font-semibold cursor-pointer "
                            key={index}
                            onClick={() => onClickSelect(category.name)}
                        >
                            {category.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
