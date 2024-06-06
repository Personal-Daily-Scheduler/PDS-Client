import isValidEmail from "../utils/emailValidation";

const loginValidate = async (formData, setError) => {
  const { email, password } = formData;

  if (email.length === 0) {
    setError({
      message: "아이디를 입력해주세요",
      visible: true,
    });

    return false;
  }

  if (password.length === 0) {
    setError({
      message: "비밀번호를 입력해주세요",
      visible: true,
    });

    return false;
  }

  if (!isValidEmail(email)) {
    setError({
      message: "잘못된 이메일 형식입니다.",
      visible: true,
    });

    return false;
  }

  return true;
};

export default loginValidate;
