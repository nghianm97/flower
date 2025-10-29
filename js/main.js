onload = () => {
  // Ensure video loads and plays
  const video = document.getElementById("main-background-video");
  if (video) {
    video.load();
    video.play().catch((e) => {
      console.log("Video autoplay failed:", e);
    });

    // Add class when video is loaded
    video.addEventListener("loadeddata", () => {
      document.body.classList.add("video-loaded");
    });
  }

  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = "Cảm ơn em vì đã xuất hiện! ❤️".split("");
    const titleElement = document.getElementById("title");
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 300); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};
