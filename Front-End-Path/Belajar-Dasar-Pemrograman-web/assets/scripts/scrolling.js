window.onscroll = function() {myFunction()};

// Get the navbar
let navbar = document.getElementById("nav-bar");

// Get the offset position of the navbar
let sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("scroll-nav")
  } else {
    navbar.classList.remove("scroll-nav");
  }
}