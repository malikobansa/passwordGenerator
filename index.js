function generatePassword(length, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols, excludeSimilar = false, customSymbols = "!@#$%^&*()") {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const similarChars = "l1I0O";

    let filteredLowerCaseChars = excludeSimilar ? lowerCaseChars.replace(/[l]/g, '') : lowerCaseChars;
    let filteredUpperCaseChars = excludeSimilar ? upperCaseChars.replace(/[IO]/g, '') : upperCaseChars;
    let filteredNumberChars = excludeSimilar ? numberChars.replace(/[01]/g, '') : numberChars;

    let allowedChars = "";
    let password = "";

    if (includeLowerCase) allowedChars += filteredLowerCaseChars;
    if (includeUpperCase) allowedChars += filteredUpperCaseChars;
    if (includeNumbers) allowedChars += filteredNumberChars;
    if (includeSymbols) allowedChars += customSymbols;

    if (length <= 0) {
        return `(Password Length must be at least 1)`;
    }
    if (allowedChars.length === 0) {
        return `(At least one set of characters needs to be selected)`;
    }

    if (includeLowerCase) password += filteredLowerCaseChars[Math.floor(Math.random() * filteredLowerCaseChars.length)];
    if (includeUpperCase) password += filteredUpperCaseChars[Math.floor(Math.random() * filteredUpperCaseChars.length)];
    if (includeNumbers) password += filteredNumberChars[Math.floor(Math.random() * filteredNumberChars.length)];
    if (includeSymbols) password += customSymbols[Math.floor(Math.random() * customSymbols.length)];

    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}

document.getElementById('generateButton').addEventListener('click', () => {
    const length = parseInt(document.getElementById('length').value);
    const includeLowerCase = document.getElementById('includeLowerCase').checked;
    const includeUpperCase = document.getElementById('includeUpperCase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const excludeSimilar = document.getElementById('excludeSimilar').checked;
    const customSymbols = document.getElementById('customSymbols').value || "!@#$%^&*()";

    const password = generatePassword(length, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols, excludeSimilar, customSymbols);

    document.getElementById('generatedPassword').textContent = password;
});

