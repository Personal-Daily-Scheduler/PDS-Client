const loginValidate = async (formData, setError) => {
  const { email, password } = formData;

  if (!email) {
    setError({
      message: '아이디를 입력해주세요',
      visible: true,
    });

    return false;
  }

  if (!password) {
    setError({
      message: '비밀번호를 입력해주세요',
      visible: true,
    });

    return false;
  }

  return true;
};

export default loginValidate;
