/* =========================================================
   AVENRO DEVELOPERS
   PREMIUM REAL ESTATE WEBSITE
   SCRIPT.JS — PART 1/3
   NAVIGATION • MOBILE MENU • HEADER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT SELECTORS
       ===================================================== */

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });

        /* Close menu when clicking a navigation link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("menu-open");
            });

        });
    }


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );
    }


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            document.body.classList.remove("menu-open");
        }

    });


    /* =====================================================
       ESCAPE KEY — CLOSE MENU
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            document.body.classList.remove("menu-open");
        }

    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


});
/* =========================================================
   AVENRO DEVELOPERS
   PREMIUM REAL ESTATE WEBSITE
   SCRIPT.JS — PART 2/3
   SCROLL REVEAL • COUNTERS • PROJECTS • IMAGE EFFECTS
   ========================================================= */


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-label, " +
    ".section-title, " +
    ".why-content, " +
    ".why-image, " +
    ".feature-item, " +
    ".experience-card, " +
    ".process-step, " +
    ".testimonial-card, " +
    ".contact-info, " +
    ".contact-form, " +
    ".cta-inner"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {
        element.classList.add("revealed");
    });

}


/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

const counters = document.querySelectorAll(
    "[data-counter]"
);

const animateCounter = counter => {

    const target = parseInt(
        counter.getAttribute("data-counter"),
        10
    );

    if (isNaN(target)) {
        return;
    }

    const duration = 1800;
    const startTime = performance.now();

    const updateCounter = currentTime => {

        const elapsed = currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        /*
         * Ease-out effect
         */
        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(
            easedProgress * target
        );

        counter.textContent = currentValue;

        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            counter.textContent = target;
        }

    };

    requestAnimationFrame(updateCounter);
};


if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const counter = entry.target;

                    if (
                        !counter.dataset.animated
                    ) {

                        counter.dataset.animated = "true";

                        animateCounter(counter);

                    }

                    observer.unobserve(counter);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

} else {

    counters.forEach(counter => {

        const value =
            counter.getAttribute("data-counter");

        counter.textContent = value || "0";

    });

}


/* =========================================================
   PROJECT IMAGE HOVER EFFECT
   ========================================================= */

const projectCards = document.querySelectorAll(
    ".project-card"
);

projectCards.forEach(card => {

    const image = card.querySelector("img");

    if (!image) {
        return;
    }

    card.addEventListener("mouseenter", () => {

        image.style.transform = "scale(1.04)";

    });

    card.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

    });

});


/* =========================================================
   IMAGE LOAD EFFECT
   ========================================================= */

const images = document.querySelectorAll("img");

images.forEach(image => {

    if (image.complete) {

        image.classList.add("image-loaded");

    } else {

        image.addEventListener(
            "load",
            () => {
                image.classList.add("image-loaded");
            },
            { once: true }
        );

    }

});


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll(
    "section[id]"
);

const navigationLinks = document.querySelectorAll(
    '.nav-menu a[href^="#"]'
);

