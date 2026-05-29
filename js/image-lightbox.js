(() => {
  const imageSelector = ".article-modal-card img, .design-preview-card img";
  const ZOOM_SCALE = 2;
  const DRAG_THRESHOLD = 6;

  let lightbox = null;
  let lightboxImage = null;
  let lightboxFrame = null;
  let isZoomed = false;
  let panX = 0;
  let panY = 0;
  let pointerStart = null;

  function getVisibleImageRect() {
    if (!lightboxFrame || !lightboxImage?.naturalWidth || !lightboxImage?.naturalHeight) return null;

    const frameRect = lightboxFrame.getBoundingClientRect();
    const imageRatio = lightboxImage.naturalWidth / lightboxImage.naturalHeight;
    const frameRatio = frameRect.width / frameRect.height;
    const width = imageRatio > frameRatio ? frameRect.width : frameRect.height * imageRatio;
    const height = imageRatio > frameRatio ? frameRect.width / imageRatio : frameRect.height;
    const left = frameRect.left + (frameRect.width - width) / 2;
    const top = frameRect.top + (frameRect.height - height) / 2;

    return {
      bottom: top + height,
      height,
      left,
      right: left + width,
      top,
      width,
    };
  }

  function pointIsInRect(point, rect) {
    return (
      rect &&
      point.clientX >= rect.left &&
      point.clientX <= rect.right &&
      point.clientY >= rect.top &&
      point.clientY <= rect.bottom
    );
  }

  function clampPan() {
    if (!lightboxFrame || !lightboxImage) return;

    const frameRect = lightboxFrame.getBoundingClientRect();
    const imageRect = getVisibleImageRect();
    if (!imageRect) return;

    const scaledWidth = imageRect.width * ZOOM_SCALE;
    const scaledHeight = imageRect.height * ZOOM_SCALE;
    const maxX = Math.max(0, (scaledWidth - frameRect.width) / 2);
    const maxY = Math.max(0, (scaledHeight - frameRect.height) / 2);

    panX = Math.min(maxX, Math.max(-maxX, panX));
    panY = Math.min(maxY, Math.max(-maxY, panY));
  }

  function applyImageTransform() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.toggle("is-zoomed", isZoomed);
    if (!isZoomed) {
      lightboxImage.style.transform = "";
      lightboxImage.style.transformOrigin = "";
      return;
    }

    clampPan();
    lightboxImage.style.transform = `translate(${panX}px, ${panY}px) scale(${ZOOM_SCALE})`;
  }

  function resetZoom() {
    isZoomed = false;
    panX = 0;
    panY = 0;
    pointerStart = null;
    applyImageTransform();
  }

  function closeLightbox() {
    resetZoom();
    lightbox?.close();
  }

  function zoomIntoPoint(point) {
    const rect = getVisibleImageRect();
    if (!rect || !lightboxImage) return;

    const originX = ((point.clientX - rect.left) / rect.width) * 100;
    const originY = ((point.clientY - rect.top) / rect.height) * 100;

    isZoomed = true;
    panX = 0;
    panY = 0;
    lightboxImage.style.transformOrigin = `${originX}% ${originY}%`;
    applyImageTransform();
  }

  function ensureLightbox() {
    if (lightbox) return lightbox;

    lightbox = document.createElement("dialog");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-label", "Full screen image view");
    lightbox.innerHTML = `
      <button class="icon-button image-lightbox-close" type="button" aria-label="Close image view">&times;</button>
      <figure class="image-lightbox-frame">
        <img class="image-lightbox-image" alt="" draggable="false" />
      </figure>
    `;

    lightboxFrame = lightbox.querySelector(".image-lightbox-frame");
    lightboxImage = lightbox.querySelector(".image-lightbox-image");
    document.body.appendChild(lightbox);

    lightbox.querySelector(".image-lightbox-close")?.addEventListener("click", closeLightbox);

    lightbox.addEventListener("close", resetZoom);

    lightbox.addEventListener("pointerdown", (event) => {
      if (!lightboxImage || event.target.closest?.(".image-lightbox-close")) return;

      const point = { clientX: event.clientX, clientY: event.clientY };
      const imageRect = getVisibleImageRect();
      if (!pointIsInRect(point, imageRect)) {
        pointerStart = null;
        closeLightbox();
        return;
      }

      pointerStart = {
        id: event.pointerId,
        panX,
        panY,
        x: event.clientX,
        y: event.clientY,
        moved: false,
      };

      lightbox.setPointerCapture?.(event.pointerId);
    });

    lightbox.addEventListener("pointermove", (event) => {
      if (!pointerStart || !isZoomed || event.pointerId !== pointerStart.id) return;

      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart.moved =
        pointerStart.moved || Math.hypot(deltaX, deltaY) > DRAG_THRESHOLD;
      panX = pointerStart.panX + deltaX;
      panY = pointerStart.panY + deltaY;
      applyImageTransform();
    });

    lightbox.addEventListener("pointerup", (event) => {
      if (!pointerStart || event.pointerId !== pointerStart.id) return;

      lightbox.releasePointerCapture?.(event.pointerId);
      const didDrag = pointerStart.moved;
      const point = { clientX: event.clientX, clientY: event.clientY };
      const imageRect = getVisibleImageRect();
      pointerStart = null;

      if (!pointIsInRect(point, imageRect)) {
        closeLightbox();
        return;
      }

      if (didDrag) return;

      if (isZoomed) {
        resetZoom();
      } else {
        zoomIntoPoint(point);
      }
    });

    lightbox.addEventListener("pointercancel", () => {
      pointerStart = null;
    });

    return lightbox;
  }

  function openImageLightbox(image) {
    const dialog = ensureLightbox();
    if (!lightboxImage) return;

    resetZoom();
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "";

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const image = target.closest(imageSelector);
    if (!(image instanceof HTMLImageElement)) return;

    event.preventDefault();
    openImageLightbox(image);
  });
})();
