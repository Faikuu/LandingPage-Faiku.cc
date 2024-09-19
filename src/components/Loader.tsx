import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function Loader() {
    const [showLoader, setShowLoader] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeTimeout = setTimeout(() => {
            setFadeOut(true);
        }, 300);

        const removeTimeout = setTimeout(() => {
            setShowLoader(false);
        }, 600);

        return () => {
            clearTimeout(fadeTimeout);
            clearTimeout(removeTimeout);
        };
    }, []);

    if (!showLoader) return null;

    return (
        <>
            <Helmet>
                <link rel="preload" as="image" href="logo.webp" />
            </Helmet>
            <div
                className={`pointer-events-none flex justify-center items-center fixed top-0 left-0 z-50 h-screen w-screen bg-[#191919] ${
                    fadeOut ? 'opacity-0 transition-opacity duration-300' : ''
                }`}
            >
                <div className="flex items-center justify-center">
                    <img
                        height={64}
                        width={64}
                        src="logo.webp"
                        alt="Logo"
                        className="h-64 w-64"
                        loading="lazy"
                    />
                </div>
            </div>
        </>
    );
}
