document.addEventListener('DOMContentLoaded', function () {
    const navbarLinks = 
          document.querySelectorAll('.main-nav a');
    const sections = 
          document.querySelectorAll('section');

    // Log elements
    console.log(navbarLinks, sections);

    window.addEventListener('scroll', function () {
        const currentPos = window.scrollY;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 50;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentPos >= sectionTop && 
                currentPos < sectionTop + sectionHeight) {
                navbarLinks.forEach(function (navbarLink) {
                    navbarLink.classList.remove('active');
                });

                document.querySelector('.main-nav a[href="#' 
                    + sectionId + '"]')
                .classList.add('active');
            }
        });
    });
});