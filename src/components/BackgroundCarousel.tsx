const logos = [
    'React.webp',
    'symfony.webp',
    'NestJS.webp',
    'NodeJS.webp',
    'expressjs.webp',
    'PHP.webp',
    'javascript.webp',
    'typescript.webp',
    'sql.webp',
    'postgre.webp',
    'mongo.svg',
    'git.webp',
];

export default function BackgroundCarousel() {
    return (
        <div className="background-carousel absolute inset-0 grayscale opacity-5 rotate-[-10deg] overflow-hidden">
            <div className="logo-grid">
                {[...Array(20)].map((_, rowIndex) => {
                    const shuffledLogos = [...logos].sort(() => 0.5 - Math.random());
                    return (
                        <div key={rowIndex} className="logo-row">
                            {shuffledLogos.map((logo, index) => (
                                <div key={index} className="logo-container">
                                    <img src={`/icons/${logo}`} alt={`Logo${index + 1}`} width={32} className="w-32 object-cover" />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}