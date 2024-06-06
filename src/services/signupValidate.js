import isValidPassword from "../utils/passwordValidation";
import isValidEmail from "../utils/emailValidation";

const signUpValidate = async (formData, setError) => {
  const {
    username, email, password, confirmPassword,
  } = formData;

  if (!username || !email || !password || !confirmPassword) {
    setError({
      message: "모든 필수 항목을 입력하세요.",
      visible: true,
    });

    return false;
  }

  if (password.length < 6) {
    setError({
      message: "비밀 번호는 반드시 6자 이상이어야 합니다.",
      visible: true,
    });

    return false;
  }

  if (username.length < 2) {
    setError({
      message: "2자 이상의 닉네임을 입력해야 합니다.",
      visible: true,
    });

    return false;
  }

  if (!isValidEmail(email)) {
    setError({
      message: "옳바르지 않은 이메일 형식입니다.",
      visible: true,
    });

    return false;
  }

  if (!isValidPassword(password)) {
    setError({
      message: "영어 대 소문자를 포함해야 합니다.",
      visible: true,
    });

    return false;
  }

  if (password !== confirmPassword) {
    setError({
      message: "비밀번호가 서로 일치하지 않습니다.",
      visible: true,
    });

    return false;
  }

  return true;
};

export default signUpValidate;
