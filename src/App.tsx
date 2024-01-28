import { useEffect, useState } from 'react'
import './App.css'
import { Section, Tools } from './tools';
import Markdown from 'react-markdown';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = Tools.getSections();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section: Section) => {
    const element = document.getElementById(`nav_${section.title}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <div className="fixed top-0 left-0 w-full z-50 navbar-slide-in">
        <div className="bg-neutral-900 shadow-2xl">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <div className="flex items-center pr-8">
                  <img src="logo.png" alt="Logo" className="h-16 w-16" />
                  <a href="#" className="flex items-center py-5 px-2 text-gray-100 transition-colors hover:text-gray-500">
                    <span className="font-bold">{Tools.getAppName()}</span>
                  </a>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  {sections.map((section, index) => (
                    <a id={`nav_${section.title}`} key={index} href={`#${section.title}`} className="py-5 px-3 text-gray-100 transition-colors hover:text-gray-500" onClick={() => handleNavClick(section)}>{section.title}</a>
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
            <a key={index} href={`#${section.title}`} className="block py-2 px-4 text-sm border-b-[1px] border-neutral-700 bg-neutral-900 hover:bg-neutral-800" onClick={() => handleNavClick(section)}>{section.title}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Portfolio() {
  const sections = Tools.getSections();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          } else {
            entry.target.classList.remove('fade-in');
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => sections.forEach((section) => {
      if (section.ref.current) observer.unobserve(section.ref.current);
    });
  }, []);

  return (
    <div className="space-y-20 pt-16 p-4 max-w-screen-md">
      {sections.map((section, index) => (
        <section key={index} ref={section.ref} className="py-10 transition-opacity opacity-0">
          <h2 className="text-3xl font-bold text-center transition-colors hover:text-neutral-600">{section.title}</h2>
          <Markdown children={section.description} className="text-justify py-2"/>
          {/* <p className='text-justify py-2'>{section.description}</p> */}
          {section.gallery && (
            <div className="grid grid-cols-1 gap-4 w-[40vw] mx-auto">
              {section.gallery.map((image, index) => (
                <div key={index} className="p-4 bg-neutral-900 rounded-lg shadow-lg">
                  <a href={image.url}>
                    <div className="shadow-2xl border-2 border-black object-cover object-center overflow-hidden rounded-lg">
                      <img className='transition-all hover:scale-125 mx-auto' src={image.src} alt={image.alt} /> {/* Center the image */}
                    </div>
                  </a>
                  <h3 className="text-2xl text-center pt-4">{image.title}</h3>
                  <p className="text-center pt-4">{image.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar/>
      <Portfolio/>
    </>
  )
}

export default App
