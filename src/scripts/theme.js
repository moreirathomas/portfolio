const themeToggle = document.querySelector('.theme-icon');
const themeIcon = document.querySelector('.theme-icon__btn');
const burgerMenu = document.querySelector('.menu-icon__btn');
const body = document.querySelector('body');
let isThemeDark = true; // dark theme as default

function changeTheme() {
  if (isThemeDark === false) {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    burgerMenu.classList.remove('theme-light');
    burgerMenu.classList.add('theme-dark');
    themeIcon.classList.remove('theme-light');
    themeIcon.classList.add('theme-dark');
  } else {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    burgerMenu.classList.remove('theme-dark');
    burgerMenu.classList.add('theme-light');
    themeIcon.classList.remove('theme-dark');
    themeIcon.classList.add('theme-light');
  }
}
themeToggle.addEventListener('click', function (event) {
  changeTheme();
  isThemeDark = !isThemeDark;
});
