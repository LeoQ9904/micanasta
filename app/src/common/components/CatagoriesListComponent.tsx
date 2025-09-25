import { useProductStore } from "../../store/productStore";
export default function CategoriesListComponent() {
    const categories = useProductStore((state) => state.categories);

    return (
        <div>
            <ul className="flex flex-col gap-2">
                {categories.map((category) => (
                    <li
                        className="py-2 px-4 hover:bg-gray-100 border border-[rgb(var(--primary-),.1)] rounded text-[rgb(var(--primary-))] font-semibold cursor-pointer "
                        key={category.id}
                        onClick={() => {
                            window.location.href = `/products/category/${category.id}`;
                        }}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
