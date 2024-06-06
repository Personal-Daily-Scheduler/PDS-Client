const isValidEmail = (emailInput) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(emailInput);
};

export default isValidEmail;
