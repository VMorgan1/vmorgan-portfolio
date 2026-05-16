const featuredCaseStudySlugs = [
  "pharmachain-medicine-access-and-delivery",
  "swiftwings-case-study",
  "second-wallet-advanced-loan-management-system",
];

const projects = Array.isArray(window.FEATURED_CASE_STUDIES)
  ? window.FEATURED_CASE_STUDIES
  : Array.isArray(window.CASE_STUDIES)
    ? featuredCaseStudySlugs
        .map((slug) => window.CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug))
        .filter(Boolean)
    : [];

let caseStudiesLoadPromise = null;

function loadCaseStudies() {
  if (Array.isArray(window.CASE_STUDIES)) {
    return Promise.resolve(window.CASE_STUDIES);
  }

  if (caseStudiesLoadPromise) return caseStudiesLoadPromise;

  caseStudiesLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "./js/case-studies-data.js";
    script.async = true;
    script.onload = () => resolve(Array.isArray(window.CASE_STUDIES) ? window.CASE_STUDIES : []);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return caseStudiesLoadPromise;
}

const services = [
  {
    name: "Landing page design",
    rate: 480,
    turnaround: "3-5 days",
    description:
      "A clear, polished landing page experience that helps people understand the offer and take the next step.",
    mediaSrc: "./assets/Video/Landing pages sideshow.mp4",
    mediaType: "video",
    mediaAlt: "Landing page design slideshow preview",
  },
  {
    name: "Mobile app design",
    rate: 1900,
    turnaround: "1-2 weeks",
    description:
      "Thoughtful app screens and flows for mobile products that need to feel simple, useful, and ready for real people.",
    mediaSrc: "./assets/Video/mobile screens.mp4",
    mediaType: "video",
    mediaAlt: "Mobile app screen preview video",
  },
  {
    name: "SaaS or end-to-end product design",
    rate: 2800,
    turnaround: "2-4 weeks",
    description:
      "Support from early product thinking through visual design, responsive states, and build-ready handoff.",
    mediaSrc: "./assets/Video/saas screens.mp4",
    mediaType: "video",
    mediaAlt: "SaaS product design screen preview video",
  },
];

const CAL_BOOKING_URL = "https://cal.com/vmorgan/30min";
const WHATSAPP_URL = "https://wa.me/2349039113926";
const SERVICE_ORDER_STORAGE_KEY = "vmorgan-service-order";
const BOOK_CALL_STORAGE_KEY = "vmorgan-book-call-lead";

const addonDetails = {
  research: {
    title: "Discovery notes",
    copy:
      "A short, useful readout of what we learned, what matters most, and how those insights shape the design direction.",
  },
  "design-system": {
    title: "Design system starter",
    copy:
      "A simple UI foundation with reusable styles and patterns so future screens feel consistent instead of stitched together.",
  },
  handoff: {
    title: "Build handoff guide",
    copy:
      "Clear notes for developers covering screen behavior, responsive details, states, and the small decisions that make the build smoother.",
  },
  revision: {
    title: "Extra revision round",
    copy:
      "One more structured feedback loop after the main revision cycle to refine details without reopening the full scope.",
  },
};

const homepageArticles = Array.isArray(window.INSIGHTS) ? window.INSIGHTS : [];

function getExplorationSortValue(exploration) {
  const dateValue = Date.parse(exploration.dateAdded || exploration.date || "");
  if (!Number.isNaN(dateValue)) return dateValue;
  return Number(exploration.sortOrder) || 0;
}

const sortedExplorations = Array.isArray(window.EXPLORATIONS)
  ? [...window.EXPLORATIONS].sort((a, b) => getExplorationSortValue(b) - getExplorationSortValue(a))
  : [];

const moreDesigns = sortedExplorations.slice(0, 8);

