gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Smoother
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true,
  });

  const pauseScroll = () => cleaner(true);
  const resumeScroll = () => smoother.paused(false);

  // 2. Consolidated Opening (Dry & Clean)
  function runOpening(isMobile) {
    const tl = gsap.timeline({
      onComplete: () => {
        resumeScroll();
        ScrollTrigger.refresh(); // Crucial for layout accuracy
      },
    });

    const rects = ".mobile-rect1, .mobile-rect2, .mobile-rect3, .mobile-rect4";

    tl.to(".mobile-rect1", {
      y: "-15%",
      scaleX: isMobile ? 1.5 : 1.3,
      rotate: 170,
      clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
      duration: 0.7,
      ease: "power2.inOut",
      delay: 1,
    })
      .to(
        ".mobile-rect2",
        {
          y: isMobile ? "30%" : "60%",
          scaleX: 1.5,
          rotate: 25,
          clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        ".mobile-rect3",
        {
          y: "-50%",
          scaleX: 1.7,
          rotate: 195,
          clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        ".mobile-rect4",
        {
          y: "50%",
          scaleX: 1.7,
          rotate: -15,
          clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(".plane", {
        x: () => window.innerWidth * 1.5,
        duration: 2.7,
        ease: "power3.inOut",
      })
      .to(rects, { scale: 3, duration: 1.3, ease: "power2.inOut" }, "-=1")
      .to(
        ".opening",
        { y: "-100%", duration: 1.7, ease: "power4.inOut" },
        "-=.3",
      )
      .to(
        ".hero-animated-text, .fixed-logo",
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 1.7,
          ease: "power4.inOut",
        },
        "-=1.3",
      );
  }

  // 3. Optimized Footer Marquee
  function footerWordAnimation() {
    let footerTimeline = gsap.timeline({ repeat: -1 });

    footerTimeline.to(".first-footer-svg", {
      x: "-117%",
      ease: "none",
      duration: 7,
    });
    footerTimeline.to(
      ".second-footer-svg",
      {
        x: "0",
        ease: "none",
        duration: 7,
      },
      "<",
    );
  }

  // 4. Hover Effects with Revert cleanup
  function initHoverEffects() {
    const links = document.querySelectorAll(".link");
    const splits = [];

    links.forEach((link) => {
      const splitInstance = new SplitText(link, { type: "chars" });
      splits.push(splitInstance);

      link.addEventListener("mouseenter", () => {
        gsap
          .timeline({ overwrite: "auto" })
          .to(splitInstance.chars, {
            opacity: 0,
            scale: 1.7,
            stagger: 0.02,
            duration: 0.3,
          })
          .to(
            splitInstance.chars,
            { opacity: 1, scale: 1, stagger: 0.02, duration: 0.3 },
            "-=0.1",
          );
      });
    });
    return () => splits.forEach((s) => s.revert());
  }

  // 5. Execution & Responsive Logic
  smoother.paused(true);
  footerWordAnimation();

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      runOpening(false);
      const cleanup = initHoverEffects();

      // Desktop Services (using function-based values for resize safety)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".services",
            start: "center center",
            end: "+=2700",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(".service-cases-wrapper", {
          x: () => (window.innerWidth + 30) * -1,
          ease: "none",
        })
        .to(".case2", { scale: 1, rotate: 0 }, "<")
        .to(".service-cases-wrapper", {
          x: () => (window.innerWidth * 2 + 60) * -1,
          ease: "none",
        })
        .to(".case3", { scale: 1, rotate: 0 }, "<");

      // Desktop Works
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".works",
            start: "center center",
            end: "+=1300",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(".work-cases-wrapper", {
          y: () => (window.innerHeight * 0.7 + 30) * -1,
          ease: "none",
        })
        .to(".work-cases-wrapper", {
          y: () => (window.innerHeight * 1.4 + 60) * -1,
          ease: "none",
        })
        .to(".work-case3", { scale: 1, y: 0, rotate: 0 }, "<");

      return () => cleanup();
    },

    "(max-width: 1023px)": function () {
      runOpening(true);
      [".service-case", ".work-case"].forEach((selector) => {
        gsap.utils.toArray(selector).forEach((card) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
            rotate: 0,
            scaleX: 1,
            y: 0,
          });
        });
      });
    },
  });

  // Common Footer Animation
  gsap.to(".footer-overlay", {
    scrollTrigger: { trigger: ".about", start: "center center", scrub: true },
    rotateY: 0,
    rotateX: 0,
    scaleX: 1,
    y: 0,
  });

  // Smooth Scroll Anchor Handling
  document.querySelectorAll(".scroll-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(
        `#${link.getAttribute("data-scroll")}`,
      );
      if (target) smoother.scrollTo(target, true, "center center");
    });
  });
});
