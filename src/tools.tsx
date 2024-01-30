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
Jestem studentem kierunku Informatyka w Biznesie na studiach magisterskich, 
pasionującym się tworzeniem aplikacji webowych. Moje doświadczenie obejmuje 
projektowanie responsywnych stron internetowych oraz aplikacji opartych na 
najnowszych technologiach webowych. Moje podejście do pracy cechuje staranność, 
kreatywność i ciągłe dążenie do rozwoju. Zapraszam do zapoznania się z moim 
portfolio i do kontaktu w sprawie współpracy.

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
          src: 'screenshots/parrotype.png',
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
