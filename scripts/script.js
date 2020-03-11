// dark mode
const themeToggle = document.querySelector('.toggle-wrapper')
const themeIcon = document.querySelector('.theme-toggle')
const body = document.querySelector('body')
let isThemeDark = false

function changeTheme(){
    if (isThemeDark === false){
        body.classList.remove('theme-light')
        body.classList.add('theme-dark')
        themeIcon.classList.remove('theme-light')
        themeIcon.classList.add('theme-dark')
    }
    else {
        body.classList.remove('theme-dark')
        body.classList.add('theme-light')
        themeIcon.classList.remove('theme-dark')
        themeIcon.classList.add('theme-light')
    }
}
themeToggle.addEventListener('click', function(event){
    themeIcon.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(0.9)'}],
        {duration: 100},
        {easing: 'ease-in-out'}
    )
    changeTheme()
    isThemeDark = !isThemeDark
})

// glitches effects on titles
function wrapCharacters(element) {
    let child = element.firstChild;
    while (child) {
        var nextSibling = child.nextSibling

        if (child.nodeType === 1) { // element node
            wrapCharacters(child)
        }
        else if (child.nodeType === 3) { // text node
            var charSpan = document.createDocumentFragment()

            for (var i = 0, len = child.nodeValue.length; i < len; i++) {
                var span = document.createElement('span')
                span.innerHTML = child.nodeValue.charAt(i)
                charSpan.appendChild(span)
                span.classList.add('charSpan')
            }
            child.parentNode.replaceChild(charSpan, child)
        }
        // child.classList.add('charSpan')
        child = nextSibling
    }
}
const title = document.querySelector('h1')
wrapCharacters(title)
const subTitles = document.querySelectorAll('h2')
for (const subtitle of subTitles) {
    wrapCharacters(subtitle)
}
// smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    })
})

// // dropdown menu
// const menuToggle = document.querySelector('.gg-menu-round')
// const dropDownMenu = document.querySelector('nav .gg-menu-round ul')
// const menuItems = document.querySelectorAll('nav .gg-menu-round ul li')
// console.log(menuItems)
// let isMenuShown = false

// function showMenu(){
//     if (isMenuShown === false){
//         dropDownMenu.classList.add('isShown')
//         menuToggle.style.color ='rgb(251, 32, 59)'
//     }
//     else {
//         dropDownMenu.classList.remove('isShown')
//         menuToggle.style.color ='inherit'
//     }
//     isMenuShown = !isMenuShown
// }


// concurrent "touch AND mouse/keyboard" event binding

// set up event listeners for touch
// menuToggle.addEventListener('touchend', function(e) {
//     // prevent compatibility mouse events and click
//     e.preventDefault();

//     menuToggle.animate([
//         {transform: 'scale(1)'},
//         {transform: 'scale(0.9)'}],
//         {duration: 100},
//         {easing: 'ease-in-out'}
//     )
//     showMenu()
// })

// for (const item of menuItems) {
//     item.addEventListener('touchend', function(e){
//         e.preventDefault();

//         showMenu()
//     })
// }

// set up event listeners for mouse/keyboard
menuToggle.addEventListener('click', function(e){

    menuToggle.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(0.9)'}],
        {duration: 100},
        {easing: 'ease-in-out'}
    )
    showMenu()
})

for (const item of menuItems) {
    item.addEventListener('click', function(e){
        showMenu()
    })
}