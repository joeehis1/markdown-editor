import { useEffect, useState } from "react";

export default function useResize(width) {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        function toggleInnerWidth() {
            setInnerWidth(window.innerWidth);
        }
        window.addEventListener("resize", toggleInnerWidth);

        return () => {
            window.removeEventListener("resize", toggleInnerWidth);
        };
    }, []);

    return { isWider: innerWidth > width };
}
