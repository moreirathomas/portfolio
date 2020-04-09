// glitches effects on titles
// const title = document.querySelector('h1');
// wrapCharacters(title);
// const subTitles = document.querySelectorAll('h2');

// for (const subtitle of subTitles) {
//   wrapCharacters(subtitle);
// }

function wrapLetters(string, selector) {
  const split = string.split('');
  document.querySelector(selector).innerHTML = split
    .map((letter) => `<span class="charSpan">${letter}</span>`)
    .join('');
}

wrapLetters('Thomas', 'h1 > span:first-child');
wrapLetters('Moreira', 'h1 > span:last-child');
wrapLetters('About', '#about > h2 > span');
wrapLetters('Projects', '#projects > h2 > span');
wrapLetters('Contact', '#contact > h2 > span');

// smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
