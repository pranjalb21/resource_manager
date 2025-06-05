import React, { useEffect, useRef, useState } from "react";

const DOTS = ["", ".", "..", "..."];

const Loading: React.FC = () => {
    const [dotIndex, setDotIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setDotIndex((prev) => (prev + 1) % DOTS.length);
        }, 300);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="fixed flex flex-col items-center justify-center w-full h-full gap-4 py-8 bg-black/40">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-lg sm:text-xl text-gray-100 w-25 font-medium tracking-wide mt-2 sm:mt-0">
                Loading{DOTS[dotIndex]}
            </p>
        </div>
    );
};

export default Loading;
