(() => {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotionQuery.matches) return;

  const revealSelectors = [
    ".panel",
    ".project-card",
    ".blog-card",
    ".insight-card",
    ".case-study-card",
    ".exploration-card",
    ".masonry-card",
    ".service-item",
    ".service-enquiry",
    ".timeline-item",
    ".value-lead",
    ".value-card",
    ".faq-item",
    ".quote-card",
    ".contact-card",
    ".estimate-card",
  ];

  const selector = revealSelectors.join(",");
  const revealItems = new Set();
  const preparedItems = new WeakSet();
  let ticking = false;
  let revealIndex = 0;

  function isDialogContent(element) {
    return Boolean(element.closest("dialog"));
  }

  function prepareElement(element) {
    if (preparedItems.has(element) || isDialogContent(element)) return;

    preparedItems.add(element);
    revealItems.add(element);
    element.classList.add("scroll-reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(revealIndex % 5, 4) * 45}ms`);
    revealIndex += 1;
  }

  function scanTree(root = document) {
    if (root !== document && root.nodeType !== Node.ELEMENT_NODE) return;

    if (root !== document && root.matches?.(selector)) {
      prepareElement(root);
    }

    root.querySelectorAll?.(selector).forEach(prepareElement);
    requestRevealCheck();
  }

  function revealElement(element) {
    element.classList.add("is-visible");
    revealItems.delete(element);

    window.setTimeout(() => {
      element.classList.add("has-revealed");
    }, 900);
  }

  function checkRevealItems() {
    ticking = false;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const revealLine = viewportHeight * 0.9;

    revealItems.forEach((element) => {
      if (!document.body.contains(element)) {
        revealItems.delete(element);
        return;
      }

      const rect = element.getBoundingClientRect();
      const isEnteringView = rect.top <= revealLine && rect.bottom >= 0;

      if (isEnteringView) {
        revealElement(element);
      }
    });
  }

  function requestRevealCheck() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(checkRevealItems);
  }

  // Immediately reveal elements already in the viewport on load.
  // This avoids an invisible-content flash for above-the-fold panels.
  function revealInitialViewport() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const revealLine = viewportHeight * 0.9;

    revealItems.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isAlreadyVisible = rect.top <= revealLine && rect.bottom >= 0;

      if (isAlreadyVisible) {
        // Zero delay for elements already on screen — no jarring flash
        element.style.setProperty("--reveal-delay", "0ms");
        revealElement(element);
      }
    });
  }

  function initScrollReveal() {
    document.documentElement.classList.add("has-scroll-reveal");
    scanTree();

    // Reveal above-the-fold content immediately after first paint
    window.requestAnimationFrame(() => {
      revealInitialViewport();
    });

    window.addEventListener("scroll", requestRevealCheck, { passive: true });
    window.addEventListener("resize", requestRevealCheck, { passive: true });
    window.addEventListener("orientationchange", requestRevealCheck, { passive: true });

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => scanTree(node));
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Belt-and-suspenders passes to catch late-rendered dynamic cards
    window.setTimeout(requestRevealCheck, 120);
    window.setTimeout(requestRevealCheck, 450);
  }

  function scheduleScrollReveal() {
    const runWhenIdle = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(initScrollReveal, { timeout: 1200 });
        return;
      }

      window.setTimeout(initScrollReveal, 500);
    };

    if (document.readyState === "complete") {
      runWhenIdle();
      return;
    }

    window.addEventListener("load", runWhenIdle, { once: true });
  }

  scheduleScrollReveal();
})();
