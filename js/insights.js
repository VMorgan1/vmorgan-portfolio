window.INSIGHTS = [
  {
    slug: "why-your-saas-hero-section-might-be-losing-customers",
    title: "Why your SaaS hero section might be losing customers",
    date: "May 14, 2026",
    category: "Landing Pages",
    previewImage: "./assets/Insights/Why your SaaS hero section might be losing customers/Preview.avif",
    previewAlt:
      "Preview of the Clippy SaaS hero section design concept showing headline, supporting copy, proof, visual, and call to action",
    summary:
      "A SaaS hero section is the first moment where visitors decide whether your product feels relevant, trustworthy, and worth their attention.",
    body: [
      {
        type: "image",
        src: "./assets/Insights/Why your SaaS hero section might be losing customers/Preview.avif",
        alt: "Preview of the Clippy SaaS hero section design concept showing headline, supporting copy, proof, visual, and call to action",
      },
      {
        type: "paragraph",
        content:
          "Most SaaS websites do not lose visitors because the product is weak. They lose visitors because the first screen fails to create a connection.",
      },
      {
        type: "paragraph",
        content:
          "A person lands on your website with a problem, a little curiosity, and very little patience. They are not reading every word yet. They are scanning, comparing, and quietly asking themselves whether this product is worth their attention. In those first few seconds, your hero section has one important job: make them feel understood enough to keep going.",
      },
      {
        type: "paragraph",
        content:
          "That is where many SaaS landing pages fall apart. They open with a vague headline, a polished but unclear product mockup, two or three competing buttons, and a list of features that only makes sense after you already understand the product. The team behind the product may know exactly why it matters, but the visitor does not have that context yet. So instead of feeling pulled in, they feel like they have to work too hard to understand why they should care.",
      },
      {
        type: "image",
        src: "./assets/Insights/Why your SaaS hero section might be losing customers/A good product should be seen.avif",
        alt: "A good product should be seen, not just built. A screenshot of the Clippy hero section concept with the headline, supporting copy, proof and visual.",
      },
      {
        type: "paragraph",
        content:
          "A high-converting hero section is not just beautiful. It is clear. It understands the visitor's pain and turns that understanding into a message they can immediately recognize.",
      },
      {
        type: "image",
        src: "./assets/Insights/Why your SaaS hero section might be losing customers/5 things that works.avif",
        alt: "5 things that work together to make the Clippy hero section concept effective.",
      },
      {
        type: "image",
        src: "./assets/Insights/Why your SaaS hero section might be losing customers/What works.avif",
        alt: "What works visuals showing clippy hero section with labelled sections",
      },
      {
        type: "heading",
        content: "Speak to the pain before the feature",
      },
      {
        type: "paragraph",
        content:
          "Take the Clippy landing page concept as an example. The headline, Never Lose Anything You Copy Again, works because it does not start with the feature. It starts with the frustration. Anyone who writes, designs, codes, researches, or works across multiple tabs and devices has probably copied something important and lost it moments later. A link disappears. A note gets overwritten. A paragraph you needed is gone. That tiny moment of frustration is familiar, and the headline names it directly.",
      },
      {
        type: "paragraph",
        content:
          "That is what strong SaaS messaging often does. It does not simply describe the product. It diagnoses the situation the visitor is already living in. A weaker version of the same headline might say something like, A powerful clipboard management tool for modern teams. That may be accurate, but it does not create the same feeling. It sounds like a category. It tells people what the product is, but not why they should care.",
      },
      {
        type: "heading",
        content: "Answer \"is this for me?\" quickly",
      },
      {
        type: "paragraph",
        content:
          "Once the headline earns attention, the rest of the hero section has to quickly answer the next question: is this for me? Visitors should not have to scroll halfway down the page to understand who the product is for, what it helps them do, and why that outcome matters.",
      },
      {
        type: "paragraph",
        content:
          "In the Clippy concept, the supporting copy explains that the product syncs copied files, text, and links across devices. That one sentence gives the promise structure. It turns the emotional hook into something practical. The visual then completes the message. You can see clipboard history, copied items, active devices, and the sense of everything being available in one place.",
      },
      {
        type: "heading",
        content: "Use proof and focus to reduce hesitation",
      },
      {
        type: "paragraph",
        content:
          "This is also why social proof works so well above the fold. Numbers like 10 million items copied, 70 thousand trusted users, and 350 thousand devices are not just decoration. They reduce doubt. When a visitor sees that other people already use the product, the product feels less risky.",
      },
      {
        type: "paragraph",
        content:
          "Another thing the Clippy hero does well is keeping the call to action focused. Start Syncing is simple, specific, and connected to the promise of the page. Too many SaaS websites weaken their hero section by giving visitors too many choices too early. Choice can create friction. When everything asks for attention, the most important action becomes less obvious.",
      },
      {
        type: "heading",
        content: "Let the visual sell the outcome",
      },
      {
        type: "paragraph",
        content:
          "Many SaaS hero visuals are beautiful but passive. They show a dashboard floating in space, abstract cards, gradients, charts, and glass panels. They look polished, but they do not always explain the value. A better product visual shows the visitor what life looks like after they click.",
      },
      {
        type: "paragraph",
        content:
          "In the Clippy concept, the dashboard mockup is not only there to make the page look good. It reinforces the promise. The visitor can imagine how the product would help them recover things they copied across different tools and devices. That is the job of the visual: not just to impress, but to reduce uncertainty.",
      },
      {
        type: "paragraph",
        content:
          "When these pieces work together, the hero section becomes more than a design layout. It becomes a silent salesperson. It welcomes the right visitor, explains the value quickly, reduces doubt, and guides them toward action.",
      },
      {
        type: "paragraph",
        content:
          "If your SaaS landing page is not converting, the problem may not be your pricing, your feature list, or your footer. The problem may be happening much earlier. It may be happening in the first few seconds, before the visitor has even given the rest of the page a chance. Your product may be useful, thoughtful, and well-built, but if the hero section does not make that value clear, people may never stay long enough to find out.",
      },
      {
        type: "paragraph",
        content:
          "A great hero section does not try to say everything. It says the right thing first.",
      },
    ],
  },
];

