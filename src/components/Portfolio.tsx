import { Fragment, useEffect, useRef } from "react";
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
      <h2 className="mt-16 text-3xl font-bold text-center transition-colors hover:text-neutral-600">{section.title}</h2>
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
      <div className='grid grid-animation grid-cols-4 align-middle gap-4 justify-center max-w-[70vw] flex-wrap'>
        {logos.map((logo, index) => (
          <div key={index} className="bg-[#222] p-2 rounded-lg">
            <img src={`/icons/${logo}`} alt={`Logo${index+1}`} className='h-8 transition-transform hover:scale-110 hover:transform hover:-translate-y-1 mx-auto' style={{ transformOrigin: 'center' }} />
          </div>
        ))}
      </div>
    </>
  );
}
  
function renderGallery(gallery : any) {
  return (
    <div className="grid grid-cols-1 gap-4 w-[70vw] max-w-[600px] mx-auto">
      {gallery.map((image: any, index: number) => <Fragment key={index}>{renderImage(image, index)}</Fragment>)}
    </div>
  );
}

function renderImage(image: any, index: number) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Array.isArray(image.src)) {
      image.src.forEach((src: string) => preloadImage(src));
    } else {
      preloadImage(image.src);
    }
  }, [image.src]);

  let src = image.src;
  if (Array.isArray(src)) {
    src = src[0];
  }

  function scrollLeft() {
    const galleryElement = galleryRef.current?.firstElementChild;
    galleryElement?.scrollBy({ left: -250, behavior: 'smooth' });
  }
  function scrollRight() {
    const galleryElement = galleryRef.current?.firstElementChild;
    galleryElement?.scrollBy({ left: 250, behavior: 'smooth' });
  }

  return (
    <>
      <Helmet>
        {Array.isArray(image.src) ? (
          image.src.map((src: string, idx: number) => (
            <link key={`image_${image.title}_${idx}`} rel="preload" as="image" href={src} />
          ))
        ) : (
          <link key={`image_${image.title}`} rel="preload" as="image" href={src} />
        )}
      </Helmet>
      <div key={index} className="p-4 bg-neutral-900 rounded-lg shadow-lg relative">
        <a href={image.url} className='flex flex-col'>
          <div className="overflow-hidden rounded-lg" ref={galleryRef}>
            {Array.isArray(image.src) ? (
              <div ref={galleryRef} className="flex overflow-x-auto w-full gap-2">
                {image.src.map((src: string, idx: number) => (
                  <img key={idx} className='transition-all hover:scale-125 mx-auto flex-shrink-0 max-h-[500px] rounded-lg' src={src} alt={image.alt} />
                ))}
              </div>
            ) : (
              <img className='transition-all hover:scale-125 mx-auto' src={src} alt={image.alt} />
            )}
          </div>
        </a>
        <h3 className="text-2xl text-center pt-4">{image.title}</h3>
        <p className="text-center pt-4">{image.description}</p>
        {Array.isArray(image.src) && (
          <div className="absolute top-0 left-2 right-2 bottom-0 flex items-center justify-between px-4">
            <button className="text-white" onClick={() => scrollLeft()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="color-white text-white" onClick={() => scrollRight()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
