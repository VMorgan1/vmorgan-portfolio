const caseStudies = Array.isArray(window.CASE_STUDIES) ? window.CASE_STUDIES : [];

function getExplorationSortValue(exploration) {
  const dateValue = Date.parse(exploration.dateAdded || exploration.date || "");
  if (!Number.isNaN(dateValue)) return dateValue;
  return Number(exploration.sortOrder) || 0;
}

const explorations = Array.isArray(window.EXPLORATIONS)
  ? [...window.EXPLORATIONS].sort((a, b) => getExplorationSortValue(b) - getExplorationSortValue(a))
  : [];

const caseStudiesGrid = document.getElementById("caseStudiesGrid");
const explorationGrid = document.getElementById("explorationGrid");

const caseStudyModal = document.getElementById("caseStudyModal");
const caseStudyClose = document.getElementById("caseStudyClose");
const caseStudyTitle = document.getElementById("caseStudyTitle");
const caseStudyDate = document.getElementById("caseStudyDate");
const caseStudyCategory = document.getElementById("caseStudyCategory");
const caseStudyPreface = document.getElementById("caseStudyPreface");
const caseStudyBody = document.getElementById("caseStudyBody");
const caseStudyShareButton = document.getElementById("caseStudyShareButton");

const designPreviewModal = document.getElementById("designPreviewModal");
const designPreviewClose = document.getElementById("designPreviewClose");
const designPreviewTitle = document.getElementById("designPreviewTitle");
const designPreviewDescription = document.getElementById("designPreviewDescription");
const designPreviewVisual = document.getElementById("designPreviewVisual");
const designPreviewShare = document.getElementById("designPreviewShare");
const designPreviewShareButton = document.getElementById("designPreviewShareButton");
const designPreviewX = document.getElementById("designPreviewX");

let activeCaseStudy = null;
let activeExploration = null;

function buildCaseStudyUrl(slug) {
  const url = new URL(window.location.href);
  url.searchParams.delete("design");
  url.searchParams.set("case-study", slug);
  return url.toString();
}

function buildDesignUrl(slug) {
  const url = new URL(window.location.href);
  url.searchParams.delete("case-study");
  url.searchParams.set("design", slug);
  return url.toString();
}

function resetDesignsUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("case-study");
  url.searchParams.delete("design");
  window.history.replaceState({}, "", `${url.pathname}${url.hash}`);
}

function syncDesignsUrl() {
  if (activeCaseStudy?.slug) {
    window.history.replaceState({}, "", buildCaseStudyUrl(activeCaseStudy.slug));
    return;
  }

  if (activeExploration?.slug) {
    window.history.replaceState({}, "", buildDesignUrl(activeExploration.slug));
    return;
  }

  resetDesignsUrl();
}

async function shareLink({ title, text, url, button }) {
  const originalTitle = button?.getAttribute("title") || "";
  const originalAria = button?.getAttribute("aria-label") || "";

  const showCopiedState = () => {
    if (!button) return;
    button.setAttribute("title", "Link copied");
    button.setAttribute("aria-label", "Link copied");
    window.setTimeout(() => {
      button.setAttribute("title", originalTitle);
      button.setAttribute("aria-label", originalAria);
    }, 1800);
  };

  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      showCopiedState();
    }
  } catch (error) {
    if (error?.name === "AbortError") return;

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      showCopiedState();
    }
  }
}

