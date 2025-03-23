const primaryButton = document
  .querySelector("#primarybtn")
  .addEventListener("click", () => {
    const timer = document.querySelector("#timer");
    if (timer) {
      timer.setAttribute("switch", "true");
    }
  });
const secondaryButton = document.querySelector("#secondarybtn");
