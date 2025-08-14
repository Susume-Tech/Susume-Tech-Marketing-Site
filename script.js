const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".main-nav a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").substring(1) === entry.target.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, { threshold: 0.6 });

sections.forEach(sec => observer.observe(sec));