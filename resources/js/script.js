/*Clear highlight*/
let navLinks = document.querySelectorAll("header ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((otherLink) => {
      otherLink.classList.remove("highlight");
    });
    link.classList.add("highlight");
  });
});

//Preloader
document.addEventListener("DOMContentLoaded", function () {
  var counter = document.getElementById("counter");
  var percent = 0;
  var interval = setInterval(function () {
    percent++;
    counter.textContent = percent + "%";
    if (percent >= 100) {
      clearInterval(interval);
      // Once loading is complete, hide the loader
      document.getElementById("loader").style.display = "none";
    }
  }, 20); // Adjust the interval as needed
});