(() => {
const articles = Array.isArray(window.INSIGHTS) ? window.INSIGHTS : [];

const insightsGrid = document.getElementById("insightsGrid");
const articleModal = document.getElementById("articleModal");
const articleClose = document.getElementById("articleClose");
const articleTitle = document.getElementById("articleTitle");
const articleDate = document.getElementById("articleDate");
const articleCategory = document.getElementById("articleCategory");
const articlePreface = document.getElementById("articlePreface");
const articleBody = document.getElementById("articleBody");

function getArticlePreview(article) {
  if (article.previewImage) {
    return {
      src: article.previewImage,
      alt: article.previewAlt || article.title,
    };
  }

  const firstImage = article.body?.find((block) => block.type === "image");
  return firstImage
    ? {
        src: firstImage.src,
        alt: firstImage.alt || article.title,
      }
    : null;
}

function renderInsightCards() {
  if (!insightsGrid) return;

  articles.forEach((article, index) => {
    const preview = getArticlePreview(article);
    const card = document.createElement("article");
    card.className = "insight-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open article: ${article.title}`);
    card.dataset.article = String(index);
    card.innerHTML = `
      ${
        preview
          ? `<div class="insight-card-visual"><img src="${preview.src}" alt="${preview.alt}" loading="lazy" /></div>`
          : ""
      }
      <span class="blog-tag">${article.category}</span>
      <h3>${article.title}</h3>
      <p>${article.summary}</p>
      <div class="insight-card-meta">
        <span>${article.date}</span>
        <span>Open insight</span>
      </div>
    `;
    insightsGrid.appendChild(card);
  });
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
  if (!articleModal || !articleTitle || !articleDate || !articleCategory || !articlePreface || !articleBody) return;

  articleTitle.textContent = article.title;
  articleDate.textContent = article.date;
  articleCategory.textContent = article.category;
  articlePreface.textContent = article.summary;
  articleBody.innerHTML = article.body.map(renderBodyBlock).join("");
  articleModal.showModal();
}

insightsGrid?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const trigger = target.closest("[data-article]");
  if (!trigger) return;
  openArticle(articles[Number(trigger.getAttribute("data-article"))]);
});

insightsGrid?.addEventListener("keydown", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  const trigger = event.target.closest("[data-article]");
  if (!trigger) return;
  event.preventDefault();
  openArticle(articles[Number(trigger.getAttribute("data-article"))]);
});

articleClose?.addEventListener("click", () => {
  articleModal.close();
});

document.querySelectorAll(".nav-menu-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    link.closest(".nav-menu")?.removeAttribute("open");
  });
});

if (insightsGrid) {
  renderInsightCards();
}
})();
