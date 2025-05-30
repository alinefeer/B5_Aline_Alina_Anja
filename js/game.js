const product = document.getElementById("product");
const trolley = document.getElementById("trolley");
const scoregame = document.getElementById("scoregame");
const game = document.getElementById("game");
const startButton = document.getElementById("start-button");
const gameOverText = document.getElementById("game-over");

let gameStarted = false;
let score = 0;

// Spiel zuerst unscharf & pausiert
game.classList.add("blurred");
trolley.style.animation = "none";

function jump() {
  if (!gameStarted) return;
  product.classList.add("jump-animation");
  setTimeout(() => product.classList.remove("jump-animation"), 500);
}

document.addEventListener("keydown", (event) => {
  if (
    (event.key === "t" || event.key === "T") &&
    !product.classList.contains("jump-animation")
  ) {
    jump();
  }
});

startButton.addEventListener("click", () => {
  gameStarted = true;
  game.classList.remove("blurred");
  startButton.disabled = true;
  score = 0;
  scoregame.innerText = score;

  // Game Over Text ausblenden
  gameOverText.classList.add("hidden");

  // Trolley zurücksetzen & Animation neu starten
  trolley.style.animation = "none";
  trolley.offsetHeight; // Reflow erzwingen
  trolley.style.animation = "trolley 1.33s infinite";
  trolley.style.display = "";
});

// Spiel-Loop
setInterval(() => {
  if (!gameStarted) return;

  const productTop = parseInt(
    window.getComputedStyle(product).getPropertyValue("top")
  );
  const trolleyLeft = parseInt(
    window.getComputedStyle(trolley).getPropertyValue("left")
  );

  if (trolleyLeft < 0) {
    trolley.style.display = "none";
  } else {
    trolley.style.display = "";
  }

  // Kollision prüfen: Trolley zu nah & Produkt nicht gesprungen
  if (trolleyLeft < 50 && trolleyLeft > 0 && productTop > 150) {
    gameStarted = false;
    game.classList.add("blurred");
    startButton.disabled = false;

    // Animation stoppen – Trolley bleibt stehen
    trolley.style.animation = "none";

    // Game Over Text anzeigen
    gameOverText.classList.remove("hidden");
  } else {
    score++;
    scoregame.innerText = score;
  }

  if (score % 100 === 0) {
    // z. B. Geschwindigkeit erhöhen, Animation kürzer machen
    trolley.style.animation = "none";
    trolley.offsetHeight;
    trolley.style.animation = `trolley ${Math.max(
      0.5,
      1.5 - score / 300
    )}s infinite`;
  }
}, 50);
