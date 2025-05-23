/*game*/

const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const scoregame = document.getElementById("scoregame");

function jump() {
  dino.classList.add("jump-animation");
  setTimeout(() => dino.classList.remove("jump-animation"), 500);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "t" || event.key === "T") {
    if (!dino.classList.contains("jump-animation")) {
      jump();
    }
  }
});

setInterval(() => {
  const dinoTop = parseInt(
    window.getComputedStyle(dino).getPropertyValue("top")
  );
  const rockLeft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  score.innerText++;

  if (rockLeft < 0) {
    rock.style.display = "none";
  } else {
    rock.style.display = "";
  }

  if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
    score.innerText = 0;
  }
}, 50);

/*formular*/
const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const email = document.getElementById("email");
const submitButton = document.getElementById("submit-button");
const errorMessage = document.getElementById("error");
const score = document.getElementById("score");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  await databaseClient.insertInto("user", {
    vorname: vorname.value,
  });

  alert("User inserted successfully!");
});

// Function to check if all form fields are valid
function checkFormValidity() {
  // Validate that all fields are filled and email is valid
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Enable the button if all fields are filled correctly
  if (
    score.value > 0 &&
    vorname.value &&
    nachname.value &&
    emailPattern.test(email.value)
  ) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

vorname.addEventListener("keyup", (event) => {
  const formValue = vorname.value.trim();

  if (formValue.length > 2) {
    errorMessage.innerHTML = "";
  } else {
    errorMessage.innerHTML = "Der eingegebene Vorname ist zu kurz.";
  }
});

nachname.addEventListener("keyup", (event) => {
  const formValue = nachname.value.trim();
  if (formValue.length > 2) {
    errorMessage.innerHTML = "";
  } else {
    errorMessage.innerHTML = "Der eingegebene Nachname ist zu kurz.";
  }
});

// Add event listeners to input fields to validate on input
document.getElementById("score").addEventListener("input", checkFormValidity);
document.getElementById("vorname").addEventListener("input", checkFormValidity);
document
  .getElementById("nachname")
  .addEventListener("input", checkFormValidity);
document.getElementById("email").addEventListener("input", checkFormValidity);

/*
document
  .getElementById("gewinnspiel-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const score = score.value;
    const vorname = vorname.value.trim();
    const nachname = nachname.value.trim();
    const email = email.value.trim();

    let errorMessage = "";

    // Score Validation
    if (score <= 0) {
      errorMessage += "Der Score muss eine positive Zahl sein.\n";
    }

    // Name Validation
    if (!vorname || !nachname) {
      errorMessage += "Vorname und Nachname dürfen nicht leer sein.\n";
    }

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      errorMessage += "Bitte gib eine gültige E-Mail-Adresse ein.\n";
    }

    if (errorMessage) {
      alert(errorMessage);
    } else {
      alert("Formular erfolgreich eingereicht!");
      // this.submit(); // Uncomment this to actually submit the form if no errors
    }
  });
  */

/*
document
  .getElementById("gewinnspiel-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    spinner.style.display = "block";
    emailError.classList.add("hidden");

    try {
      // 1. Prüfe, ob die E-Mail bereits existiert
      const checkResponse = await fetch(
        "/check-email?email=" + encodeURIComponent(email)
      );
      const emailExists = await checkResponse.json();

      if (emailExists.exists) {
        emailError.classList.remove("hidden");
        spinner.style.display = "none";
        return;
      }

      // 2. E-Mail ist noch nicht vergeben → Daten speichern
      const response = await fetch("/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, vorname, nachname, email }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Speichern.");
      }

      alert("Benutzer erfolgreich gespeichert!");
      document.getElementById("userForm").reset();
    } catch (err) {
      alert("Ein Fehler ist aufgetreten: " + err.message);
    } finally {
      spinner.style.display = "none";
    }
  });*/
