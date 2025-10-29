const title = document.querySelector(".title");
const text = `Anh có điều muốn nói`.split("");

// Create container for better responsive layout
title.style.display = "flex";
title.style.flexWrap = "wrap";
title.style.justifyContent = "center";
title.style.gap = "0.5rem";

for (let index = 0; index < text.length; index++) {
  if (text[index] !== " ") {
    title.innerHTML += `<span>${text[index]}</span>`;
  } else {
    title.innerHTML += `<span style='width: 1rem'></span>`;
  }
}

const textElements = document.querySelectorAll(".title span");
textElements.forEach((element) => {
  const randomDelay = Math.random() * 3;
  element.style.animationDelay = `${randomDelay}s`;
});

// Add video functionality when button is clicked
document.addEventListener("DOMContentLoaded", function () {
  const giftButton = document.getElementById("gift-button");
  const videoPlayer = document.getElementById("video-player");
  const videoElement = document.getElementById("video-element");
  const overlay = document.getElementById("overlay");

  if (giftButton && videoPlayer && videoElement && overlay) {
    giftButton.addEventListener("click", function (e) {
      // Prevent default behavior
      e.preventDefault();

      console.log("Button clicked - starting video and hiding overlay");

      // Start playing video immediately
      startVideo();

      // Hide overlay with animation
      setTimeout(function () {
        overlay.classList.add("hidden");
        console.log("Overlay hidden - flower page is now visible");
      }, 500);
    });
  }
});

// Function to start playing video
function startVideo() {
  const videoPlayer = document.getElementById("video-player");
  const videoElement = document.getElementById("video-element");

  console.log("startVideo called");
  console.log("videoPlayer:", videoPlayer);
  console.log("videoElement:", videoElement);

  if (videoPlayer && videoElement) {
    // Make video player visible but off-screen for autoplay to work
    videoPlayer.style.position = "fixed";
    videoPlayer.style.top = "-100px";
    videoPlayer.style.left = "-100px";
    videoPlayer.style.width = "200px";
    videoPlayer.style.height = "200px";
    videoPlayer.style.opacity = "0.01"; // Very low opacity but not 0
    videoPlayer.style.pointerEvents = "none";
    videoPlayer.style.zIndex = "1"; // Positive z-index

    console.log("Video player positioned");

    // Preload and play the video
    videoElement.load(); // Ensure video is loaded
    videoElement.muted = false; // Unmute to hear the audio
    videoElement.volume = 1.0; // Set volume to max

    console.log("Video element configured, attempting to play...");

    // Try to play the video
    const playPromise = videoElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("✅ Video started playing successfully!");
          // Hide the player after it starts playing
          setTimeout(() => {
            videoPlayer.style.opacity = "0";
            videoPlayer.style.zIndex = "-9999";
          }, 1000);
        })
        .catch((error) => {
          console.log("❌ Video autoplay blocked, trying with muted:", error);
          // Try with muted first, then unmute after play starts
          videoElement.muted = true;
          videoElement
            .play()
            .then(() => {
              console.log("✅ Video started playing (muted)");
              // Try to unmute after play starts
              setTimeout(() => {
                videoElement.muted = false;
                console.log("✅ Video unmuted");
                // Hide the player after it starts playing
                videoPlayer.style.opacity = "0";
                videoPlayer.style.zIndex = "-9999";
              }, 500);
            })
            .catch((err) => {
              console.log("❌ Could not play video even with muted:", err);
            });
        });
    } else {
      console.log("❌ play() returned undefined");
    }
  } else {
    console.log("❌ Video elements not found");
  }
}
