let bubbles;

export function startBubbles() {
  bubbles = setInterval(() => {
    const width = Math.floor(Math.random() * 120 + 30);
    const position = Math.floor(Math.random() * screen.width);
    const speed = Math.floor(Math.random() * 4000 + 2000);

    const bubble = document.createElement("span");
    bubble.classList.add("bubble");

    bubble.style.width = `${width}px`;
    bubble.style.left = `${position}px`;
    bubble.style.animationDuration = `${speed}ms`;

    document.body.append(bubble);
  }, 400);
}

export function stopBubbles() {
  clearInterval(bubbles);
}


