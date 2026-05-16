(() => {
  const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
  if (!navLinks.length) return;

  function normalizePath(pathname) {
    const path = pathname.replace(/\/$/, "");
    return path.endsWith("/index.html") ? path.replace("/index.html", "") : path;
  }

  function setActiveNav() {
    const currentPath = normalizePath(window.location.pathname);
    const currentHash = window.location.hash;

    navLinks.forEach((link) => {
      const url = new URL(link.getAttribute("href"), window.location.href);
      const linkPath = normalizePath(url.pathname);
      const isSamePath = linkPath === currentPath;
      const isHashLink = Boolean(url.hash);
      const isActive = isHashLink ? isSamePath && url.hash === currentHash : isSamePath && !currentHash;

      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  setActiveNav();
  window.addEventListener("hashchange", setActiveNav);
})();
