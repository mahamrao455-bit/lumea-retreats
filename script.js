/* =====================================================
   LUMÉA RETREATS — COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   STAY DATA
===================================================== */

const stays = [
    {
        name: "Azure House",
        location: "Maldives · North Malé Atoll",
        price: "$480 / night",
        image:
            "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Casa Nusa",
        location: "Bali · Ubud",
        price: "$320 / night",
        image:
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Alpine No. 7",
        location: "Switzerland · Engadin",
        price: "$610 / night",
        image:
            "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Palm House",
        location: "Bali · Canggu",
        price: "$390 / night",
        image:
            "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "The Dune Villa",
        location: "Maldives · Baa Atoll",
        price: "$720 / night",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85"
    },

    {
        name: "Maison Lumière",
        location: "Paris · Montmartre",
        price: "$430 / night",
        image:
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85"
    }
];


/* =====================================================
   GALLERY DATA
===================================================== */

const galleryItems = [

    {
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
        category: "rooms",
        size: "tall"
    },

    {
        image:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
        category: "dining",
        size: ""
    },

    {
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
        category: "nature",
        size: ""
    },

    {
        image:
            "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=85",
        category: "rooms",
        size: ""
    },

    {
        image:
            "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85",
        category: "nature",
        size: "wide"
    },

    {
        image:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1000&q=85",
        category: "dining",
        size: ""
    },

    {
        image:
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85",
        category: "nature",
        size: ""
    },

    {
        image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
        category: "rooms",
        size: "wide"
    },

    {
        image:
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85",
        category: "dining",
        size: ""
    }
];


/* =====================================================
   DOM ELEMENTS
===================================================== */

const stayGrid = document.getElementById("stayGrid");

const galleryGrid =
    document.getElementById("galleryGrid");

const toast =
    document.getElementById("toast");

const themeToggle =
    document.getElementById("themeToggle");

const menuToggle =
    document.getElementById("menuToggle");

const searchBtn =
    document.getElementById("searchBtn");

const newsletterForm =
    document.getElementById("newsletterForm");

const bookingModal =
    document.getElementById("bookingModal");

const modalClose =
    document.getElementById("modalClose");

const bookingForm =
    document.getElementById("bookingForm");

const backTop =
    document.getElementById("backTop");


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.lumeaToastTimer);

    window.lumeaToastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);
}


/* =====================================================
   STAYS
===================================================== */

function renderStays() {

    if (!stayGrid) return;

    stayGrid.innerHTML = "";

    const savedFavorites =
        JSON.parse(
            localStorage.getItem("lumea-favorites") || "[]"
        );


    stays.forEach((stay, index) => {

        const card =
            document.createElement("article");

        card.className = "stay-card";


        const isSaved =
            savedFavorites.includes(index);


        card.innerHTML = `

            <div class="stay-img">

                <img
                    src="${stay.image}"
                    alt="${stay.name}"
                    loading="lazy"
                >

                <button
                    class="heart ${isSaved ? "saved" : ""}"
                    data-favorite="${index}"
                    aria-label="Save ${stay.name}"
                >
                    ${isSaved ? "♥" : "♡"}
                </button>

            </div>


            <div class="stay-info">

                <span class="price">
                    ${stay.price}
                </span>

                <h3>
                    ${stay.name}
                </h3>

                <p>
                    ${stay.location}
                </p>

            </div>

        `;


        stayGrid.appendChild(card);

    });

}


renderStays();


/* =====================================================
   FAVORITES
===================================================== */

if (stayGrid) {

    stayGrid.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "[data-favorite]"
                );


            if (!button) return;


            const index =
                Number(
                    button.dataset.favorite
                );


            let favorites =
                JSON.parse(
                    localStorage.getItem(
                        "lumea-favorites"
                    ) || "[]"
                );


            if (favorites.includes(index)) {

                favorites =
                    favorites.filter(
                        item => item !== index
                    );

                showToast(
                    "Removed from your wishlist"
                );

            } else {

                favorites.push(index);

                showToast(
                    "Saved to your Luméa wishlist ♡"
                );

            }


            localStorage.setItem(
                "lumea-favorites",
                JSON.stringify(favorites)
            );


            renderStays();

        }
    );

}


