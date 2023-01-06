import { startBubbles, stopBubbles } from "./CoolButtons/bubbles";
import { stopConfetti, startConfetti } from "./CoolButtons/Confetti";
import { Rocket } from "./CoolButtons/rocket";

export function CoolButtons() {
  const bub = document.getElementById("bub");
  const con = document.getElementById("con");
  const roc = document.getElementById("roc");

  bub.addEventListener("click", function () {
    bub.disabled = true;
    setTimeout(function () {
      bub.disabled = false;
    }, 7000);
    startBubbles();
    setTimeout(stopBubbles, 6000);
  });

  con.addEventListener("click", function () {
    con.disabled = true;
    setTimeout(function () {
      con.disabled = false;
    }, 4000);
    startConfetti();
    setTimeout(stopConfetti, 3000);
  });

  roc.addEventListener("click", function () {
    Rocket()
  });
}
