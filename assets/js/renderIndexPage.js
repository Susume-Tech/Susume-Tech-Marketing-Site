/**
 * Services
 */
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById("services-container");
        if (!container) return;

        fetch("assets/data/services.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to load services.json");
                return res.json();
            })
            .then(services => renderServices(services, container))
            .catch(err => {
                console.error("Services load error:", err);
                container.innerHTML = "<p>Unable to load services.</p>";
            });
    });

    function renderServices(services, container) {
        let entries = Object.entries(services);

        // Normalize display metadata
        entries = entries.map(([key, service]) => {
            const display = service.display || {};
            return [
                key,
                {
                    ...service,
                    _display: {
                        visible: display.visible !== false,
                        order: display.order ?? 999,
                        badge: display.badge ?? null
                    }
                }
            ];
        });

        // Filter visible
        entries = entries.filter(([_, s]) => s._display.visible);

        // Sort by order
        entries.sort((a, b) => a[1]._display.order - b[1]._display.order);

        let delay = 200;
        let html = "";

        for (const [key, service] of entries) {
            html += buildCard(key, service, delay);
            delay += 100;
        }

        container.innerHTML = html;

        if (window.AOS) AOS.refresh();
    }

    function buildCard(key, service, delay) {
        const icon = service.features?.[0]?.icon || "bi-code-slash";

        return `
    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
      <div class="service-card">
        <div class="service-icon">
          <i class="bi ${icon}"></i>
        </div>

        <h4>
          <a href="service-details.html?service=${key}">
            ${service.title}
          </a>
        </h4>

        <p  style="display: none;">${service.lead}</p>

        ${service._display.badge ? `<div class="service-badge">${service._display.badge}</div>` : ""}

        <a href="service-details.html?service=${key}" class="service-link">
          <span>Learn More</span>
          <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
    }

})();


/**
 * Portfolio
 */
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById("portfolio-container");
        if (!container) return;

        const filtersContainer = document.getElementById("portfolio-filters");

        fetch("assets/data/projects.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to load projects.json");
                return res.json();
            })
            .then(projects => renderPortfolio(projects, container, filtersContainer))
            .catch(err => {
                console.error("Portfolio load error:", err);
                container.innerHTML = "<p>Unable to load portfolio.</p>";
            });
    });

    function renderPortfolio(projects, container, filtersContainer) {
        let entries = Object.entries(projects);

        // Normalize display metadata
        entries = entries.map(([key, project]) => {
            const display = project.display || {};
            return [
                key,
                {
                    ...project,
                    _display: {
                        visible: display.visible !== false,
                        order: display.order ?? 999
                    }
                }
            ];
        });

        // Filter visible
        entries = entries.filter(([_, p]) => p._display.visible);

        // Sort by order
        entries.sort((a, b) => a[1]._display.order - b[1]._display.order);

        // Build category filters
        if (filtersContainer) {
            buildFilters(entries, filtersContainer);
            if (typeof initFilters === 'function')
                initFilters();
        }

        let html = "";

        for (const [key, project] of entries) {
            html += buildProjectCard(key, project);
        }

        container.innerHTML = html;
    }

    function buildFilters(entries, filtersContainer) {
        const categories = new Set(entries.map(e => e[1].category));

        let html = `<li data-filter="*" class="filter-active">All</li>`;

        for (const cat of categories) {
            html += `<li data-filter=".filter-${slugify(cat)}">${cat}</li>`;
        }

        filtersContainer.innerHTML = html;
    }

    function buildProjectCard(key, project) {
        const techHtml = (project.tech || [])
            .map(t => `<span class="tech-badge">${t}</span>`)
            .join("");

        return `
<div class="col-xl-4 col-lg-6 portfolio-item isotope-item filter-${slugify(project.category)}">
  <div class="portfolio-wrapper">
    <div class="portfolio-image">
      <img src="${project.image}" alt="${project.title}" class="img-fluid" loading="lazy">
      <div class="portfolio-hover">
        <div class="portfolio-actions">
          <a href="${project.preview}" class="glightbox action-btn preview-btn" title="Project Samples">
            <i class="bi bi-eye"></i>
          </a>
          <a href="${project.link}" class="action-btn details-btn" title="${project.linkTitle}" target="_blank" rel="noopener">
            <i class="bi bi-arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="portfolio-content">
      <div class="portfolio-meta">
        <span class="project-type">${project.type}</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="portfolio-tech">
        ${techHtml}
      </div>
    </div>
  </div>
</div>
`;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

})();
