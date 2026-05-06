const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const links = [...document.querySelectorAll(".nav-links a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-42% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const note = event.currentTarget.querySelector(".form-note");
  note.textContent = "Thanks. Your message is ready to send from your connected form service.";
  event.currentTarget.reset();
});
