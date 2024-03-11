const isPasswordValid = (password) => {
  const isLengthValid = password.length >= 6;
  const isIncludeAlphabet = /[A-Za-z]/.test(password);

  return isLengthValid && isIncludeAlphabet;
};

export default isPasswordValid;
