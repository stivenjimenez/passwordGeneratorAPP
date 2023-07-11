function generatePassword(
  length,
  hasLowercase,
  hasUppercase,
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

  return password;
}

console.log(generatePassword(12, true, true, true, true));