if (
    sections.length &&
    navigationLinks.length &&
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.getAttribute("id");

                    navigationLinks.forEach(link => {

                        link.classList.remove("active");

                        const href =
                            link.getAttribute("href");

                        if (
                            href === "#" + currentId
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* =========================================================
   PROJECT CARD KEYBOARD ACCESSIBILITY
   ========================================================= */

projectCards.forEach(card => {

    card.addEventListener("keydown", event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            const link =
                card.querySelector("a");

            if (link) {
                link.click();
            }

        }

    });

});


/* =========================================================
   PREVENT IMAGE DRAGGING
   ========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.setAttribute(
        "draggable",
        "false"
    );

    image.addEventListener(
        "dragstart",
        event => {
            event.preventDefault();
        }
    );

});


/* =========================================================
   CONSOLE BRAND MESSAGE
   ========================================================= */

console.log(
    "%cAVENRO DEVELOPERS",
    "font-size:18px;font-weight:bold;"
);

console.log(
    "Premium spaces. Thoughtfully developed."
);
/* =========================================================
   AVENRO DEVELOPERS
   PREMIUM REAL ESTATE WEBSITE
   SCRIPT.JS — PART 3/3
   BACK TO TOP • CONTACT FORM • WHATSAPP • FINAL POLISH
   ========================================================= */


/* =========================================================
   BACK TO TOP BUTTON
   ========================================================= */

const backToTop = document.querySelector(
    ".back-to-top"
);

if (backToTop) {

    const toggleBackToTop = () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };

    toggleBackToTop();

    window.addEventListener(
        "scroll",
        toggleBackToTop,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const nameInput =
                contactForm.querySelector(
                    '[name="name"]'
                );

            const phoneInput =
                contactForm.querySelector(
                    '[name="phone"]'
                );

            const emailInput =
                contactForm.querySelector(
                    '[name="email"]'
                );

            const messageInput =
                contactForm.querySelector(
                    '[name="message"]'
                );

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const message =
                messageInput
                    ? messageInput.value.trim()
                    : "";


            /* ---------------------------------------------
               BASIC VALIDATION
               --------------------------------------------- */

            if (!name) {

                alert(
                    "Please enter your name."
                );

                if (nameInput) {
                    nameInput.focus();
                }

                return;
            }


            if (!phone) {

                alert(
                    "Please enter your phone number."
                );

                if (phoneInput) {
                    phoneInput.focus();
                }

                return;
            }


            /* ---------------------------------------------
               PHONE VALIDATION
               --------------------------------------------- */

            const cleanPhone =
                phone.replace(/\D/g, "");

            if (
                cleanPhone.length < 10 ||
                cleanPhone.length > 15
            ) {

                alert(
                    "Please enter a valid phone number."
                );

                if (phoneInput) {
                    phoneInput.focus();
                }

                return;
            }


            /* ---------------------------------------------
               EMAIL VALIDATION
               --------------------------------------------- */

            if (email) {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !emailPattern.test(email)
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;
                }

            }


            /* ---------------------------------------------
               WHATSAPP MESSAGE
               --------------------------------------------- */

            const whatsappNumber =
                "919987475783";

            const whatsappMessage =
                `Hello Avenro Developers,

I am interested in your real estate projects.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Message: ${message || "I would like to know more about your projects."}

Please share more details.`;

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            /* ---------------------------------------------
               SUBMIT BUTTON
               --------------------------------------------- */

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );

            if (submitButton) {

                const originalText =
                    submitButton.textContent;

                submitButton.disabled = true;

                if (
                    submitButton.tagName ===
                    "INPUT"
                ) {

                    submitButton.value =
                        "Opening WhatsApp...";

                } else {

                    submitButton.textContent =
                        "Opening WhatsApp...";

                }


                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );

                    submitButton.disabled =
                        false;

                    if (
                        submitButton.tagName ===
                        "INPUT"
                    ) {

                        submitButton.value =
                            originalText;

                    } else {

                        submitButton.textContent =
                            originalText;

                    }

                }, 500);

            } else {

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }

        }
    );

}


/* =========================================================
   PHONE NUMBER LINKS
   ========================================================= */

const phoneLinks =
    document.querySelectorAll(
        'a[href^="tel:"]'
    );

phoneLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            console.log(
                "Calling Avenro Developers..."
            );

        }
    );

});


/* =========================================================
   WHATSAPP LINKS
   ========================================================= */

const whatsappLinks =
    document.querySelectorAll(
        'a[href*="wa.me"]'
    );

whatsappLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            console.log(
                "Opening WhatsApp..."
            );

        }
    );

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElements =
    document.querySelectorAll(
        "[data-year]"
    );

yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});


/* =========================================================
   LAZY IMAGE FALLBACK
   ========================================================= */

const lazyImages =
    document.querySelectorAll(
        'img[loading="lazy"]'
    );

lazyImages.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-error"
            );

            console.warn(
                "Image could not be loaded:",
                image.src
            );

        },
        { once: true }
    );

});


/* =========================================================
   ONLINE / OFFLINE STATUS
   ========================================================= */

window.addEventListener(
    "online",
    () => {

        console.log(
            "Avenro Developers website is online."
        );

    }
);

window.addEventListener(
    "offline",
    () => {

        console.warn(
            "Internet connection lost."
        );

    }
);


/* =========================================================
   FINAL INITIALIZATION
   ========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);

document.body.classList.add(
    "page-ready"
);


/* =========================================================
   AVENRO DEVELOPERS — SCRIPT COMPLETE
   ========================================================= */

console.log(
    "%cAvenro Developers website initialized successfully.",
    "font-weight:bold;"
);
