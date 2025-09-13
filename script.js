const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".main-nav a");

sections.forEach(sec => {
    // Calculate the ratio of viewport height to section height
    const sectionHeight = sec.offsetHeight;
    const viewportHeight = window.innerHeight;
    let threshold = 0.5; // default

    if (sectionHeight > viewportHeight) {
        // If section is taller than viewport, set a lower threshold
        threshold = viewportHeight / sectionHeight * 0.5; // 80% of viewport height
        if (threshold > 1) threshold = 1;
    }

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
            }
            else {
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold });

    // Observes just this one section
    observer.observe(sec);
});