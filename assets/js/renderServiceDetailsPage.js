(async function () {
    const params = new URLSearchParams(window.location.search);
    const serviceKey = params.get("service");

    if (!serviceKey) {
        redirectHome();
        return;
    }

    let data;

    try {
        const res = await fetch("assets/data/services.json");
        data = await res.json();
    } catch (err) {
        redirectHome();
        return;
    }

    const service = data[serviceKey];

    if (!service) {
        redirectHome();
        return;
    }

    // Breadcrum
    document.getElementById("active-page").textContent = service.title;

    // Titles
    document.getElementById("service-title").textContent = service.title;
    document.getElementById("service-title-2").textContent = service.title;
    document.getElementById("service-subtitle").textContent = service.subtitle;
    document.getElementById("service-lead").textContent = service.lead;

    // Image & description
    const img = document.getElementById("service-image");
    img.src = service.image;
    img.alt = service.title;

    document.getElementById("service-description").textContent = service.description;

    // Features
    const featuresEl = document.getElementById("service-features");
    featuresEl.innerHTML = service.features.map(f => `
        <div class="col-md-6">
          <div class="feature-item">
            <i class="bi ${f.icon} flex-shrink-0"></i>
            <div>
              <h5>${f.title}</h5>
              <p>${f.text}</p>
            </div>
          </div>
        </div>
      `).join("");

    // Process
    const processEl = document.getElementById("service-process");
    processEl.innerHTML = service.process.map((p, i) => `
        <div class="step-item">
          <div class="step-number">${String(i + 1).padStart(2, "0")}</div>
          <div class="step-content">
            <h5>${p.title}</h5>
            <p>${p.text}</p>
          </div>
        </div>
      `).join("");

    // Facts
    const factsEl = document.getElementById("service-facts");
    factsEl.innerHTML = Object.entries(service.facts).map(([k, v]) => `
        <li>
          <span class="fact-label">${k}:</span>
          <span class="fact-value">${v}</span>
        </li>
      `).join("");

    function redirectHome() {
        window.location.replace("index.html");
    }

})();