/* =====================================================
   GALLERY
===================================================== */

function renderGallery(
    category = "all"
) {

    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";


    const filteredItems =
        category === "all"
            ? galleryItems
            : galleryItems.filter(
                item =>
                    item.category === category
            );


    filteredItems.forEach((item) => {

        const element =
            document.createElement("div");


        element.className =
            `gallery-item ${item.size}`;


        element.innerHTML = `

            <img
                src="${item.image}"
                alt="Luméa retreat"
                loading="lazy"
            >

        `;


        galleryGrid.appendChild(element);

    });

}


renderGallery();


/* =====================================================
   GALLERY FILTERS
===================================================== */

const galleryButtons =
    document.querySelectorAll(
        ".gallery-filters button"
    );


galleryButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            galleryButtons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            const category =
                button.textContent
                    .trim()
                    .toLowerCase();


            renderGallery(category);

        }
    );

});


/* =====================================================
   BOOKING SEARCH
===================================================== */

const checkIn =
    document.getElementById("checkIn");

const checkOut =
    document.getElementById("checkOut");

const destination =
    document.getElementById("destination");

const guests =
    document.getElementById("guests");


/* Minimum check-in date */

if (checkIn && checkOut) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    checkIn.min = today;

    checkOut.min = today;


    checkIn.addEventListener(
        "change",
        () => {

            checkOut.min =
                checkIn.value;


            if (
                checkOut.value &&
                checkOut.value <=
                checkIn.value
            ) {

                checkOut.value = "";

            }

        }
    );

}


/* Search */

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        () => {

            if (
                !checkIn ||
                !checkOut ||
                !destination ||
                !guests
            ) {

                return;

            }


            if (
                !checkIn.value ||
                !checkOut.value
            ) {

                showToast(
                    "Please choose your dates first."
                );

                return;

            }


            if (
                new Date(checkOut.value) <=
                new Date(checkIn.value)
            ) {

                showToast(
                    "Check-out must be after check-in."
                );

                return;

            }


            showToast(
                `Exploring ${destination.value} for ${guests.value} ✦`
            );


            document
                .getElementById("stays")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}


/* =====================================================
   BOOKING MODAL
===================================================== */

function openBookingModal() {

    if (!bookingModal) return;

    bookingModal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeBookingModal() {

    if (!bookingModal) return;

    bookingModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* Open from booking buttons */

document
    .querySelectorAll(
        ".nav-book, .outline-btn, .hero-btn"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openBookingModal();

            }
        );

    });


/* Close */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeBookingModal
    );

}


/* Click outside */

if (bookingModal) {

    bookingModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                bookingModal
            ) {

                closeBookingModal();

            }

        }
    );

}


/* Escape */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeBookingModal();

        }

    }
);


/* Booking form */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "guestName"
                )?.value.trim();


            const selectedDestination =
                document.getElementById(
                    "modalDestination"
                )?.value;


            if (!name) {

                showToast(
                    "Please enter your name."
                );

                return;

            }


            if (!selectedDestination) {

                showToast(
                    "Please choose a destination."
                );

                return;

            }


            closeBookingModal();


            showToast(
                `Thank you ${name} — your ${selectedDestination} request is on its way ✦`
            );


            bookingForm.reset();

        }
    );

}


/* =====================================================
   NEWSLETTER
===================================================== */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "email"
                );


            const email =
                emailInput?.value.trim();


            if (!email) {

                showToast(
                    "Please enter your email."
                );

                return;

            }


            showToast(
                "Welcome to the Luméa Journal ✦"
            );


            localStorage.setItem(
                "lumea-subscriber",
                email
            );


            newsletterForm.reset();

        }
    );

}


/* =====================================================
   DARK MODE
===================================================== */

let darkMode =
    localStorage.getItem(
        "lumea-dark-mode"
    ) === "true";


