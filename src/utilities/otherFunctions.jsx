export const isValidEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const excludeEmptyStrings = (obj) => {
  let result = {};
  for (let [key, value] of Object.entries(obj)) {
    if (value !== "") {
      result[key] = value;
    }
  }
  return result;
};
export const generateCustomId = (prefix, length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let customId = prefix;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    customId += characters.charAt(randomIndex);
  }

  return customId;
};
