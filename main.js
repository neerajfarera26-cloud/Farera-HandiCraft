gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero h1", {
  opacity: 0,
  y: 60,
  duration: 1.2
});

gsap.from(".hero p", {
  opacity: 0,
  y: 40,
  delay: 0.3
});

gsap.from(".product-card", {
  scrollTrigger: {
    trigger: ".explore-grid",
    start: "top 80%"
  },
  opacity: 0,
  y: 80,
  stagger: 0.2,
  duration: 1
});
