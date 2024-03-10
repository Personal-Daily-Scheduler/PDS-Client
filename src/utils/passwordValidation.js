const isPasswordValid = (password) => {
  const isLengthValid = password.length >= 6;
  const isAlphabeticValid = /[A-Za-z]/.test(password);

  return isLengthValid && isAlphabeticValid;
};

export default isPasswordValid;
