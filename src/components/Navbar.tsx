import { useState } from "react";
import { Section, Tools } from "../tools";


export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sections = Tools.getSections();
  
    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const handleNavClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        const header = document.getElementById('navbar');
        const headerHeight = header ? (header.clientHeight) : 0;
      
        if (element) {
          window.scrollTo({
            top: element.offsetTop - headerHeight,
            behavior: 'smooth',
          });
        }
      };
  
    return (
      <nav>
        <div id="navbar" className="fixed top-0 left-0 w-full z-50 navbar-slide-in">
          <div className="bg-neutral-900 shadow-2xl">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between">
                <div className="flex space-x-4">
                  <div className="flex items-center pr-8">
                    <img src="logo.png" alt="Logo" className="h-16 w-16" />
                    <a id="home" href="#home" className="flex items-center py-5 px-2 text-gray-100 transition-colors hover:text-gray-500" onClick={() => handleNavClick('home')}>
                      <span className="font-bold">{Tools.getAppName()}</span>
                    </a>
                  </div>
                  <div className="hidden md:flex items-center space-x-1">
                    {sections.map((section, index) => (
                      <a id={`${section.id}`} key={index} href={`#${section.id}`} className="py-5 px-3 text-gray-100 transition-colors hover:text-gray-500" onClick={() => handleNavClick(`section_${section.id}`)}>{section.title}</a>
                    ))}
                  </div>
                </div>
                <div className="md:hidden flex items-center">
                  <button className="mobile-menu-button" onClick={handleMenuToggle}>
                    <svg className="w-6 h-6 text-gray-500 hover:text-gray-700" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mobile-menu ${
              isMenuOpen
                ? 'translate-x-0 visible'
                : '-translate-x-full invisible'
            } md:hidden transition-all ease-in-out duration-300`}
          >
            {sections.map((section, index) => (
              <a key={index} href={`#${section.id}`} className="block py-2 px-4 text-sm border-b-[1px] border-neutral-700 bg-neutral-900 hover:bg-neutral-800" onClick={() => handleNavClick(`section_${section.id}`)}>{section.title}</a>
            ))}
          </div>
        </div>
      </nav>
    );
  }