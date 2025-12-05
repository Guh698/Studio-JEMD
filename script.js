gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin
);

document.addEventListener("DOMContentLoaded", () => {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
  });

  function pauseScroll() {
    smoother.paused(true);
  }

  function resumeScroll() {
    smoother.paused(false);
  }

  function opening() {
    let openingTimeline = gsap.timeline({
      onComplete: () => {
        resumeScroll();
      },
    });
    openingTimeline.to("#path38", {
      morphSVG: "#path38-6",
      duration: 0.7,
      ease: "power2.inOut",
      delay: 1,
    });
    openingTimeline.to(
      "#path38-8",
      { morphSVG: "#path38-8-6", duration: 0.7, ease: "power2.inOut" },
      "<"
    );
    openingTimeline.to(
      "#path38-23",
      { morphSVG: "#path38-23-0", duration: 0.7, ease: "power2.inOut" },
      "<"
    );
    openingTimeline.to(
      "#path38-89",
      { morphSVG: "#path38-89-0", duration: 0.7, ease: "power2.inOut" },
      "<"
    );

    openingTimeline.to(".plane", {
      x: window.innerWidth * +1.13,
      duration: 2.7,
      ease: "power3.inOut",
    });

    openingTimeline.to(
      [".rect1, .rect2, .rect3, .rect4"],
      {
        scale: 3.7,
        duration: 1.3,
        ease: "power2.inOut",
      },
      "-=1"
    );

    openingTimeline.to(
      ".opening",
      {
        duration: 1.7,
        y: "-100%",
        ease: "power4.inOut",
      },
      "-=.3"
    );

    openingTimeline.to(
      [".hero-animated-text, .fixed-logo"],
      {
        duration: 1.7,
        opacity: 1,
        pointerEvents: "auto",
        ease: "power4.inOut",
      },
      "-=1.3"
    );
  }

  function mobileOpening() {
    let mobileOpeningTl = gsap.timeline({
      onComplete: () => {
        resumeScroll();
      },
    });
    mobileOpeningTl.to(".mobile-rect1", {
      y: "-15%",
      scaleX: 1.5,
      clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
      rotate: "170deg",
      duration: 0.7,
      ease: "power2.inOut",
      delay: 1,
    });

    mobileOpeningTl.to(
      ".mobile-rect2",
      {
        y: "30%",
        scaleX: 1.5,
        clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
        rotate: "25deg",
        duration: 0.7,
        ease: "power2.inOut",
      },
      "<"
    );

    mobileOpeningTl.to(
      ".mobile-rect3",
      {
        y: "-50%",
        scaleX: 1.7,
        clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
        rotate: "195deg",
        duration: 0.7,
        ease: "power2.inOut",
      },
      "<"
    );

    mobileOpeningTl.to(
      ".mobile-rect4",
      {
        y: "50%",
        scaleX: 1.7,
        clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
        rotate: "-15deg",
        duration: 0.7,
        ease: "power2.inOut",
      },
      "<"
    );

    mobileOpeningTl.to(".plane", {
      x: window.innerWidth * +1.5,
      duration: 2.7,
      ease: "power3.inOut",
    });

    mobileOpeningTl.to(
      [".mobile-rect1, .mobile-rect2, .mobile-rect3, .mobile-rect4"],
      {
        scale: 3,
        duration: 1.3,
        ease: "power2.inOut",
      },
      "-=1"
    );

    mobileOpeningTl.to(
      ".opening",
      {
        duration: 1.7,
        y: "-100%",
        ease: "power4.inOut",
      },
      "-=.3"
    );

    mobileOpeningTl.to(
      [".hero-animated-text, .fixed-logo svg"],
      {
        duration: 1.7,
        opacity: 1,
        ease: "power4.inOut",
      },
      "-=1.3"
    );
  }

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
      "<"
    );
  }

  pauseScroll();
  footerWordAnimation();

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      opening();

      let servicesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".services",
          start: "center center",
          end: "+=2700",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      servicesTimeline.to(".service-cases-wrapper", {
        x: window.innerWidth * -1 - 30,
        ease: "none",
      });

      servicesTimeline.to(
        ".case2",
        {
          scale: 1,
          rotate: 0,
          ease: "power2.out",
        },
        "<"
      );

      servicesTimeline.to(".service-cases-wrapper", {
        x: window.innerWidth * -2 - 60,
        ease: "none",
      });

      servicesTimeline.to(
        ".case3",
        {
          scale: 1,
          rotate: 0,
          ease: "power2.out",
        },
        "<"
      );

      let worksTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".works",
          start: "center center",
          end: "+=1300",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      worksTimeline.to(".work-cases-wrapper", {
        y: window.innerHeight * -0.7 - 30,
        ease: "none",
      });

      worksTimeline.to(".work-cases-wrapper", {
        y: window.innerHeight * -1.4 - 60,
        ease: "none",
      });

      worksTimeline.to(
        ".work-case3",
        {
          scale: 1,
          y: 0,
          rotate: 0,
          ease: "power2.out",
        },
        "<"
      );

      worksTimeline.to(".work-cases-wrapper", {
        y: window.innerHeight * -2.1 - 90,
        ease: "none",
      });

      worksTimeline.to(
        ".work-case4",
        {
          scale: 1,
          y: 0,
          rotate: 0,
          ease: "power2.out",
        },
        "<"
      );

      gsap.to(".footer-overlay", {
        scrollTrigger: {
          trigger: ".about",
          start: "center center",
          scrub: true,
        },
        rotateY: 0,
        rotateX: 0,
        scaleX: 1,
        y: 0,
      });
    },
    "(max-width: 1024px)": function () {
      mobileOpening();
      const servicesCards = document.querySelectorAll(".service-case");
      const workCards = document.querySelectorAll(".work-case");

      servicesCards.forEach((serviceCard) => {
        gsap.to(serviceCard, {
          scrollTrigger: {
            trigger: serviceCard,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
          rotate: 0,
          scaleX: 1,
          y: 0,
        });
      });

      workCards.forEach((workCard) => {
        gsap.to(workCard, {
          scrollTrigger: {
            trigger: workCard,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
          rotate: 0,
          scaleX: 1,
          y: 0,
        });
      });

      gsap.to(".footer-overlay", {
        scrollTrigger: {
          trigger: ".about",
          start: "center center",
          scrub: true,
        },
        rotateY: 0,
        rotateX: 0,
        scaleX: 1,
        y: 0,
      });
    },
  });

  function scrollToId(id) {
    const element = document.querySelector(`#${id}`);
    if (element) {
      gsap.to(window, {
        scrollTo: element,
        duration: 0.7,
        ease: "power4.inOut",
      });
    }
  }

  document.querySelectorAll(".scroll-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("data-scroll");
      scrollToId(id);
    });
  });
});
