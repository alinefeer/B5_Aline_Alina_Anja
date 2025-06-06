/*formular*/
const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const email = document.getElementById("email");
const submitButton = document.getElementById("submit-button");
const errorMessage = document.getElementById("error");
const scoreForm = document.getElementById("scoreForm");
const spinner = document.getElementById("spinner");
const emailError = document.getElementById("email-error");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  await databaseClient.insertInto("user", {
    scoreForm: scoreForm.value,
    vorname: vorname.value,
    nachname: nachname.value,
    email: email.value,
  });

  alert("Deine Teilnahme war erfolgreich");
});

// Function to check if all form fields are valid
function checkFormValidity() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (
    scoreForm.value > 0 &&
    vorname.value &&
    nachname.value &&
    emailPattern.test(email.value)
  ) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

vorname.addEventListener("keyup", () => {
  const formValue = vorname.value.trim();

  if (formValue.length > 2) {
    errorMessage.innerHTML = "";
  } else {
    errorMessage.innerHTML = "Der eingegebene Vorname ist zu kurz.";
  }
});

nachname.addEventListener("keyup", () => {
  const formValue = nachname.value.trim();
  if (formValue.length > 2) {
    errorMessage.innerHTML = "";
  } else {
    errorMessage.innerHTML = "Der eingegebene Nachname ist zu kurz.";
  }
});

email.addEventListener("keyup", () => {
  const formValue = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(formValue)) {
    errorMessage.innerHTML = "";
  } else {
    errorMessage.innerHTML = "Bitte eine gültige E-Mail-Adresse eingeben.";
  }
});

scoreForm.addEventListener("keyup", () => {
  const formValue = scoreForm.value.trim();
  const number = Number(formValue);

  if (!isNaN(number) && number > 0) {
    errorMessage.innerHTML = "";
  } else {
    errorMessage.innerHTML = "Der Score muss eine positive Zahl sein.";
  }
});

// Add event listeners to input fields to validate on input
scoreForm.addEventListener("input", checkFormValidity);
vorname.addEventListener("input", checkFormValidity);
nachname.addEventListener("input", checkFormValidity);
email.addEventListener("input", checkFormValidity);

// Formular-Absenden mit E-Mail-Prüfung
document
  .getElementById("gewinnspiel-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    spinner.style.display = "block";
    emailError.classList.add("hidden");

    try {
      // 1. Prüfe, ob die E-Mail bereits existiert
      const checkResponse = await fetch(
        "/check-email?email=" + encodeURIComponent(email.value.trim())
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
        body: JSON.stringify({
          scoreForm: scoreForm.value.trim(),
          vorname: vorname.value.trim(),
          nachname: nachname.value.trim(),
          email: email.value.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Speichern.");
      }

      alert("Benutzer erfolgreich gespeichert!");
      document.getElementById("gewinnspiel-form").reset();
      checkFormValidity(); // Nach Reset Button wieder deaktivieren
    } catch (err) {
      alert("Ein Fehler ist aufgetreten: " + err.message);
    } finally {
      spinner.style.display = "none";
    }
  });
