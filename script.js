window.onload = function () {
    // Show Swagger UIs
    var containers = document.querySelectorAll(".swagger");

    containers.forEach((el, index) => {
        const url = el.getAttribute("data-url");

        // Give each Swagger instance a unique container
        const containerId = "swagger-container-" + index;
        el.id = containerId;

        SwaggerUIBundle({
            url: url,
            dom_id: "#" + containerId,
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            layout: "BaseLayout"
        });
    });


    // Add intersection listeners after setting up the UI
    const sections = document.querySelectorAll("main > section");
    const navLinks = document.querySelectorAll(".main-nav a");

    // console.log(sections);
    sections.forEach(sec => {
        // Calculate the ratio of viewport height to section height
        const sectionHeight = sec.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        let threshold  = viewportHeight / sectionHeight * 0.5;
            
        if (threshold > 0.5) threshold = 0.5;
        

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When on the screen
                    entry.target.classList.add("visible");
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href").substring(1) === entry.target.id) {
                            link.classList.add("active");
                        }
                    });
                   // console.log("Intesecting: ", entry.target); 
                }
                else {
                    entry.target.classList.remove("visible");
                }
            });
        }, { threshold });

        // Observes just this one section
        observer.observe(sec);
    });
};
