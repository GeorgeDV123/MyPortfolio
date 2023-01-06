export function Rocket() {
  const speed = Math.floor(Math.random() * 5000 + 1000);

  for (let i = 0; i < 3; i++) {
    var rocket = document.createElement("span");
    rocket.classList.add("rocket");
    rocket.style.animationDuration = `${speed}ms`;
    document.body.append(rocket);
  }
}