const projectGrid = document.getElementById("projectGrid");
const servicesList = document.getElementById("servicesList");
const serviceSelect = document.getElementById("serviceSelect");
const timelineSelect = document.getElementById("timelineSelect");
const addOnInputs = Array.from(document.querySelectorAll(".addons input"));
const addonInfoButtons = Array.from(document.querySelectorAll(".addon-info-button"));
const addonPopover = document.getElementById("addonPopover");
const addonPopoverTitle = document.getElementById("addonPopoverTitle");
const addonPopoverCopy = document.getElementById("addonPopoverCopy");
const estimateValue = document.getElementById("estimateValue");
const estimateSummary = document.getElementById("estimateSummary");
const serviceSuccess = document.getElementById("serviceSuccess");
const serviceSuccessCopy = document.getElementById("serviceSuccessCopy");
const blogGrid = document.querySelector(".blog-grid");
const masonryGrid = document.getElementById("masonryGrid");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalSummary = document.getElementById("modalSummary");
const modalTags = document.getElementById("modalTags");
const modalMetrics = document.getElementById("modalMetrics");
const articleModal = document.getElementById("articleModal");
const articleClose = document.getElementById("articleClose");
const articleTitle = document.getElementById("articleTitle");
const articleDate = document.getElementById("articleDate");
const articleCategory = document.getElementById("articleCategory");
const articlePreface = document.getElementById("articlePreface");
const articleBody = document.getElementById("articleBody");
const designPreviewModal = document.getElementById("designPreviewModal");
const designPreviewClose = document.getElementById("designPreviewClose");
const designPreviewTitle = document.getElementById("designPreviewTitle");
const designPreviewDescription = document.getElementById("designPreviewDescription");
const designPreviewVisual = document.getElementById("designPreviewVisual");
const designPreviewShare = document.getElementById("designPreviewShare");
const designPreviewX = document.getElementById("designPreviewX");
const bookCallModal = document.getElementById("bookCallModal");
const bookCallForm = document.getElementById("bookCallForm");
const bookCallTitle = document.getElementById("bookCallTitle");
const bookCallClose = document.getElementById("bookCallClose");
const bookCallName = document.getElementById("bookCallName");
const bookCallEmail = document.getElementById("bookCallEmail");
const bookCallServiceName = document.getElementById("bookCallServiceName");
const bookCallSubmittedAt = document.getElementById("bookCallSubmittedAt");
const bookCallContent = document.getElementById("bookCallContent");
const bookCallSuccess = document.getElementById("bookCallSuccess");
const serviceOrderModal = document.getElementById("serviceOrderModal");
const serviceOrderForm = document.getElementById("serviceOrderForm");
const serviceOrderTitle = document.getElementById("serviceOrderTitle");
const serviceOrderClose = document.getElementById("serviceOrderClose");
const serviceOrderContent = document.getElementById("serviceOrderContent");
const serviceOrderSuccess = document.getElementById("serviceOrderSuccess");
const serviceOrderServiceName = document.getElementById("serviceOrderServiceName");
const serviceOrderSubmittedAt = document.getElementById("serviceOrderSubmittedAt");
const orderName = document.getElementById("orderName");
const orderEmail = document.getElementById("orderEmail");
const orderBrief = document.getElementById("orderBrief");
const orderTimeline = document.getElementById("orderTimeline");

let selectedServiceIndex = 0;
let selectedBookCallServiceIndex = 0;
let activeAddonButton = null;

function renderProjects() {
  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open details for ${project.title}`);
    card.dataset.project = String(index);
    card.innerHTML = `
      <div class="project-visual" aria-hidden="true">
        ${project.coverImage ? `<img class="case-study-cover" src="${project.coverImage}" width="1200" height="760" alt="" loading="lazy" decoding="async" />` : ""}
      </div>
      <div class="project-caption">
        <div>
          <p class="eyebrow">Featured project 0${index + 1}</p>
          <h3>${project.title}</h3>
        </div>
      </div>
      <p>${project.summary}</p>
      <div class="tags">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    `;
    projectGrid.appendChild(card);
  });

  projectGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const trigger = target.closest("[data-project]");
    if (!trigger) return;
    const index = Number(trigger.getAttribute("data-project"));
    openProjectModal(projects[index]);
  });

  projectGrid.addEventListener("keydown", (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    const trigger = event.target.closest("[data-project]");
    if (!trigger) return;
    event.preventDefault();
    const index = Number(trigger.getAttribute("data-project"));
    openProjectModal(projects[index]);
  });
}

function renderHomepageInsights() {
  if (!blogGrid) return;

  blogGrid.innerHTML = homepageArticles
    .slice(0, 3)
    .map(
      (article, index) => {
        const preview =
          article.previewImage ||
          article.body?.find((block) => block.type === "image")?.src ||
          "";
        const previewAlt =
          article.previewAlt ||
          article.body?.find((block) => block.type === "image")?.alt ||
          article.title;

        return `
          <article class="insight-card" tabindex="0" role="button" data-article="${index}" aria-label="Open insight article">
            ${
              preview
                ? `<div class="insight-card-visual"><img src="${preview}" width="1200" height="900" alt="${previewAlt}" loading="lazy" decoding="async" /></div>`
                : ""
            }
            <span class="blog-tag">${article.category}</span>
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
          </article>
        `;
      },
    )
    .join("");
}

async function openProjectModal(project) {
  if (!project) return;

  try {
    const caseStudies = await loadCaseStudies();
    const fullProject = caseStudies.find((caseStudy) => caseStudy.slug === project.slug);
    openArticle(fullProject || project);
  } catch {
    openArticle(project);
  }
}

function renderCaseStudyServicesCta(href = "#services") {
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
      <a class="button" href="${href}" data-services-cta>View my services</a>
    </aside>
  `;
}

