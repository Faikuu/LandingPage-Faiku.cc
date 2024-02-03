import { useRef, MutableRefObject } from "react";

export interface Section {
  ref: MutableRefObject<HTMLDivElement | null>;
  id: string;
  title: string;
  description?: string;
  gallery?: Array<{
    src: string;
    alt: string;
    url: string;
    title: string;
    description: string;
  }>;
  customHTML?: string;
}

interface ToolsModule {
  getAppName: () => string;
  getSections: () => Section[];
}

export const Tools: ToolsModule = {
  getAppName: () => 'Faiku',
getSections: () => {
  return [
    { 
      ref: useRef<HTMLDivElement>(null),
      id: 'about',
      title: 'O mnie',
      description: `
Jestem studentem studiów magisterskich na kierunku Informatyka w Biznesie, a moją pasją jest tworzenie aplikacji webowych.
Moje umiejętności obejmują projektowanie responsywnych stron internetowych oraz tworzenie aplikacji opartych na najnowszych technologiach.
W mojej pracy kładę nacisk na staranność, kreatywność i nieustanne dążenie do rozwoju.
Zachęcam do zapoznania się z moim portfolio oraz do nawiązania kontaktu w celu możliwej współpracy.

Technologie, wokół których się poruszam:
      ` 
    },
    { 
      ref: useRef<HTMLDivElement>(null),
      id: 'projects',
      title: 'Moje projekty',
      description: ' ', 
      gallery: [
        {
          src: 'screenshots/parrotype.webp',
          alt: 'Aplikacja parrotype',
          url: 'https://github.com/Faikuu/parrotype',
          title: 'Parrotype',
          description: 'Prosta aplikacja fullstack pobierająca pangramy z bazy danych bazując na lokalnym języku użytkownika.'
        },
      ] 
    },
    { 
      ref: useRef<HTMLDivElement>(null), 
      id: 'contact',
      title: 'Kontakt',
      customHTML: `
        <div class="p-4 max-w-sm mx-auto border-[1px] rounded-xl shadow-md space-x-4">
          <p>Zapraszam do kontaktu pod adresem email: faiku@proton.me</p>
        </div>
      `
    },
  ];
}
};
