console.log("🔊 sounds.js loaded");

const jarvisSounds = {
  startup: new Audio("/sounds/startup.mp3"),
  panelOpen: new Audio("/sounds/panel-open.mp3"),
  panelClose: new Audio("/sounds/panel-close.mp3"),
  send: new Audio("/sounds/send.mp3"),
  reply: new Audio("/sounds/reply.mp3")
};


function playJarvisSound(type) {
  const sound = jarvisSounds[type];
  if (!sound) return;

  sound.currentTime = 0;
  sound.volume = 1;

  sound.play()
    .then(() => console.log("▶️ Playing:", type))
    .catch(err => console.warn("❌ Audio blocked:", err));
}
