document.addEventListener("alpine:init", () => {
  Alpine.store("offCanvas", {
    mobileMenu: false,
    cart: false,
    contact: false,
    announcementBarHeight: 0,
  });

  Alpine.store("inputMethod", {
    isKeyboard: false,
    init() {
      document.addEventListener("pointerdown", () => {
        this.isKeyboard = false;
        document.body.classList.remove("keyboard-nav");
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          this.isKeyboard = true;
          document.body.classList.add("keyboard-nav");
        }
      });
    },
  });
});

document.addEventListener("alpine:initialized", () => {
  const bar = document.querySelector(".announcement-bar");
  if (bar) {
    Alpine.store("offCanvas").announcementBarHeight = bar.offsetHeight;
    new ResizeObserver(([entry]) => {
      Alpine.store("offCanvas").announcementBarHeight = entry.contentRect.height;
    }).observe(bar);
  }
});
