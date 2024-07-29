
const logos = [
    'React.webp',
    'symfony.png',
    'NestJS.webp',
    'NodeJS.webp',
    'expressjs.png',
    'PHP.webp',
    'javascript.png',
    'typescript.png',
    'sql.png',
    'postgre.png',
    'mongo.svg',
    'git.png',
];

export default function BackgroundCarousel() {
    return (
        <div className="background-carousel absolute grayscale opacity-5 rotate-[-10deg]">
            <div className="scroll-container flex flex-row justify-center items-center gap-4">
                {logos.map((logo, index) => (
                    <div key={index} className="logo-container">
                        <img src={`/icons/${logo}`} alt={`Logo${index+1}`} className="w-32 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}