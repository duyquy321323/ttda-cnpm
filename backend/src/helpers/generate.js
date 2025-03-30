

const generateNumber = (length) => {
  const string = "0123456789";
  let generate = "";
  for (let i = 1; i <= length; i++) {
    const index = Math.floor(Math.random() * 10);

    generate = generate + string.charAt(index);
  }

  return generate
}

module.exports = { generateNumber }