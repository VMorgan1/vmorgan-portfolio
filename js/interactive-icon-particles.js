(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReducedMotion.matches) return;

  const icons = [
    "icon 01.svg",
    "icon 02.svg",
    "icon 03.svg",
    "icon 04.svg",
    "icon 05.svg",
    "icon 06.svg",
    "icon 07.svg",
    "icon 08.svg",
    "icon 09.svg",
    "icon 10.svg",
    "icon 11.svg",
    "icon 12.svg",
    "icon 13.svg",
    "icon 14.svg",
    "icon 15.svg",
    "icon 16.svg",
    "icon 17.svg",
    "icon 18.svg",
    "icon 19.svg",
    "icon 20.svg",
    "icon 21.svg",
    "icon 22.svg",
    "icon 23.svg",
    "icon 24.svg",
    "icon 25.svg",
    "icon 26.svg",
    "icon 27.svg",
    "icon 28.svg",
    "icon 29.svg",
    "icon 30.svg",
    "icon 31.svg",
    "icon 32.svg",
    "icon 33.svg",
    "icon 34.svg",
    "icon 35.svg",
    "icon 36.svg",
    "icon 37.svg",
    "icon 38.svg",
    "icon 39.svg",
    "icon 40.svg",
  ].map((name) => `./assets/Icon%20hover/${name.replace(/ /g, "%20")}`);

  const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches;
  const hasCoarsePointer = window.matchMedia("(any-pointer: coarse)").matches;
  const mobileOnlyPointer = hasCoarsePointer && !hasFinePointer;
  const maxParticles = mobileOnlyPointer ? 10 : 30;
  const minMoveDistance = 26;
  const minMoveDelay = 80;
  const maxMoveDelay = 140;

  const layer = document.createElement("div");
  layer.className = "icon-particle-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  const activeParticles = [];
  const particlePool = [];
  let lastSpawnPoint = null;
  let lastMovePoint = null;
  let lastMoveSpawnAt = 0;
  let nextMoveDelay = randomBetween(minMoveDelay, maxMoveDelay);
  let pendingMove = null;
  let rafId = 0;
  let lastBurstAt = 0;
  let touchStartPoint = null;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function distance(pointA, pointB) {
    if (!pointA || !pointB) return Infinity;
    return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
  }

  function releaseParticle(particle) {
    const index = activeParticles.indexOf(particle);
    if (index >= 0) activeParticles.splice(index, 1);
    particle.classList.remove("is-active");
    particle.remove();
    particlePool.push(particle);
  }

  function getParticle() {
    const particle = particlePool.pop() || document.createElement("img");
    particle.className = "icon-particle";
    particle.alt = "";
    particle.decoding = "async";
    particle.draggable = false;
    return particle;
  }

  function enforceParticleLimit() {
    while (activeParticles.length >= maxParticles) {
      releaseParticle(activeParticles[0]);
    }
  }

  function spawnParticle({
    x,
    y,
    tx,
    ty,
    size,
    rotation,
    scale,
    duration,
    delay,
    opacity,
  }) {
    enforceParticleLimit();

    const particle = getParticle();
    particle.src = randomItem(icons);
    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);
    particle.style.setProperty("--size", `${size}px`);
    particle.style.setProperty("--rotate", `${rotation}deg`);
    particle.style.setProperty("--scale", String(scale));
    particle.style.setProperty("--duration", `${duration}ms`);
    particle.style.setProperty("--delay", `${delay}ms`);
    particle.style.setProperty("--opacity", String(opacity));

    activeParticles.push(particle);
    layer.appendChild(particle);

    window.requestAnimationFrame(() => {
      particle.classList.add("is-active");
    });

    window.setTimeout(() => releaseParticle(particle), duration + delay + 80);
  }

  function spawnTrailParticle(point, previousPoint, pointerType) {
    const mobile = pointerType !== "mouse";
    const dx = previousPoint ? point.x - previousPoint.x : 0;
    const drift = Math.max(-26, Math.min(26, dx * 0.28));
    const offset = mobile ? 16 : 24;
    const size = mobile ? randomBetween(14, 26) : randomBetween(18, 34);

    spawnParticle({
      x: point.x + randomBetween(-offset, offset),
      y: point.y + randomBetween(-offset, offset),
      tx: drift + randomBetween(-18, 18),
      ty: -randomBetween(mobile ? 26 : 32, mobile ? 64 : 82),
      size,
      rotation: randomBetween(-28, 28),
      scale: randomBetween(0.82, 1.2),
      duration: randomBetween(760, 1320),
      delay: randomBetween(0, 60),
      opacity: randomBetween(0.48, 0.78),
    });
  }

  function spawnBurst(point) {
    const count = Math.floor(randomBetween(6, 11));
    const mobile = mobileOnlyPointer;

    for (let index = 0; index < count; index += 1) {
      const angle = randomBetween(0, Math.PI * 2);
      const distanceAway = randomBetween(40, 120);

      spawnParticle({
        x: point.x + randomBetween(-5, 5),
        y: point.y + randomBetween(-5, 5),
        tx: Math.cos(angle) * distanceAway,
        ty: Math.sin(angle) * distanceAway - randomBetween(12, 34),
        size: mobile ? randomBetween(14, 26) : randomBetween(18, 34),
        rotation: randomBetween(-70, 70),
        scale: randomBetween(0.76, 1.28),
        duration: randomBetween(780, 1400),
        delay: randomBetween(0, 120),
        opacity: randomBetween(0.55, 0.82),
      });
    }
  }

  function queueMove(point, pointerType) {
    pendingMove = { point, pointerType };

    if (!rafId) {
      rafId = window.requestAnimationFrame(processPendingMove);
    }
  }

  function processPendingMove() {
    rafId = 0;
    if (!pendingMove) return;

    const now = performance.now();
    const point = pendingMove.point;
    const pointerType = pendingMove.pointerType;

    if (
      now - lastMoveSpawnAt >= nextMoveDelay &&
      distance(point, lastSpawnPoint) >= minMoveDistance
    ) {
      spawnTrailParticle(point, lastMovePoint, pointerType);
      lastSpawnPoint = point;
      lastMoveSpawnAt = now;
      nextMoveDelay = randomBetween(minMoveDelay, maxMoveDelay);
    }

    lastMovePoint = point;
    pendingMove = null;
  }

  function handleMouseMove(event) {
    queueMove({ x: event.clientX, y: event.clientY }, "mouse");
  }

  function handlePointerDown(event) {
    if (event.pointerType !== "pen") return;
    lastBurstAt = performance.now();
    spawnBurst({ x: event.clientX, y: event.clientY });
  }

  function handleTouchStart(event) {
    const touch = event.touches && event.touches[0];
    if (!touch) return;
    touchStartPoint = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event) {
    const touch = event.changedTouches && event.changedTouches[0];
    if (!touch || !touchStartPoint) return;
    if (distance({ x: touch.clientX, y: touch.clientY }, touchStartPoint) > 12) {
      touchStartPoint = null;
      return;
    }

    lastBurstAt = performance.now();
    spawnBurst({ x: touch.clientX, y: touch.clientY });
    touchStartPoint = null;
  }

  function handleClick(event) {
    if (performance.now() - lastBurstAt < 250) return;
    spawnBurst({ x: event.clientX, y: event.clientY });
  }

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("pointerdown", handlePointerDown, { passive: true });
  window.addEventListener("click", handleClick, { passive: true });
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("pointerdown", handlePointerDown);
    window.removeEventListener("click", handleClick);
    if (rafId) window.cancelAnimationFrame(rafId);
  });
})();
