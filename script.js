/*==============================
      MOTION PREFERENCE
==============================*/

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

/*==============================
        HERO TYPING EFFECT
==============================*/

const heroTitle = document.getElementById("heroTitle");
const text = "Noreli Coffee";

function typeHero(){

    if(!heroTitle) return;

    if(prefersReducedMotion){

        heroTitle.textContent = text;
        heroTitle.classList.add("done");
        return;

    }

    let index = 0;

    function step(){

        if(index < text.length){

            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(step,100);

        } else {

            heroTitle.classList.add("done");

        }

    }

    step();

}

window.addEventListener("load",typeHero);

/*==============================
        HIDE LOADER
==============================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){
        loader.classList.add("hide");
    }

});

/*==============================
        CURSOR GLOW
==============================*/

const glow = document.querySelector(".cursor-glow");

if(glow && !prefersReducedMotion && matchMedia("(pointer:fine)").matches){

    document.addEventListener("mousemove",(e)=>{

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

} else if(glow){

    glow.remove();

}

/*==============================
      SMOOTH SCROLL BUTTONS
==============================*/

const menuButton = document.getElementById("menuButton");
const visitButtons = document.querySelectorAll("#visitButton");

if(menuButton){

    menuButton.addEventListener("click",()=>{

        document.querySelector("#coffee")?.scrollIntoView({ behavior:"smooth" });

    });

}

visitButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" });

    });

});

/*==============================
        NAVBAR SCROLL
==============================*/

const nav = document.querySelector("nav");

window.addEventListener("scroll",()=>{

    if(!nav) return;

    nav.classList.toggle("scrolled", window.scrollY > 60);

});

/*==============================
        FADE / REVEAL ANIMATION
==============================*/

const revealElements = document.querySelectorAll(".fade-up, .reveal");

if(prefersReducedMotion){

    revealElements.forEach(el => el.classList.add("show"));

} else {

    const revealObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);

            }

        });

    },{ threshold:0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

}

/*==============================
        STAT COUNT-UP
==============================*/

const statItems = document.querySelectorAll(".stat-item h3[data-count]");

function animateCount(el){

    const target = parseInt(el.dataset.count,10);
    const suffix = el.dataset.suffix || "";

    if(prefersReducedMotion){

        el.textContent = target + suffix;
        return;

    }

    let current = 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now){

        const progress = Math.min((now - start) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = current + suffix;

        if(progress < 1){

            requestAnimationFrame(tick);

        } else {

            el.textContent = target + suffix;

        }

    }

    requestAnimationFrame(tick);

}

if(statItems.length){

    const statObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animateCount(entry.target);
                statObserver.unobserve(entry.target);

            }

        });

    },{ threshold:0.6 });

    statItems.forEach(el => statObserver.observe(el));

}

/*==============================
      TESTIMONIAL SLIDER
==============================*/

const testimonials = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");
let current = 0;
let sliderTimer;

function showTestimonial(index){

    testimonials.forEach(card => card.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    testimonials[index].classList.add("active");
    dots[index].setAttribute("aria-selected","true");
    dots[index].classList.add("active");

}

function startSlider(){

    if(prefersReducedMotion || !testimonials.length) return;

    sliderTimer = setInterval(()=>{

        current = (current + 1) % testimonials.length;
        showTestimonial(current);

    },6000);

}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        current = index;
        showTestimonial(current);
        clearInterval(sliderTimer);
        startSlider();

    });

});

const testimonialSlider = document.querySelector(".testimonial-slider");

if(testimonialSlider){

    testimonialSlider.addEventListener("mouseenter", () => clearInterval(sliderTimer));
    testimonialSlider.addEventListener("mouseleave", startSlider);

}

startSlider();

/*==============================
      MOBILE NAVIGATION
==============================*/

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(toggle && navLinks){

    toggle.addEventListener("click",()=>{

        const isOpen = navLinks.classList.toggle("active");
        toggle.classList.toggle("active", isOpen);
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key === "Escape" && navLinks.classList.contains("active")){

            navLinks.classList.remove("active");
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded","false");
            toggle.focus();

        }

    });

}

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks?.classList.remove("active");
        toggle?.classList.remove("active");
        toggle?.setAttribute("aria-expanded","false");

    });

});

/*==============================
      GALLERY IMAGE ZOOM
==============================*/

document.querySelectorAll(".gallery-item img").forEach(image=>{

    image.addEventListener("click",()=>{

        image.classList.toggle("zoomed");

    });

});

/*==============================
      PARALLAX HERO
==============================*/

if(!prefersReducedMotion){

    window.addEventListener("scroll",()=>{

        const heroImage = document.querySelector(".hero-image");

        if(heroImage){

            heroImage.style.transform = `translateY(${window.scrollY * 0.25}px)`;

        }

    });

}

/*==============================
      BUTTON RIPPLE
==============================*/

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        if(prefersReducedMotion) return;

        const circle = document.createElement("span");
        circle.classList.add("ripple");
        this.appendChild(circle);

        const rect = this.getBoundingClientRect();

        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;

        setTimeout(()=> circle.remove(), 600);

    });

});

/*==============================
      ACTIVE NAV LINK
==============================*/

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let currentSection = "";

    sections.forEach(section=>{

        const top = section.offsetTop - 150;

        if(window.scrollY >= top){

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + currentSection){

            link.classList.add("active");

        }

    });

});

/*==============================
        BACK TO TOP
==============================*/

const topBtn = document.getElementById("topBtn");

if(topBtn){

    window.addEventListener("scroll",()=>{

        topBtn.classList.toggle("visible", window.scrollY > 500);

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({ top:0, behavior: prefersReducedMotion ? "auto" : "smooth" });

    });

}

/*==============================
      OPEN / CLOSED BADGE
==============================*/

const openBadge = document.getElementById("openBadge");

if(openBadge){

    const now = new Date();
    const hour = now.getHours();
    const isOpen = hour >= 7 && hour < 21; // 7:00 AM - 9:00 PM daily

    const statusText = openBadge.querySelector(".status-text");

    openBadge.classList.toggle("closed", !isOpen);

    if(statusText){

        statusText.textContent = isOpen
            ? "Open now · Closes 9:00 PM"
            : "Closed now · Opens 7:00 AM";

    }

}

/*==============================
      NEWSLETTER FORM
==============================*/

const newsletterForm = document.getElementById("newsletterForm");

if(newsletterForm){

    newsletterForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const input = newsletterForm.querySelector("input[type='email']");
        const msg = document.getElementById("newsletterMsg");

        if(input && input.value){

            msg.textContent = "Thank you — you're on the list.";
            newsletterForm.reset();

        } else {

            msg.textContent = "Please enter a valid email address.";

        }

    });

}
