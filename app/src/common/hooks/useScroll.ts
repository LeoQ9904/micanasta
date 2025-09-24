import { useState, useEffect } from "react";

export const useScroll = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            setScrollY(window.scrollY);
            setIsScrolling(true);

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setIsScrolling(false), 150);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    return { scrollY, isScrolling };
};
