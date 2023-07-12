const passwordInput = document.getElementById("password-input");
const copiedText = document.getElementById("copied-text");
const copiedBtn = document.getElementById("copied-btn");

const charaterLength = document.getElementById("character-Length");
const inputRage = document.getElementById("password-length-input");

const hasLowercaseInput = document.getElementById("hasLowercase");
const hasUppercaseInput = document.getElementById("hasUppercase");
const hasNumbersInput = document.getElementById("hasNumbers");
const hasSymbolsInput = document.getElementById("hasSymbols");

const passwordStrengthStatus = document.getElementById(
  "password-strength-status"
);
const passwordStrengthIndicator = document.getElementById(
  "password-strength-indicator"
);

const generateBtn = document.getElementById("generate-button");

const strengthColors = {
  "Too weak!": "border-2 w-2 ml-2 bg-coral-red border-coral-red",
  Weak: "border-2 w-2 ml-2 bg-sunset-peach border-sunset-peach",
  Medium: "border-2 w-2 ml-2 bg-honey-yellow border-honey-yellow",
  Strong: "border-2 w-2 ml-2 bg-mint-green border-mint-green",
  none: "border-2 w-2 ml-2 ",
};

charaterLength.innerText = inputRage.value;
inputRage.addEventListener("input", (e) => {
  charaterLength.innerText = e.target.value;
});

copiedBtn.addEventListener("click", () => {
  const inputValue = passwordInput.value;
  navigator.clipboard.writeText(inputValue);

  copiedText.classList.remove("hidden");

  setTimeout(() => {
    copiedText.classList.add("hidden");
  }, 1000);
});

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatePassword(
    inputRage.value,
    hasLowercaseInput.checked,
    hasUppercaseInput.checked,
    hasNumbersInput.checked,
    hasSymbolsInput.checked
  );

  passwordInput.value = password;
});

function generatePassword(
  length,
  hasUppercase,
  hasLowercase,
  hasNumbers,
  hasSymbols
) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+=-";

  let passwordCharacters = "";
  if (hasLowercase) passwordCharacters += lowercase;
  if (hasUppercase) passwordCharacters += uppercase;
  if (hasNumbers) passwordCharacters += numbers;
  if (hasSymbols) passwordCharacters += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    password +=
      passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
  }

  checkPasswordStrength(password);
  return password;
}

function checkPasswordStrength(password) {
  let strength = 0;

  // Verificar la longitud de la contraseña
  if (password.length >= 8 && password.length <= 12) {
    strength += 1;
  } else if (password.length > 12) {
    strength += 2;
  }

  // Verificar el uso de mayúsculas, minúsculas y símbolos
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+=-]/.test(password);

  if (hasUppercase && hasLowercase) {
    strength += 1;
  }
  if (hasSymbol) {
    strength += 1;
  }

  // Categorizar la fortaleza de la contraseña
  if (strength <= 1) {
    passwordStrengthStatus.innerText = "Too weak!";
    passwordStrengthIndicator.children[1].classList =
      strengthColors["Too weak!"];
    passwordStrengthIndicator.children[2].classList = strengthColors["none"];
    passwordStrengthIndicator.children[3].classList = strengthColors["none"];
    passwordStrengthIndicator.children[4].classList = strengthColors["none"];

    return "Too weak!";
  } else if (strength === 2) {
    passwordStrengthStatus.innerText = "Weak";

    passwordStrengthIndicator.children[1].classList = strengthColors["Weak"];
    passwordStrengthIndicator.children[2].classList = strengthColors["Weak"];
    passwordStrengthIndicator.children[3].classList = strengthColors["none"];
    passwordStrengthIndicator.children[4].classList = strengthColors["none"];
    return "Weak";
  } else if (strength === 3) {
    passwordStrengthStatus.innerText = "Medium";

    passwordStrengthIndicator.children[1].classList = strengthColors["Medium"];
    passwordStrengthIndicator.children[2].classList = strengthColors["Medium"];
    passwordStrengthIndicator.children[3].classList = strengthColors["Medium"];
    passwordStrengthIndicator.children[4].classList = strengthColors["none"];

    return "Medium";
  } else {
    passwordStrengthStatus.innerText = "Strong";

    passwordStrengthIndicator.children[1].classList = strengthColors["Strong"];
    passwordStrengthIndicator.children[2].classList = strengthColors["Strong"];
    passwordStrengthIndicator.children[3].classList = strengthColors["Strong"];
    passwordStrengthIndicator.children[4].classList = strengthColors["Strong"];
    passwordStrengthIndicator.children[4].classList = strengthColors["Strong"];

    return "Strong";
  }
}
