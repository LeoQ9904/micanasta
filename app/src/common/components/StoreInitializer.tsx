"use client";
import { useCategories } from "../../hooks/useCategories.hook";

export default function StoreInitializer() {
    useCategories();
    return null;
}
