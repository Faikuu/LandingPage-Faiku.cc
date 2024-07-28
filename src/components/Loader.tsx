import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";


export default function Loader() {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoader(false);
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            <Helmet>
                <link rel="preload" as="image" href={`logo.webp`} />
            </Helmet>
            <div
                className={`pointer-events-none flex justify-center items-center fixed top-0 left-0 z-50 h-screen w-screen bg-[#191919] ${
                    showLoader ? '' : 'opacity-0 transition-opacity duration-300'
                }`}
            >
                <div className="flex items-center justify-center">
                    <img src="logo.webp" alt="Logo" className="h-64 w-64" />
                </div>
            </div>
        </>
    );
}