function renderBodyBlock(block) {
  if (block.type === "heading") {
    return `
      <div class="article-section-block">
        <strong class="article-section-title article-section-title-2">${block.content}</strong>
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

function openArticle(article) {
  articleTitle.textContent = article.title;
  articleDate.textContent = article.date;
  articleCategory.textContent = article.category;
  articlePreface.textContent = article.summary;
  const articleContent = Array.isArray(article.body)
    ? article.body.map(renderBodyBlock).join("")
    : `<p>${article.summary}</p>`;
  articleBody.innerHTML = article.slug
    ? `${articleContent}${renderCaseStudyServicesCta("#services")}`
    : articleContent;
  articleModal.showModal();
}

function renderServices() {
  services.forEach((service, index) => {
    const card = document.createElement("article");
    card.className = "service-item";
    const mediaMarkup = service.mediaSrc
      ? service.mediaType === "video"
        ? `<video class="service-media protected-service-video" aria-label="${
            service.mediaAlt || service.name
          }" muted loop playsinline preload="none" controlsList="nodownload noplaybackrate noremoteplayback" disablepictureinpicture disableremoteplayback>
            <source src="${service.mediaSrc}" type="video/mp4" />
            <track kind="captions" src="./assets/empty-captions.vtt" srclang="en" label="No speech" default />
          </video>`
        : `<img class="service-media" src="${service.mediaSrc}" width="1200" height="760" alt="${service.mediaAlt || service.name}" loading="lazy" decoding="async" />`
      : "<span>Add image / video / GIF</span>";
    card.innerHTML = `
      <div class="service-media-placeholder${service.mediaSrc ? " has-media" : ""}">
        ${mediaMarkup}
      </div>
      <h3>${service.name}</h3>
      <div class="service-meta">
        <span>${service.turnaround}</span>
      </div>
      <p>${service.description}</p>
      <div class="service-item-footer">
        <strong>From $${service.rate}</strong>
        <div class="service-item-actions">
          <button class="button button-secondary" type="button" data-book-call-service="${index}">
            <img class="button-icon" src="./assets/Meet icon.svg" width="18" height="18" alt="" />
            Book a call
          </button>
          <button class="button" type="button" data-order-service="${index}">Order Service</button>
        </div>
      </div>
    `;
    servicesList.appendChild(card);
  });

  servicesList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const bookCallTrigger = target.closest("[data-book-call-service]");
    if (bookCallTrigger) {
      openBookCallModal(Number(bookCallTrigger.getAttribute("data-book-call-service")));
      return;
    }

    const trigger = target.closest("[data-order-service]");
    if (!trigger) return;
    openServiceOrderModal(Number(trigger.getAttribute("data-order-service")));
  });

  const serviceVideos = servicesList.querySelectorAll(".protected-service-video");

  serviceVideos.forEach((video) => {
    video.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });

  if (!("IntersectionObserver" in window)) return;

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (!(video instanceof HTMLVideoElement)) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
          return;
        }

        video.pause();
      });
    },
    { rootMargin: "240px 0px", threshold: 0.2 },
  );

  serviceVideos.forEach((video) => videoObserver.observe(video));
}

function updateEstimate() {
  if (!serviceSelect || !timelineSelect || !estimateValue || !estimateSummary) return;
  const selectedService = services[Number(serviceSelect.value) || 0];
  const multiplier = Number(timelineSelect.value);
  const addons = addOnInputs
    .filter((input) => input.checked)
    .reduce((sum, input) => sum + Number(input.value), 0);
  const total = Math.round(selectedService.rate * multiplier + addons);
  estimateValue.textContent = `$${total}`;

  const selectedAddons = addOnInputs.filter((input) => input.checked).length;
  estimateSummary.textContent = `${selectedService.name} with ${selectedAddons} add-on${
    selectedAddons === 1 ? "" : "s"
  } on a ${timelineSelect.options[timelineSelect.selectedIndex].text.toLowerCase()}.`;
}

function openServiceOrderModal(serviceIndex) {
  selectedServiceIndex = serviceIndex;
  const service = services[serviceIndex];
  serviceOrderTitle.textContent = service.name;
  if (serviceOrderServiceName) serviceOrderServiceName.value = service.name;
  serviceOrderForm.classList.remove("is-submitted");
  if (serviceOrderContent) serviceOrderContent.hidden = false;
  if (serviceOrderSuccess) serviceOrderSuccess.hidden = true;
  if (!serviceOrderContent) {
    setFallbackFormContentVisibility(serviceOrderForm, true, serviceOrderSuccess);
  }
  const submitButton = serviceOrderForm.querySelector('[type="submit"]');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = false;
    submitButton.textContent = "Submit and book a call";
  }
  if (orderTimeline) orderTimeline.value = service.turnaround;
  serviceOrderModal.showModal();
}

function closeServiceOrderModal() {
  serviceOrderModal.close();
}

function openBookCallModal(serviceIndex) {
  selectedBookCallServiceIndex = serviceIndex;
  const service = services[serviceIndex];
  bookCallTitle.textContent = `Book a call for ${service.name}`;
  if (bookCallServiceName) bookCallServiceName.value = service.name;
  bookCallForm.classList.remove("is-submitted");
  if (bookCallContent) bookCallContent.hidden = false;
  if (bookCallSuccess) bookCallSuccess.hidden = true;
  if (!bookCallContent) {
    setFallbackFormContentVisibility(bookCallForm, true, bookCallSuccess);
  }
  const submitButton = bookCallForm.querySelector('[type="submit"]');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = false;
    submitButton.textContent = "Submit and book call";
  }
  if (bookCallName) bookCallName.value = "";
  if (bookCallEmail) bookCallEmail.value = "";
  bookCallModal.showModal();
  (bookCallName || bookCallEmail)?.focus();
}

function closeBookCallModal() {
  bookCallModal.close();
}

function encodeFormSubmission(form) {
  return new URLSearchParams(new FormData(form)).toString();
}

function shouldSubmitToNetlify() {
  return !["", "localhost", "127.0.0.1"].includes(window.location.hostname);
}

async function submitNetlifyForm(form) {
  if (!shouldSubmitToNetlify()) return;

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFormSubmission(form),
  });

  if (!response.ok) {
    throw new Error(`Netlify form submission failed with status ${response.status}`);
  }
}

function createBookingWindow() {
  return window.open("about:blank", "_blank");
}

function sendBookingWindowToCal(bookingWindow) {
  if (bookingWindow) {
    bookingWindow.location.href = CAL_BOOKING_URL;
    bookingWindow.focus();
    return;
  }

  window.location.href = CAL_BOOKING_URL;
}

function setFallbackFormContentVisibility(form, isVisible, success) {
  if (!form) return;

  form
    .querySelectorAll(".modal-head, .service-order-fields, .service-order-note, .service-order-actions")
    .forEach((element) => {
      element.hidden = !isVisible;
    });

  if (success) {
    success.hidden = isVisible;
  }
}

function showFormSuccess(content, success) {
  if (content) {
    content.hidden = true;
  }

  if (success) {
    if (!content) {
      setFallbackFormContentVisibility(success.closest("form"), false, success);
    }
    success.hidden = false;
    return;
  }
}

function showServiceOrderSuccess() {
  try {
    const raw = window.localStorage.getItem(SERVICE_ORDER_STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data?.serviceName || !data?.name || !data?.email) return;
    if (!serviceSuccess || !serviceSuccessCopy) return;

    serviceSuccess.hidden = false;
    serviceSuccessCopy.textContent = `${data.name}, your order for ${data.serviceName} has been recorded in this browser. Please watch your email at ${data.email} for follow-up and make sure you attend your scheduled meeting, or text me on WhatsApp if you want to move faster.`;
  } catch (error) {
    console.error("Unable to read service order state.", error);
  }
}

function hideAddonPopover() {
  if (!addonPopover) return;
  addonPopover.hidden = true;
  activeAddonButton = null;
}

function showAddonPopover(button) {
  if (!addonPopover || !addonPopoverTitle || !addonPopoverCopy) return;
  const addonKey = button.dataset.addon;
  const content = addonDetails[addonKey];
  if (!content) return;

  addonPopoverTitle.textContent = content.title;
  addonPopoverCopy.textContent = content.copy;

  const row = button.closest(".addon-row");
  if (!row) return;

  row.appendChild(addonPopover);
  addonPopover.hidden = false;

  const top = button.offsetTop - addonPopover.offsetHeight - 10;
  const left = Math.max(0, button.offsetLeft - addonPopover.offsetWidth + button.offsetWidth);

  addonPopover.style.top = `${Math.max(6, top)}px`;
  addonPopover.style.left = `${left}px`;
  activeAddonButton = button;
}

function resizeMasonryCard(card) {
  if (!masonryGrid || window.matchMedia("(max-width: 760px)").matches) {
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

function resizeHomepageMasonry() {
  document.querySelectorAll(".masonry .masonry-card").forEach((card) => {
    resizeMasonryCard(card);
  });
}

function renderMasonry() {
  moreDesigns.forEach((design, index) => {
    const card = document.createElement("article");
    card.className = "masonry-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.dataset.design = String(index);
    card.setAttribute("aria-label", `Open design exploration: ${design.title}`);
    card.innerHTML = `
      <div class="masonry-visual" aria-hidden="true">
        <img class="masonry-image" src="${design.image}" width="1200" height="900" alt="" loading="lazy" decoding="async" />
      </div>
      <h3>${design.title}</h3>
    `;
    masonryGrid.appendChild(card);

    const image = card.querySelector("img");
    if (image?.complete) {
      resizeMasonryCard(card);
    } else {
      image?.addEventListener("load", () => resizeMasonryCard(card), { once: true });
      image?.addEventListener("error", () => resizeMasonryCard(card), { once: true });
    }
  });

  resizeHomepageMasonry();
}

function openDesignPreview(design) {
  if (!designPreviewModal) return;

  designPreviewTitle.textContent = design.title;
  const hasDescription = Boolean(design.description?.trim());
  designPreviewDescription.textContent = hasDescription ? design.description : "";
  designPreviewDescription.hidden = !hasDescription;
  designPreviewVisual.innerHTML = `
    <img class="design-preview-image" src="${design.image}" width="1600" height="1200" alt="${design.title}" loading="lazy" decoding="async" />
  `;

  const designPostUrl = design.postUrl || design.xUrl || "";
  const designPostLabel = design.postLabel || "View in X";
  const hasPostUrl = Boolean(designPostUrl);

  if (designPreviewX) {
    designPreviewX.hidden = !hasPostUrl;
    designPreviewX.href = designPostUrl;
    designPreviewX.textContent = designPostLabel;
  }

  if (designPreviewShare) {
    designPreviewShare.hidden = !hasPostUrl;
  }

  designPreviewModal.showModal();
}

serviceOrderClose.addEventListener("click", closeServiceOrderModal);

bookCallClose.addEventListener("click", closeBookCallModal);

bookCallForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const service = services[selectedBookCallServiceIndex];
  const submitButton = bookCallForm.querySelector('[type="submit"]');
  const bookingWindow = createBookingWindow();
  const payload = {
    serviceName: service.name,
    name: bookCallName?.value.trim() || "",
    email: bookCallEmail.value.trim(),
    submittedAt: new Date().toISOString(),
  };

  if (bookCallServiceName) bookCallServiceName.value = payload.serviceName;
  if (bookCallSubmittedAt) bookCallSubmittedAt.value = payload.submittedAt;

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    window.localStorage.setItem(BOOK_CALL_STORAGE_KEY, JSON.stringify(payload));
    await submitNetlifyForm(bookCallForm);
    showFormSuccess(bookCallContent, bookCallSuccess);
    sendBookingWindowToCal(bookingWindow);
  } catch (error) {
    console.error("Unable to save book call lead.", error);
    alert("I could not save your details yet. Please try again before booking the call.");
    bookingWindow?.close();
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit and book call";
    }
  }
});

serviceOrderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const service = services[selectedServiceIndex];
  const submitButton = serviceOrderForm.querySelector('[type="submit"]');
  const bookingWindow = createBookingWindow();
  const payload = {
    serviceName: service.name,
    name: orderName.value.trim(),
    email: orderEmail.value.trim(),
    brief: orderBrief.value.trim(),
    timeline: orderTimeline.value,
    submittedAt: new Date().toISOString(),
  };

  if (serviceOrderServiceName) serviceOrderServiceName.value = payload.serviceName;
  if (serviceOrderSubmittedAt) serviceOrderSubmittedAt.value = payload.submittedAt;

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    window.localStorage.setItem(SERVICE_ORDER_STORAGE_KEY, JSON.stringify(payload));
    await submitNetlifyForm(serviceOrderForm);
    showFormSuccess(serviceOrderContent, serviceOrderSuccess);
    sendBookingWindowToCal(bookingWindow);
  } catch (error) {
    console.error("Unable to save service order.", error);
    alert("I could not save your order yet. Please try again before booking the call.");
    bookingWindow?.close();
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit and book a call";
    }
  }
});

document.querySelectorAll("[data-close-success]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-close-success");
    if (target === "book-call") {
      closeBookCallModal();
      return;
    }

    if (target === "service-order") {
      closeServiceOrderModal();
    }
  });
});

addonInfoButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (activeAddonButton === button && !addonPopover.hidden) {
      hideAddonPopover();
      return;
    }
    showAddonPopover(button);
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (
    addonPopover &&
    !addonPopover.hidden &&
    !addonPopover.contains(target) &&
    !(target instanceof HTMLElement && target.closest(".addon-info-button"))
  ) {
    hideAddonPopover();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideAddonPopover();
  }
});

if (blogGrid) {
  blogGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const trigger = target.closest("[data-article]");
    if (!trigger) return;
    openArticle(homepageArticles[Number(trigger.getAttribute("data-article"))]);
  });

  blogGrid.addEventListener("keydown", (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    const trigger = event.target.closest("[data-article]");
    if (!trigger) return;
    event.preventDefault();
    openArticle(homepageArticles[Number(trigger.getAttribute("data-article"))]);
  });
}

if (masonryGrid) {
  masonryGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const trigger = target.closest("[data-design]");
    if (!trigger) return;
    openDesignPreview(moreDesigns[Number(trigger.getAttribute("data-design"))]);
  });

  masonryGrid.addEventListener("keydown", (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    const trigger = event.target.closest("[data-design]");
    if (!trigger) return;
    event.preventDefault();
    openDesignPreview(moreDesigns[Number(trigger.getAttribute("data-design"))]);
  });
}

if (articleClose) {
  articleClose.addEventListener("click", () => {
    articleModal.close();
  });
}

if (articleBody) {
  articleBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest("[data-services-cta]")) {
      articleModal.close();
    }
  });
}

if (designPreviewClose) {
  designPreviewClose.addEventListener("click", () => {
    designPreviewModal.close();
  });
}

document.querySelectorAll(".nav-menu-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    link.closest(".nav-menu")?.removeAttribute("open");
  });
});

window.addEventListener("resize", () => {
  window.requestAnimationFrame(resizeHomepageMasonry);
});

serviceSelect?.addEventListener("change", updateEstimate);
timelineSelect?.addEventListener("change", updateEstimate);
addOnInputs.forEach((input) => input.addEventListener("change", updateEstimate));

renderProjects();
renderHomepageInsights();
renderServices();
renderMasonry();
updateEstimate();
showServiceOrderSuccess();

