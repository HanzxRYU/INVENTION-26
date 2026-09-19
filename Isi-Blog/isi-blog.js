// ================= NAVBAR SCROLL EFFECT (sama seperti blog.js) =================
const mainNav = document.getElementById("main-nav");
const navContainer = document.getElementById("nav-container");
const navLogo = document.getElementById("nav-logo");
const navItems = document.querySelectorAll(".nav-item");
const navToggle = document.getElementById("nav-toggle");
const navToggleIcon = document.getElementById("nav-toggle-icon");
const mobileMenu = document.getElementById("mobile-menu");

window.addEventListener("scroll", function () {
  if (window.scrollY > 40) {
    mainNav.classList.remove("top-0", "py-5");
    mainNav.classList.add("top-4");
    navContainer.classList.remove("max-w-5xl", "px-4");
    navContainer.classList.add(
      "max-w-xl", "px-6", "py-3", "mx-4",
      "bg-[#FFA2A2]/50", "backdrop-blur-md", "rounded-full",
      "border", "border-white/80", "shadow-lg",
    );
    navLogo.classList.replace("text-black", "text-white");
    navToggle.classList.replace("text-black", "text-white");
    navItems.forEach((item) => {
      item.classList.remove("text-gray-600", "hover:text-black");
      item.classList.add("text-white", "hover:opacity-80");
    });
  } else {
    mainNav.classList.remove("top-4");
    mainNav.classList.add("top-0", "py-5");
    navContainer.classList.remove(
      "max-w-xl", "px-6", "py-3", "mx-4",
      "bg-[#FFA2A2]/50", "backdrop-blur-md", "rounded-full",
      "border", "border-white/80", "shadow-lg",
    );
    navContainer.classList.add("max-w-5xl", "px-4");
    navLogo.classList.replace("text-white", "text-black");
    navToggle.classList.replace("text-white", "text-black");
    navItems.forEach((item) => {
      item.classList.remove("text-white", "hover:opacity-80");
      item.classList.add("text-gray-600", "hover:text-black");
    });
  }
});

// ================= KLIK scroll-top-link → SCROLL KE ATAS =================
document.querySelectorAll(".scroll-top-link").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ================= MENU MOBILE (HAMBURGER) =================
function tutupMenuMobile() {
  mobileMenu.classList.add("hidden");
  navToggleIcon.classList.replace("fa-xmark", "fa-bars");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", function () {
  const lagiTertutup = mobileMenu.classList.contains("hidden");
  if (lagiTertutup) {
    mobileMenu.classList.remove("hidden");
    navToggleIcon.classList.replace("fa-bars", "fa-xmark");
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    tutupMenuMobile();
  }
});

document.querySelectorAll(".mobile-link").forEach(function (link) {
  link.addEventListener("click", tutupMenuMobile);
});

document.addEventListener("click", function (e) {
  if (
    !mobileMenu.classList.contains("hidden") &&
    !mobileMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    tutupMenuMobile();
  }
});