function applyTheme() {

    const root =
        document.documentElement;


    if (darkMode) {

        root.style.setProperty(
            "--bg",
            "#171a17"
        );

        root.style.setProperty(
            "--surface",
            "#20241f"
        );

        root.style.setProperty(
            "--text",
            "#f0eee6"
        );

        root.style.setProperty(
            "--muted",
            "#a5aaa1"
        );

        root.style.setProperty(
            "--line",
            "#3a4039"
        );

        root.style.setProperty(
            "--accent",
            "#56634f"
        );

        root.style.setProperty(
            "--dark",
            "#0e110e"
        );


        if (themeToggle) {

            themeToggle.textContent =
                "☾";

        }

    } else {

        root.style.setProperty(
            "--bg",
            "#f4f0e8"
        );

        root.style.setProperty(
            "--surface",
            "#fbf9f4"
        );

        root.style.setProperty(
            "--text",
            "#20251f"
        );

        root.style.setProperty(
            "--muted",
            "#72756d"
        );

        root.style.setProperty(
            "--line",
            "#d9d4c9"
        );

        root.style.setProperty(
            "--accent",
            "#68755f"
        );

        root.style.setProperty(
            "--dark",
            "#1d241d"
        );


        if (themeToggle) {

            themeToggle.textContent =
                "☼";

        }

    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            darkMode =
                !darkMode;


            localStorage.setItem(
                "lumea-dark-mode",
                darkMode
            );


            applyTheme();


            showToast(
                darkMode
                    ? "Dark mode enabled"
                    : "Light mode enabled"
            );

        }
    );

}


applyTheme();


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            const nav =
                document.querySelector(
                    ".nav"
                );


            if (!nav) return;


            nav.classList.toggle(
                "mobile-open"
            );


            if (
                nav.classList.contains(
                    "mobile-open"
                )
            ) {

                nav.style.display =
                    "flex";

                nav.style.position =
                    "absolute";

                nav.style.top =
                    "78px";

                nav.style.left =
                    "0";

                nav.style.right =
                    "0";

                nav.style.padding =
                    "28px 5vw";

                nav.style.background =
                    "var(--surface)";

                nav.style.flexDirection =
                    "column";

                nav.style.alignItems =
                    "flex-start";

                nav.style.borderBottom =
                    "1px solid var(--line)";

            } else {

                nav.removeAttribute(
                    "style"
                );

            }

        }
    );

}


/* Close mobile menu after clicking */

document
    .querySelectorAll(
        ".nav a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                const nav =
                    document.querySelector(
                        ".nav"
                    );


                if (
                    window.innerWidth <=
                    650
                ) {

                    nav?.classList.remove(
                        "mobile-open"
                    );

                    nav?.removeAttribute(
                        "style"
                    );

                }

            }
        );

    });


/* =====================================================
   EXPERIENCE BUTTONS
===================================================== */

document
    .querySelectorAll(
        ".experience-links button"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const experience =
                    button.textContent
                        .replace("↗", "")
                        .trim();


                showToast(
                    `${experience} experience selected ✦`
                );

            }
        );

    });


/* =====================================================
   JOURNAL LINKS
===================================================== */

document
    .querySelectorAll(
        ".journal-card a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                showToast(
                    "The full journal is coming soon ✦"
                );

            }
        );

    });


/* =====================================================
   TEXT / CARD MICRO INTERACTIONS
===================================================== */

document
    .querySelectorAll(
        ".collection-grid article"
    )
    .forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateY(-4px)";

                card.style.transition =
                    "transform 0.3s ease";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";

            }
        );

    });


/* =====================================================
   BACK TO TOP
===================================================== */

if (backTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY >
                600
            ) {

                backTop.classList.add(
                    "visible"
                );

            } else {

                backTop.classList.remove(
                    "visible"
                );

            }

        }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section, .stats-section, .why-section, .experience-section, .rituals, .philosophy-section, .quote-section, .gallery, .journal-section, .testimonial-section, .newsletter"
    );


if (
    "IntersectionObserver"
    in window
) {

    revealElements.forEach(
        (element) => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

        }
    );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.style.opacity =
                "1";

            element.style.transform =
                "none";

        }
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

console.log(
    "✦ Luméa Retreats — experience initialized."
);