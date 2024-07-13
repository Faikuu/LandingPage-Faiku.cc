import { useRef, MutableRefObject } from "react";

export interface Section {
  ref: MutableRefObject<HTMLDivElement | null>;
  id: string;
  title: string;
  description?: string;
  gallery?: Array<{
    src: string | string[];
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
Jestem programistą tworzącym aplikacje w technologiach web'owych. Moja pasja do programowania zrodziła się już w wieku nastoletnim, gdy zainteresowałem się językiem C++.
Zacząłem wtedy poznawać fundamenty działania komputerów oraz metod zarządzania pamięcią.
Z czasem przeniosłem się na wysokopoziomowe języki oraz technologie, które wypisałem poniżej:
      ` 
    },
    { 
      ref: useRef<HTMLDivElement>(null),
      id: 'projects',
      title: 'Moje projekty',
      description: ' ', 
      gallery: [
        {
          src: ['screenshots/parrotype1.webp', 'screenshots/parrotype2.webp'],
          alt: 'Aplikacja parrotype',
          url: 'https://github.com/Faikuu/parrotype',
          title: 'Parrotype',
          description: 'Prosta aplikacja fullstack pobierająca pangramy z bazy danych bazując na lokalnym języku użytkownika.'
        },
        {
          src: ['screenshots/shopder2.png', 'screenshots/shopder1.gif', 'screenshots/shopder4.png', 'screenshots/shopder5.png', 'screenshots/shopder3.png'],
          alt: 'Shopder',
          url: 'https://play.google.com/store/apps/details?id=eu.bauhus.shopder',
          title: 'Shopder',
          description: 'Aplikacja zakupowa polegająca na przesuwaniu codziennych okazji w lewo lub prawo.'
        }
      ] 
    },
    { 
      ref: useRef<HTMLDivElement>(null), 
      id: 'contact',
      title: 'Kontakt',
      customHTML: `
        <div class="p-4 max-w-sm mx-auto border-[1px] rounded-xl shadow-md space-x-4">
          <p>Zapraszam do kontaktu pod adresem email: adam@faiku.cc</p>
        </div>
      `
    },
  ];
}
};
