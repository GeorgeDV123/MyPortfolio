import Typed from 'typed.js';

export function aboutText() {
  const text1 = new Typed('#about-text1', {
    strings: ['→ Front-end Devloper', '→ Web Designer', '→ Always learning'],
    typeSpeed: 20,
    backSpeed: 1,
    backDelay: 3000,
    smartBackspace: true, 
    cursorChar: '<strong id=about-text1>|</strong>',
    loop: true
  });
  
}