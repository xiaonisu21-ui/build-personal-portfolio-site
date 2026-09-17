(() => {
  const content = window.portfolioContent;
  let language = content.meta.defaultLanguage || "zh";

  const get = (object, path) => path.split(".").reduce((value, key) => value?.[key], object);
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

  function render() {
    const copy = content[language];
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = `${copy.name} — ${copy.role}`;

    document.querySelectorAll("[data-bind]").forEach((node) => {
      node.textContent = get(copy, node.dataset.bind) ?? "";
    });
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = get(copy, node.dataset.i18n) ?? "";
    });
    document.querySelectorAll("[data-alt]").forEach((node) => {
      node.alt = get(copy, node.dataset.alt) ?? "";
    });

    document.querySelector(".language-button").textContent = language === "zh" ? "EN" : "中文";
    document.querySelector(".menu-button").textContent = language === "zh" ? "菜单" : "Menu";
    document.querySelector(".skip-link").textContent = language === "zh" ? "跳到正文" : "Skip to content";

    document.querySelector("#site-nav").innerHTML = copy.nav
      .map(([label, href]) => `<a href="${href}">${esc(label)}</a>`).join("");
    document.querySelector("#hero-highlights").innerHTML = copy.hero.highlights
      .map((value) => `<span>${esc(value)}</span>`).join("");

    document.querySelector("#skills-grid").innerHTML = copy.skills.map((item) => `
      <article class="skill-card reveal">
        <span>${esc(item.no)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>
      </article>`).join("");

    document.querySelector("#experience-list").innerHTML = copy.experience.map((item) => `
      <article class="experience-item reveal">
        <div class="experience-period">${esc(item.period)}</div>
        <div>
          <h3>${esc(item.company)}</h3><p class="experience-role">${esc(item.role)}</p>
          <p>${esc(item.summary)}</p>
          <ul>${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>
        </div>
      </article>`).join("");

    const labels = language === "zh"
      ? { problem: "问题", approach: "方法", outcome: "结果", open: "展开案例", close: "收起案例" }
      : { problem: "Problem", approach: "Approach", outcome: "Outcome", open: "Open case", close: "Close case" };
    document.querySelector("#case-grid").innerHTML = copy.cases.map((item) => `
      <article class="case-card reveal">
        <div class="case-top"><span>${esc(item.index)}</span><small>${esc(item.category)}</small></div>
        <h3>${esc(item.title)}</h3>
        <div class="case-tags">${item.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
        <button class="case-toggle" type="button" aria-expanded="false">${labels.open}<b>＋</b></button>
        <div class="case-detail">
          <p><strong>${labels.problem}</strong>${esc(item.problem)}</p>
          <p><strong>${labels.approach}</strong>${esc(item.approach)}</p>
          <p><strong>${labels.outcome}</strong>${esc(item.outcome)}</p>
        </div>
      </article>`).join("");

    document.querySelectorAll(".case-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        button.firstChild.textContent = expanded ? labels.open : labels.close;
        button.querySelector("b").textContent = expanded ? "＋" : "−";
      });
    });

    document.querySelector("#project-features").innerHTML = copy.project.features
      .map((item) => `<span>${esc(item)}</span>`).join("");

    document.querySelector("#journey-list").innerHTML = copy.journey.map((item) => `
      <li class="reveal"><span>${esc(item.year)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></li>`).join("");

    document.querySelector("#education-list").innerHTML = copy.education.map((item) => `
      <article class="education-item"><h3>${esc(item.school)}</h3><p>${esc(item.degree)}</p><small>${esc(item.note)}</small></article>`).join("");
    document.querySelector("#trait-list").innerHTML = copy.traits.values.map((item) => `<span>${esc(item)}</span>`).join("");
    document.querySelector("#interest-list").innerHTML = copy.interests.values.map((item) => `<span>${esc(item)}</span>`).join("");

    document.querySelectorAll(".contact-link").forEach((link) => {
      link.href = `mailto:${content.meta.email}`;
    });
    observeReveals();
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.visible)");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((item) => observer.observe(item));
  }

  document.querySelector(".language-button").addEventListener("click", () => {
    language = language === "zh" ? "en" : "zh";
    render();
  });
  document.querySelector(".menu-button").addEventListener("click", (event) => {
    const open = document.body.classList.toggle("nav-open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
  document.querySelector("#site-nav").addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    document.querySelector(".menu-button").setAttribute("aria-expanded", "false");
  });
  render();
})();

