export function generateUserCode(): string {
  const randomLetters = Array.from({ length: 4 }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  ).join("");
  const randomNumber = Math.floor(Math.random() * 90) + 10;

  return `${randomLetters}-${randomNumber}`;
}
