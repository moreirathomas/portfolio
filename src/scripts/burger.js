const burgerBtn = document.querySelector('.menu-icon');
let burgerOpen = false;
let showMenu = document.querySelector('#menu-btn');
const menu = document.querySelector('.nav-links');
const menuLinks = document.querySelectorAll('.nav-links > li');
burgerBtn.addEventListener('click', () => {
  if (!burgerOpen) {
    burgerBtn.classList.add('open');
    burgerOpen = true;
  } else {
    burgerBtn.classList.remove('open');
    burgerOpen = false;
  }
});
showMenu.addEventListener('change', () => {
  if (showMenu.checked) {
    menu.classList.add('shown');
    menu.parentElement.classList.add('shown');
  } else {
    menu.classList.remove('shown');
    menu.parentElement.classList.remove('shown');
  }
});
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (showMenu.checked) {
      showMenu.checked = false;
      showMenu.dispatchEvent(new Event('change'));
      burgerBtn.classList.remove('open');
      burgerOpen = false;
    }
  });
});
