let confetti;

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function startConfetti() {
  confetti = setInterval(() => {
    const position = Math.floor(Math.random() * screen.width);

    var randomColor = getRandomColor()

    const confetti = document.createElement("span");
    confetti.classList.add("confetti");

    confetti.style.left = `${position}px`;
    confetti.style.backgroundColor = randomColor

    document.body.append(confetti);
  }, 10);
}

export function stopConfetti() {
  clearInterval(confetti);
}
