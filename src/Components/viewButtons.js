export function ViewButtons() {
  const sm = document.getElementById("sm");
  const med = document.getElementById("med");
  const lg = document.getElementById("lg");

  sm.addEventListener("click", function () {
    document.body.style.width = "640px";
    document.body.style.margin = "auto";
  });

  med.addEventListener("click", function () {
    document.body.style.width = "960px";
    document.body.style.margin = "auto";
  });

  lg.addEventListener("click", function () {
    document.body.style.width = "100vw";
  });

  window.addEventListener('load', function() {
    lg.click();
  });
}
