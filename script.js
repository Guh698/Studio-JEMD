gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
);

document.addEventListener("DOMContentLoaded", () => {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true,
  });

  const pauseScroll = () => cleaner(true);
  const resumeScroll = () => smoother.paused(false);

  function runOpening(isMobile) {
    const tl = gsap.timeline({
      onComplete: () => {
        resumeScroll();
        ScrollTrigger.refresh();
      },
    });

    const words = document.querySelectorAll(".hero-animated-text");
    const splits = [];

    const splitInstance = new SplitText(words, { type: "words, chars" });
    splits.push(splitInstance);

    gsap.set(splitInstance.chars, {
      opacity: 0,
      scale: 1.7,
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
        splitInstance.chars,
        {
          opacity: 1,
          scale: 1,
          stagger: { amount: 0.7, from: "random" },
        },
        "-=0.7",
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
      "<",
    );
  }

  function initHoverEffects() {
    const links = document.querySelectorAll(".link");
    const enquiriesBtn = document.querySelector(".enquire");
    const splits = [];

    links.forEach((link) => {
      const splitInstance = new SplitText(link, { type: "chars" });
      splits.push(splitInstance);

      if (link === enquiriesBtn) {
        link.addEventListener("mouseenter", () => {
          gsap
            .timeline({ overwrite: "auto" })
            .to(splitInstance.chars, {
              opacity: 0,
              scale: 1.3,
              stagger: 0.02,
              duration: 0.27,
            })
            .to(
              splitInstance.chars,
              { opacity: 1, scale: 1, stagger: 0.02, duration: 0.3 },
              "-=0.1",
            );
          gsap.to(enquiriesBtn, { scale: 1.03, duration: 0.3 });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(enquiriesBtn, { scale: 1, duration: 0.3 });
        });
      } else {
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
      }
    });
    return () => splits.forEach((s) => s.revert());
  }

  /*smoother.paused(true);*/
  footerWordAnimation();

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      gsap.set(".opening", { display: "none" });
      /*runOpening(false);*/
      const cleanup = initHoverEffects();

      // --- HERO SECTION ---
      const words = document.querySelectorAll(".hero-animated-text");
      const splitInstance = new SplitText(words, { type: "words, chars" });

      ScrollTrigger.create({
        trigger: ".hero",
        start: "bottom 70%",
        onEnter() {
          gsap.to(splitInstance.chars, {
            opacity: 0,
            scale: 1.3,
            stagger: { amount: 0.5, from: "random" },
            overwrite: true,
          });
        },
        onLeaveBack() {
          gsap.to(splitInstance.chars, {
            opacity: 1,
            scale: 1,
            stagger: { amount: 0.5, from: "random" },
            overwrite: true,
          });
        },
      });

      // --- WORKFLOW SECTION (The Fix) ---
      const workflowContent = [
        {
          title: "I. Le Prélude & Alignment",
          text: "Great design begins with great conversation. We start by exploring your ambitions and aesthetic vision. Through our introductory process, we ensure our studio is the perfect fit to elevate your brand.",
        },
        {
          title: "II. The Client Lounge",
          text: "Upon official agreement, you receive access to a private, beautifully organized digital portal. This is your personal concierge desk for the project, housing your timeline, inspirations, and key documents in one effortless space. Expect a few tangible surprises along the way.",
        },
        {
          title: "III. Narrative & Visual Direction",
          text: "A striking interface means nothing without a compelling story. We meticulously craft your brand's narrative first, setting the foundation for high-fidelity visual prototyping and timeless typography.",
        },
        {
          title: "IV. The Craft & Sea Trials",
          text: "Once the design earns your absolute approval, our studio begins the architectural build. Every motion and interaction is coded to perfection. Finally, your site undergoes extensive Sea Trials—our rigorous quality assurance phase—ensuring a flawless, high-performance launch.",
        },
      ];

      const titleContainer = document.getElementById("workflow_title");
      const textContainer = document.getElementById("workflow_text");

      titleContainer.innerHTML = "";
      textContainer.innerHTML = "";

      const titleSplits = [];
      const textSplits = [];

      workflowContent.forEach((step, index) => {
        const titleEl = document.createElement("div");
        titleEl.textContent = step.title;
        gsap.set(titleEl, {
          position: index === 0 ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
        });
        titleContainer.appendChild(titleEl);

        const textEl = document.createElement("div");
        textEl.textContent = step.text;
        gsap.set(textEl, {
          position: index === 0 ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
        });
        textContainer.appendChild(textEl);

        titleSplits.push(new SplitText(titleEl, { type: "words, chars" }));
        textSplits.push(new SplitText(textEl, { type: "words, chars" }));

        if (index !== 0) {
          gsap.set([titleSplits[index].chars, textSplits[index].chars], {
            opacity: 0,
            scale: 1.3,
          });
        }
      });

      const workflowTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".workflow",
          start: "center center",
          end: "+=3700",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      workflowContent.forEach((_, i) => {
        if (i < workflowContent.length - 1) {
          workflowTl
            .to(titleSplits[i].chars, {
              opacity: 0,
              scale: 1.3,
              stagger: { amount: 0.3, from: "left" },
            })
            .to(
              textSplits[i].chars,
              {
                opacity: 0,
                scale: 1.3,
                stagger: { amount: 0.3, from: "left" },
              },
              "<",
            )
            .to(titleSplits[i + 1].chars, {
              opacity: 1,
              scale: 1,
              stagger: { amount: 0.3, from: "left" },
            })
            .to(
              textSplits[i + 1].chars,
              { opacity: 1, scale: 1, stagger: { amount: 0.3, from: "left" } },
              "<",
            );
        }
      });

      // --- SERVICES SECTION ---
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

      // --- WORKS SECTION ---
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

  gsap.to(".footer-overlay", {
    scrollTrigger: { trigger: ".about", start: "center center", scrub: true },
    rotateY: 0,
    rotateX: 0,
    scaleX: 1,
    y: 0,
  });

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
