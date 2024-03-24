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

// Initialize custom cursor
let cursor;

document.addEventListener("DOMContentLoaded", function () {
  // Initialize cursor and additional effects
  cursor = new cursoreffects.rainbowCursor({
    colors: ["#DBF2BD"],
    // Initial default color
    length: 14,
    size: 18,
  });

  // Adding custom cursor using jQuery
  const circleCursor = $("<div class='circle-cursor'></div>").appendTo(
    "body"
  );

  $(document).on("mousemove", function (e) {
    circleCursor.css({
      left: e.clientX + "px",
      top: e.clientY + "px",
    });
  });

  circleCursor.addClass("visible");
});
