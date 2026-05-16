const featuredCaseStudySlugs = [
  "pharmachain-medicine-access-and-delivery",
  "swiftwings-case-study",
  "second-wallet-advanced-loan-management-system",
];

const projects = Array.isArray(window.CASE_STUDIES)
  ? featuredCaseStudySlugs
      .map((slug) => window.CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug))
      .filter(Boolean)
  : [];

const PLAY_ICON_SRC = "./assets/play.svg";
const PAUSE_ICON_SRC = "./assets/pause.svg";
const UPLOADED_TRACK_SRC = "./assets/back_drop-dark-ambient-background-music-grey-skies-422761.mp3";
const PLAYER_COVER_SRC = "./assets/og image.png";
const SPOTIFY_PLAYLIST_EMBED_URL =
  "https://open.spotify.com/embed/playlist/65nTqilromnNMhF74uMuRC?utm_source=generator";
const SPOTIFY_PLAYLIST_TITLE = "VMorgan playlist - Spotify";
const SITE_AUDIO_VOLUME = 0.2;

const services = [
  {
    name: "Landing page design",
    rate: 750,
    turnaround: "3-5 days",
    description:
      "A clear, polished landing page experience that helps people understand the offer and take the next step.",
    mediaSrc: "./assets/Video/Landing pages sideshow.mp4",
    mediaType: "video",
    mediaAlt: "Landing page design slideshow preview",
  },
  {
    name: "Mobile app design",
    rate: 2800,
    turnaround: "1-2 weeks",
    description:
      "Thoughtful app screens and flows for mobile products that need to feel simple, useful, and ready for real people.",
    mediaSrc: "./assets/Video/mobile screens.mp4",
    mediaType: "video",
    mediaAlt: "Mobile app screen preview video",
  },
  {
    name: "SaaS or end-to-end product design",
    rate: 5450,
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
const MUSIC_PLAYER_STORAGE_KEY = "vmorgan-music-player";

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

const tracks = [
  { name: "Essence", artist: "Wizkid ft. Tems", length: 248 },
  { name: "Come Away With Me", artist: "Norah Jones", length: 198 },
  { name: "Sunflower", artist: "Rex Orange County", length: 252 },
  { name: "Pink + White", artist: "Frank Ocean", length: 184 },
  { name: "Idea 10", artist: "Gibran Alcocer", length: 147 },
];

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
const trackPopup = document.getElementById("trackPopup");
const trackMenuToggle = document.getElementById("trackMenuToggle");
const playerCover = document.getElementById("playerCover");
const playIcon = document.getElementById("playIcon");
const musicToggle = document.getElementById("musicToggle");
const timelineRange = document.getElementById("timelineRange");
const marqueeTrack = document.getElementById("marqueeTrack");
const trackTitle = document.getElementById("trackTitle");
const musicStatus = document.getElementById("musicStatus");
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
const bookCallEmail = document.getElementById("bookCallEmail");
const bookCallServiceName = document.getElementById("bookCallServiceName");
const bookCallSubmittedAt = document.getElementById("bookCallSubmittedAt");
const serviceOrderModal = document.getElementById("serviceOrderModal");
const serviceOrderForm = document.getElementById("serviceOrderForm");
const serviceOrderTitle = document.getElementById("serviceOrderTitle");
const serviceOrderClose = document.getElementById("serviceOrderClose");
const orderName = document.getElementById("orderName");
const orderEmail = document.getElementById("orderEmail");
const orderBrief = document.getElementById("orderBrief");
const orderTimeline = document.getElementById("orderTimeline");

let selectedTrackIndex = 0;
let selectedServiceIndex = 0;
let selectedBookCallServiceIndex = 0;
let audioContext = null;
let ambienceNodes = [];
let isPlaying = false;
let trackProgress = 0;
let progressTimer = null;
let activeAddonButton = null;
const uploadedTrackAudio = new Audio(UPLOADED_TRACK_SRC);
uploadedTrackAudio.preload = "metadata";
uploadedTrackAudio.volume = SITE_AUDIO_VOLUME;

function readMusicState() {
  try {
    return JSON.parse(window.localStorage.getItem(MUSIC_PLAYER_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveMusicState() {
  window.localStorage.setItem(
    MUSIC_PLAYER_STORAGE_KEY,
    JSON.stringify({
      selectedTrackIndex,
      trackProgress,
      isPlaying,
      savedAt: Date.now(),
    }),
  );
}

function restoreMusicState() {
  const state = readMusicState();
  selectedTrackIndex = Number.isInteger(state.selectedTrackIndex) ? state.selectedTrackIndex : 0;
  if (!tracks[selectedTrackIndex]) selectedTrackIndex = 0;
  trackProgress = Number.isFinite(state.trackProgress) ? state.trackProgress : 0;
  return Boolean(state.isPlaying);
}

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
        ${project.coverImage ? `<img class="case-study-cover" src="${project.coverImage}" alt="" loading="lazy" />` : ""}
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
                ? `<div class="insight-card-visual"><img src="${preview}" alt="${previewAlt}" loading="lazy" /></div>`
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

function openProjectModal(project) {
  openArticle(project);
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
        <img src="${block.src}" alt="${block.alt}" />
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
  const articleContent = article.body.map(renderBodyBlock).join("");
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
          }" autoplay muted loop playsinline preload="metadata" controlsList="nodownload noplaybackrate noremoteplayback" disablepictureinpicture disableremoteplayback oncontextmenu="return false;">
            <source src="${service.mediaSrc}" type="video/mp4" />
          </video>`
        : `<img class="service-media" src="${service.mediaSrc}" alt="${service.mediaAlt || service.name}" loading="lazy" />`
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
            <img class="button-icon" src="./assets/Meet icon.svg" alt="" />
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

  servicesList.querySelectorAll(".protected-service-video").forEach((video) => {
    video.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });
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
  orderTimeline.value = service.turnaround;
  serviceOrderModal.showModal();
}

function closeServiceOrderModal() {
  serviceOrderModal.close();
}

function openBookCallModal(serviceIndex) {
  selectedBookCallServiceIndex = serviceIndex;
  const service = services[serviceIndex];
  bookCallTitle.textContent = `Book a call for ${service.name}`;
  bookCallServiceName.value = service.name;
  bookCallEmail.value = "";
  bookCallModal.showModal();
  bookCallEmail.focus();
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
        <img class="masonry-image" src="${design.image}" alt="" loading="lazy" />
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
    <img class="design-preview-image" src="${design.image}" alt="${design.title}" />
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

function renderTracks() {
  trackPopup.innerHTML = `
    <iframe
      class="spotify-playlist-embed"
      data-testid="embed-iframe"
      title="VMorgan Spotify playlist"
      src="${SPOTIFY_PLAYLIST_EMBED_URL}"
      width="100%"
      height="352"
      frameborder="0"
      allowfullscreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  `;

  trackPopup.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest("[data-track]");
    if (!button) return;
    selectedTrackIndex = Number(button.getAttribute("data-track"));
    syncTrackButtons();
    updateTrackDisplay(true);
    saveMusicState();
    toggleTrackPopup(false);
    if (isPlaying) {
      stopAmbientTrack();
      playSelectedTrack();
    }
  });
}

function renderPlayerCover() {
  if (!playerCover || playerCover.querySelector("img")) return;
  const image = document.createElement("img");
  image.src = PLAYER_COVER_SRC;
  image.alt = "";
  image.loading = "lazy";
  playerCover.appendChild(image);
}

function syncTrackButtons() {
  const buttons = Array.from(document.querySelectorAll(".track-popup-card"));
  buttons.forEach((button, index) => {
    button.classList.toggle("is-active", index === selectedTrackIndex);
  });
}

function updateTrackDisplay(resetProgress = false) {
  if (resetProgress) {
    trackProgress = 0;
    updateProgressUI();
  }
  trackTitle.textContent = SPOTIFY_PLAYLIST_TITLE;
  marqueeTrack.classList.toggle("is-scrolling", trackTitle.textContent.length > 28);
  timelineRange.disabled = true;
  if (!isPlaying) {
    musicStatus.textContent = "Open the Spotify playlist to listen.";
  }
}

function toggleTrackPopup(forceState) {
  const shouldOpen =
    typeof forceState === "boolean" ? forceState : trackPopup.hasAttribute("hidden");
  trackPopup.hidden = !shouldOpen;
  trackMenuToggle.setAttribute("aria-expanded", String(shouldOpen));
  document.querySelector(".menu-badge").classList.toggle("is-open", shouldOpen);
}

function updateProgressUI() {
  timelineRange.value = String(trackProgress);
}

function startProgressLoop() {
  window.clearInterval(progressTimer);
  const track = tracks[selectedTrackIndex];
  progressTimer = window.setInterval(() => {
    trackProgress = (trackProgress + 100 / track.length) % 100;
    updateProgressUI();
    saveMusicState();
  }, 1000);
}

function stopProgressLoop() {
  window.clearInterval(progressTimer);
  progressTimer = null;
}

function startUploadedTrack() {
  const track = tracks[selectedTrackIndex];
  if (uploadedTrackAudio.duration && trackProgress > 0) {
    uploadedTrackAudio.currentTime = (trackProgress / 100) * uploadedTrackAudio.duration;
  } else {
    uploadedTrackAudio.currentTime = 0;
  }
  uploadedTrackAudio.play();
  isPlaying = true;
  playIcon.src = PAUSE_ICON_SRC;
  playerCover.classList.add("is-spinning");
  musicStatus.textContent = `Now playing ${track.name}.`;
  saveMusicState();
}

function playSelectedTrack() {
  const track = tracks[selectedTrackIndex];
  if (track.audioSrc) {
    startUploadedTrack();
    return;
  }
  startAmbientTrack();
}

function createPulseNode(frequency, type, gainValue, detune = 0) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  oscillator.detune.value = detune;
  filter.type = "lowpass";
  filter.frequency.value = 850;
  gain.gain.value = gainValue;

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();

  return { oscillator, gain };
}

function startAmbientTrack() {
  if (!audioContext) {
    audioContext = new window.AudioContext();
  }

  const track = tracks[selectedTrackIndex];
  const primary = createPulseNode(track.base, "sine", 0.035);
  const layer = createPulseNode(track.base * 1.5, "triangle", 0.02, 8);
  const texture = createPulseNode(track.base * 2, "sawtooth", 0.008, -4);

  ambienceNodes = [primary, layer, texture];
  isPlaying = true;
  playIcon.src = PAUSE_ICON_SRC;
  playerCover.classList.add("is-spinning");
  musicStatus.textContent = `Now playing ${track.name}.`;
  startProgressLoop();
  saveMusicState();

  const loop = () => {
    if (!isPlaying || audioContext.state === "closed") return;
    const now = audioContext.currentTime;
    ambienceNodes.forEach((node, index) => {
      node.gain.gain.cancelScheduledValues(now);
      node.gain.gain.setValueAtTime(node.gain.gain.value, now);
      node.gain.gain.linearRampToValueAtTime(0.002 + index * 0.004, now + 2.2);
      node.gain.gain.linearRampToValueAtTime(0.02 + index * 0.01, now + 5.6);
    });
    window.setTimeout(loop, 4800);
  };

  loop();
}

function stopAmbientTrack() {
  ambienceNodes.forEach((node) => {
    node.oscillator.stop();
    node.oscillator.disconnect();
    node.gain.disconnect();
  });
  ambienceNodes = [];
  uploadedTrackAudio.pause();
  uploadedTrackAudio.currentTime = 0;
  isPlaying = false;
  playIcon.src = PLAY_ICON_SRC;
  playerCover.classList.remove("is-spinning");
  musicStatus.textContent = `Ready to play ${tracks[selectedTrackIndex].name}.`;
  stopProgressLoop();
  trackProgress = 0;
  updateProgressUI();
  saveMusicState();
}

musicToggle.addEventListener("click", async () => {
  toggleTrackPopup(true);
  playIcon.src = PLAY_ICON_SRC;
  musicStatus.textContent = "Use the Spotify controls in the playlist.";
});

uploadedTrackAudio.addEventListener("timeupdate", () => {
  const selectedTrack = tracks[selectedTrackIndex];
  if (!selectedTrack?.audioSrc || !uploadedTrackAudio.duration || !isPlaying) return;
  trackProgress = (uploadedTrackAudio.currentTime / uploadedTrackAudio.duration) * 100;
  updateProgressUI();
  saveMusicState();
});

uploadedTrackAudio.addEventListener("loadedmetadata", () => {
  const fileTrack = tracks.find((track) => track.audioSrc === UPLOADED_TRACK_SRC);
  if (fileTrack && uploadedTrackAudio.duration) {
    fileTrack.length = Math.round(uploadedTrackAudio.duration);
  }
});

uploadedTrackAudio.addEventListener("ended", () => {
  stopAmbientTrack();
});

serviceOrderClose.addEventListener("click", closeServiceOrderModal);

bookCallClose.addEventListener("click", closeBookCallModal);

bookCallForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const service = services[selectedBookCallServiceIndex];
  const submitButton = bookCallForm.querySelector('[type="submit"]');
  const payload = {
    serviceName: service.name,
    email: bookCallEmail.value.trim(),
    submittedAt: new Date().toISOString(),
  };

  bookCallServiceName.value = payload.serviceName;
  bookCallSubmittedAt.value = payload.submittedAt;

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    window.localStorage.setItem(BOOK_CALL_STORAGE_KEY, JSON.stringify(payload));
    await submitNetlifyForm(bookCallForm);
    window.location.href = CAL_BOOKING_URL;
  } catch (error) {
    console.error("Unable to save book call lead.", error);
    alert("I could not save your email yet. Please try again before booking the call.");
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit and book call";
    }
  }
});

serviceOrderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const service = services[selectedServiceIndex];
  const payload = {
    serviceName: service.name,
    name: orderName.value.trim(),
    email: orderEmail.value.trim(),
    brief: orderBrief.value.trim(),
    timeline: orderTimeline.value,
    submittedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(SERVICE_ORDER_STORAGE_KEY, JSON.stringify(payload));
  window.location.href = CAL_BOOKING_URL;
});

trackMenuToggle.addEventListener("click", () => {
  toggleTrackPopup();
});

timelineRange.addEventListener("input", () => {
  trackProgress = Number(timelineRange.value);
  if (tracks[selectedTrackIndex]?.audioSrc && uploadedTrackAudio.duration) {
    uploadedTrackAudio.currentTime = (trackProgress / 100) * uploadedTrackAudio.duration;
  }
  saveMusicState();
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (
    !trackPopup.hasAttribute("hidden") &&
    !trackPopup.contains(target) &&
    !trackMenuToggle.contains(target) &&
    !musicToggle?.contains(target)
  ) {
    toggleTrackPopup(false);
  }
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

window.addEventListener("beforeunload", saveMusicState);

serviceSelect?.addEventListener("change", updateEstimate);
timelineSelect?.addEventListener("change", updateEstimate);
addOnInputs.forEach((input) => input.addEventListener("change", updateEstimate));

restoreMusicState();
renderProjects();
renderHomepageInsights();
renderServices();
renderMasonry();
renderPlayerCover();
renderTracks();
updateTrackDisplay();
playIcon.src = PLAY_ICON_SRC;
updateProgressUI();
updateEstimate();
showServiceOrderSuccess();

