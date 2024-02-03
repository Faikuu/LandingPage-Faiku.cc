import { useEffect } from "react";
import { Section, Tools } from "../tools";
import { Helmet } from 'react-helmet';

export function Portfolio() {
  const sections = Tools.getSections();

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) observer.unobserve(section.ref.current);
      });
    };
  }, [sections]);

  return (
    <div className="space-y-20 pt-16 max-w-screen-sm">
      {sections.map(renderSection)}
    </div>
  );
}
  
function handleIntersection(entries : IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      entry.target.classList.remove('fade-out');
    } else {
      entry.target.classList.remove('fade-in');
      entry.target.classList.add('fade-out');
    }
  });
}
  
function renderSection(section : Section, index : number) {
  return (
    <section id={`section_${section.id}`} key={index} ref={section.ref} className="py-10 px-6 transition-opacity opacity-0">
      <h2 className="text-3xl font-bold text-center transition-colors hover:text-neutral-600">{section.title}</h2>
      <pre className='whitespace-pre-wrap tracking-tighter text-justify max-w-[70vw]'>{section.description}</pre>
      {section.title === 'O mnie' && renderLogos()}
      {section.customHTML && <div dangerouslySetInnerHTML={{ __html: section.customHTML }} />}
      {section.gallery && renderGallery(section.gallery)}
      
    </section>
  );
}

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
}

  
function renderLogos() {
  const logos = [
    'React.webp',
    'NestJS.webp',
    'NodeJS.webp',
    'PHP.webp',
  ];

  useEffect(() => {
    logos.forEach((logo) => preloadImage(`/icons/${logo}`));
  }, []);

  return (
    <>
      <Helmet>
        {logos.map((logo, index) => (
          <link key={`logos_${index}`} rel="preload" as="image" href={`/icons/${logo}`} />
        ))}
      </Helmet>
      <div className='flex justify-left space-x-2 max-w-[70vw] flex-wrap'>
        {logos.map((logo, index) => (
          <img key={index} src={`/icons/${logo}`} alt="Logo" className='h-8 transition-transform hover:scale-110 hover:transform hover:-translate-y-1' style={{ transformOrigin: 'center' }} />
        ))}
      </div>
    </>
  );
}
  
function renderGallery(gallery : any) {
  return (
    <div className="grid grid-cols-1 gap-4 w-[70vw] max-w-[600px] mx-auto">
      {gallery.map(renderImage)}
    </div>
  );
}

function renderImage(image: any, index: number) {
  useEffect(() => {
    preloadImage(image.src);
  }, [image.src]);

  return (
    <>
      <Helmet>
        <link key={`image_${image.title}`} rel="preload" as="image" href={image.src} />
      </Helmet>
      <div key={index} className="p-4 bg-neutral-900 rounded-lg shadow-lg">
        <a href={image.url}>
          <div className="shadow-2xl border-2 border-black object-cover object-center overflow-hidden rounded-lg">
            <img className='transition-all hover:scale-125 mx-auto' src={image.src} alt={image.alt} />
          </div>
        </a>
        <h3 className="text-2xl text-center pt-4">{image.title}</h3>
        <p className="text-center pt-4">{image.description}</p>
      </div>
    </>
  );
}