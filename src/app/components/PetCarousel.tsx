import React, { useState } from 'react';

const pets = [
  {
    name: 'Cachorro',
    svg: (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="45" cy="70" rx="28" ry="14" fill="#fbbf24" />
        <ellipse cx="25" cy="40" rx="10" ry="16" fill="#f59e42" />
        <ellipse cx="65" cy="40" rx="10" ry="16" fill="#f59e42" />
        <ellipse cx="35" cy="25" rx="7" ry="10" fill="#fbbf24" />
        <ellipse cx="55" cy="25" rx="7" ry="10" fill="#fbbf24" />
        <circle cx="45" cy="50" r="22" fill="#fde68a" />
        <ellipse cx="38" cy="55" rx="3" ry="5" fill="#fff" />
        <ellipse cx="52" cy="55" rx="3" ry="5" fill="#fff" />
        <ellipse cx="38" cy="55" rx="1.2" ry="2" fill="#222" />
        <ellipse cx="52" cy="55" rx="1.2" ry="2" fill="#222" />
        <ellipse cx="45" cy="65" rx="4" ry="2" fill="#f59e42" />
        <ellipse cx="45" cy="65" rx="2" ry="1" fill="#222" />
      </svg>
    )
  },
  {
    name: 'Gato',
    svg: (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="45" cy="70" rx="28" ry="14" fill="#a3e635" />
        <ellipse cx="25" cy="40" rx="8" ry="14" fill="#65a30d" />
        <ellipse cx="65" cy="40" rx="8" ry="14" fill="#65a30d" />
        <ellipse cx="35" cy="25" rx="6" ry="8" fill="#a3e635" />
        <ellipse cx="55" cy="25" rx="6" ry="8" fill="#a3e635" />
        <circle cx="45" cy="50" r="20" fill="#bef264" />
        <ellipse cx="38" cy="55" rx="2.5" ry="4" fill="#fff" />
        <ellipse cx="52" cy="55" rx="2.5" ry="4" fill="#fff" />
        <ellipse cx="38" cy="55" rx="1" ry="1.7" fill="#222" />
        <ellipse cx="52" cy="55" rx="1" ry="1.7" fill="#222" />
        <ellipse cx="45" cy="65" rx="3" ry="1.5" fill="#65a30d" />
        <ellipse cx="45" cy="65" rx="1.2" ry="0.7" fill="#222" />
      </svg>
    )
  },
  {
    name: 'Coelho',
    svg: (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="45" cy="70" rx="28" ry="14" fill="#a5b4fc" />
        <ellipse cx="25" cy="40" rx="8" ry="18" fill="#818cf8" />
        <ellipse cx="65" cy="40" rx="8" ry="18" fill="#818cf8" />
        <ellipse cx="35" cy="20" rx="5" ry="14" fill="#a5b4fc" />
        <ellipse cx="55" cy="20" rx="5" ry="14" fill="#a5b4fc" />
        <circle cx="45" cy="50" r="20" fill="#c7d2fe" />
        <ellipse cx="38" cy="55" rx="2.5" ry="4" fill="#fff" />
        <ellipse cx="52" cy="55" rx="2.5" ry="4" fill="#fff" />
        <ellipse cx="38" cy="55" rx="1" ry="1.7" fill="#222" />
        <ellipse cx="52" cy="55" rx="1" ry="1.7" fill="#222" />
        <ellipse cx="45" cy="65" rx="3" ry="1.5" fill="#818cf8" />
        <ellipse cx="45" cy="65" rx="1.2" ry="0.7" fill="#222" />
      </svg>
    )
  }
];

const PetCarousel = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % pets.length);
  const prev = () => setIndex((i) => (i - 1 + pets.length) % pets.length);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <button onClick={prev} aria-label="Anterior" className="p-2 rounded-full bg-white/40 hover:bg-blue-200 shadow transition animate-glow text-blue-700 text-xl font-bold">&#8592;</button>
        <div className="transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer animate-pet-bounce">
          {pets[index].svg}
        </div>
        <button onClick={next} aria-label="Próximo" className="p-2 rounded-full bg-white/40 hover:bg-blue-200 shadow transition animate-glow text-blue-700 text-xl font-bold">&#8594;</button>
      </div>
      <div className="mt-2 text-blue-900 font-bold text-lg drop-shadow animate-fade-in-up">{pets[index].name}</div>
    </div>
  );
};

export default PetCarousel; 