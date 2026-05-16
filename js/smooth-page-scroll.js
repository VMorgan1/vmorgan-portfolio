(() => {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollDuration = 820;
  let activeScrollFrame = 0;

  function getAnchorTarget(link) {
    const href = link.getAttribute("href");
    if (!href || !href.includes("#")) return null;

    const url = new URL(href, window.location.href);
    const isSamePage =
      url.origin === window.location.origin &&
      url.pathname.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "");

    if (!isSamePage || !url.hash || url.hash === "#") return null;

    return document.getElementById(decodeURIComponent(url.hash.slice(1)));
  }

  function getScrollOffset() {
    const offsetValue = getComputedStyle(document.documentElement)
      .getPropertyValue("--anchor-offset")
      .trim();
    const offset = Number.parseFloat(offsetValue);
    return Number.isNaN(offset) ? 120 : offset;
  }

  function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  }

  function closeOpenNavMenu(link) {
    const menu = link.closest(".nav-menu");
    if (menu instanceof HTMLDetailsElement) {
      menu.open = false;
    }
  }

  function animateTo(target, hash) {
    if (activeScrollFrame) {
      window.cancelAnimationFrame(activeScrollFrame);
    }

    const startY = window.scrollY;
    const targetY = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - getScrollOffset(),
    );
    const distance = targetY - startY;
    const startTime = performance.now();
    document.documentElement.classList.add("is-anchor-scrolling");

    function step(now) {
      const progress = Math.min((now - startTime) / scrollDuration, 1);
      window.scrollTo(0, startY + distance * easeOutCubic(progress));

      if (progress < 1) {
        activeScrollFrame = window.requestAnimationFrame(step);
        return;
      }

      activeScrollFrame = 0;
      document.documentElement.classList.remove("is-anchor-scrolling");
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      window.history.pushState(null, "", hash);
    }

    activeScrollFrame = window.requestAnimationFrame(step);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href*='#']");
    if (!link) return;

    const target = getAnchorTarget(link);
    if (!target) return;

    event.preventDefault();
    closeOpenNavMenu(link);

    const hash = `#${target.id}`;

    if (reducedMotionQuery.matches) {
      window.scrollTo(0, Math.max(0, target.getBoundingClientRect().top + window.scrollY - getScrollOffset()));
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      window.history.pushState(null, "", hash);
      return;
    }

    animateTo(target, hash);
  });
})();