function renderBodyBlock(block) {
  if (block.type === "heading") {
    return `
      <div class="article-section-block">
        <strong class="article-section-title article-section-title-${block.level || 2}">${block.content}</strong>
      </div>
    `;
  }

  if (block.type === "paragraph") {
    return `<p>${block.content}</p>`;
  }

  if (block.type === "list") {
    return `
      <ul class="article-list">
        ${block.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  if (block.type === "image") {
    return `
      <figure class="article-media">
        <img src="${block.src}" width="1440" height="900" alt="${block.alt}" loading="lazy" decoding="async" />
      </figure>
    `;
  }

  if (block.type === "video") {
    if (block.src) {
      return `
        <figure class="article-media">
          <video controls playsinline ${block.poster ? `poster="${block.poster}"` : ""}>
            <source src="${block.src}" />
          </video>
        </figure>
      `;
    }

    return `
      <figure class="article-media article-media-placeholder">
        <div class="article-video-placeholder">Video slot ready</div>
      </figure>
    `;
  }

  return "";
}

function renderCaseStudyServicesCta() {
  return `
    <aside class="case-study-services-cta">
      <div>
        <p class="eyebrow">Ready to design yours?</p>
        <h3>Let us shape the product experience your users should have.</h3>
        <p>
          If this case study feels close to the kind of product you want to build or improve,
          explore the services I offer and let us find the right design support.
        </p>
      </div>
      <a class="button" href="./index.html#services">View my services</a>
    </aside>
  `;
}

function openCaseStudy(caseStudy) {
  activeCaseStudy = caseStudy;
  activeExploration = null;
  caseStudyTitle.textContent = caseStudy.title;
  caseStudyDate.textContent = caseStudy.date;
  caseStudyCategory.textContent = caseStudy.category;
  caseStudyPreface.textContent = caseStudy.summary;
  caseStudyBody.innerHTML = `${caseStudy.body.map(renderBodyBlock).join("")}${renderCaseStudyServicesCta()}`;
  syncDesignsUrl();
  caseStudyModal.showModal();
}

function openExploration(exploration) {
  activeExploration = exploration;
  activeCaseStudy = null;
  designPreviewTitle.textContent = exploration.title;
  const hasDescription = Boolean(exploration.description?.trim());
  designPreviewDescription.textContent = hasDescription ? exploration.description : "";
  designPreviewDescription.hidden = !hasDescription;
  designPreviewVisual.innerHTML = `
    <img class="design-preview-image" src="${exploration.image}" width="1600" height="1200" alt="${exploration.title}" loading="lazy" decoding="async" />
  `;

  const explorationPostUrl = exploration.postUrl || exploration.xUrl || "";
  const explorationPostLabel = exploration.postLabel || "View in X";
  const hasShareActions = Boolean(explorationPostUrl);

  if (designPreviewX) {
    designPreviewX.hidden = !hasShareActions;
    designPreviewX.href = explorationPostUrl;
    designPreviewX.textContent = explorationPostLabel;
  }

  if (designPreviewShare) {
    designPreviewShare.hidden = !hasShareActions;
  }

  syncDesignsUrl();
  designPreviewModal.showModal();
}

function resizeExplorationCard(card) {
  if (!explorationGrid || window.matchMedia("(max-width: 760px)").matches) {
    card.style.gridRowEnd = "";
    return;
  }

  const rowHeight = 8;
  const gap = 16;
  card.style.gridRowEnd = "auto";
  const cardHeight = card.getBoundingClientRect().height;
  const rowSpan = Math.ceil((cardHeight + gap) / (rowHeight + gap));
  card.style.gridRowEnd = `span ${rowSpan}`;
}

function resizeExplorationMasonry() {
  document.querySelectorAll(".exploration-grid .masonry-card").forEach((card) => {
    resizeExplorationCard(card);
  });
}

function renderCaseStudies() {
  caseStudies.forEach((caseStudy, index) => {
    const card = document.createElement("article");
    card.className = "case-study-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.dataset.caseStudy = String(index);
    card.setAttribute("aria-label", `Open case study: ${caseStudy.title}`);
    card.innerHTML = `
      <div class="project-visual" aria-hidden="true">
        ${caseStudy.coverImage ? `<img class="case-study-cover" src="${caseStudy.coverImage}" width="1200" height="760" alt="" loading="lazy" decoding="async" />` : ""}
      </div>
      <span class="blog-tag">${caseStudy.category}</span>
      <h3>${caseStudy.title}</h3>
      <p>${caseStudy.summary}</p>
      <div class="tags">
        ${caseStudy.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    `;
    caseStudiesGrid.appendChild(card);
  });
}

function renderExplorations() {
  explorations.forEach((exploration, index) => {
    const card = document.createElement("article");
    card.className = "masonry-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.dataset.exploration = String(index);
    card.setAttribute("aria-label", `Open design exploration: ${exploration.title}`);
    card.innerHTML = `
      <div class="masonry-visual" aria-hidden="true">
        <img class="masonry-image" src="${exploration.image}" width="1200" height="900" alt="" loading="lazy" decoding="async" />
      </div>
      <h3>${exploration.title}</h3>
    `;
    explorationGrid.appendChild(card);

    const image = card.querySelector("img");
    if (image?.complete) {
      resizeExplorationCard(card);
    } else {
      image?.addEventListener("load", () => resizeExplorationCard(card), { once: true });
      image?.addEventListener("error", () => resizeExplorationCard(card), { once: true });
    }
  });

  resizeExplorationMasonry();
}

caseStudiesGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const trigger = target.closest("[data-case-study]");
  if (!trigger) return;
  openCaseStudy(caseStudies[Number(trigger.getAttribute("data-case-study"))]);
});

caseStudiesGrid.addEventListener("keydown", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  const trigger = event.target.closest("[data-case-study]");
  if (!trigger) return;
  event.preventDefault();
  openCaseStudy(caseStudies[Number(trigger.getAttribute("data-case-study"))]);
});

explorationGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const trigger = target.closest("[data-exploration]");
  if (!trigger) return;
  openExploration(explorations[Number(trigger.getAttribute("data-exploration"))]);
});

explorationGrid.addEventListener("keydown", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  const trigger = event.target.closest("[data-exploration]");
  if (!trigger) return;
  event.preventDefault();
  openExploration(explorations[Number(trigger.getAttribute("data-exploration"))]);
});

caseStudyClose.addEventListener("click", () => {
  caseStudyModal.close();
});

designPreviewClose.addEventListener("click", () => {
  designPreviewModal.close();
});

caseStudyModal.addEventListener("close", () => {
  activeCaseStudy = null;
  syncDesignsUrl();
});

designPreviewModal.addEventListener("close", () => {
  activeExploration = null;
  syncDesignsUrl();
});

if (caseStudyShareButton) {
  caseStudyShareButton.addEventListener("click", () => {
    if (!activeCaseStudy) return;
    shareLink({
      title: activeCaseStudy.title,
      text: activeCaseStudy.summary,
      url: buildCaseStudyUrl(activeCaseStudy.slug),
      button: caseStudyShareButton,
    });
  });
}

if (designPreviewShareButton) {
  designPreviewShareButton.addEventListener("click", () => {
    if (!activeExploration) return;
    shareLink({
      title: activeExploration.title,
      text: activeExploration.description,
      url: buildDesignUrl(activeExploration.slug),
      button: designPreviewShareButton,
    });
  });
}

function openSharedItemFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const caseStudySlug = params.get("case-study");
  const designSlug = params.get("design");

  if (caseStudySlug) {
    const caseStudy = caseStudies.find((item) => item.slug === caseStudySlug);
    if (caseStudy) {
      openCaseStudy(caseStudy);
      return;
    }
  }

  if (designSlug) {
    const exploration = explorations.find((item) => item.slug === designSlug);
    if (exploration) {
      openExploration(exploration);
    }
  }
}

document.querySelectorAll(".nav-menu-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    link.closest(".nav-menu")?.removeAttribute("open");
  });
});

window.addEventListener("resize", () => {
  window.requestAnimationFrame(resizeExplorationMasonry);
});

renderCaseStudies();
renderExplorations();
openSharedItemFromUrl();
