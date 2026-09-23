// Version 1 - JavaScript for interactivity

document.addEventListener("DOMContentLoaded", function () {

  // ---------- 1. Typewriter effect in the hero ----------
  // Cycles through a few roles to show both the dev and design sides
  const roles = [
    "Computer Engineering Student",
    "Web Developer",
    "Creative Designer"
  ];
  const roleTextEl = document.getElementById("roleText");

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    roleTextEl.textContent = currentRole.substring(0, charIndex);

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1400; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }

    setTimeout(typeLoop, delay);
  }

  setTimeout(typeLoop, 1400); // wait before first delete/retype cycle

  // ---------- 2. Highlight active nav link while scrolling ----------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  // ---------- 3. Mobile menu toggle ----------
  const menuToggle = document.getElementById("menuToggle");
  const navLinksList = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinksList.classList.toggle("open");
  });

  // Close the mobile menu after tapping a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksList.classList.remove("open");
    });
  });

});
