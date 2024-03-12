import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import isPasswordValid from '../../utils/passwordValidation';
import CommonButton from '../../shared/Button';
import CommonTitle from '../../shared/Title';
import Input from '../../shared/Input/Index';
import ErrorMessage from '../../shared/ErrorMessage';
import googleLogoImage from '../../assets/google_logo.png';
import fetchSignUp from '../../services/signup';
import fetchLogin from '../../services/logIn';

function Login() {
  const [selectedOption, setSelectedOption] = useState('signIn');
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordValid, setPasswordValid] = useState(false);
  const [signUpError, setSignUpError] = useState({ message: '', visible: false });

  const navigate = useNavigate();
  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;

    if (field === 'loginId') {
      setLoginId(value);
    }

    if (field === 'loginPassword') {
      setLoginPassword(value);
    }

    if (field === 'username') {
      setUsername(value);
    }

    if (field === 'email') {
      setEmail(value);
    }

    if (field === 'password') {
      setPassword(value);
      setConfirmPassword('');

      const isValidPassword = isPasswordValid(value);

      setPasswordValid(isValidPassword);
    }

    if (field === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleClickLoginButton = async () => {
    const response = await fetchLogin(loginId, loginPassword);

    if (!response.result) {
      alert(response.message);

      throw new Error(response.message);
    }

    localStorage.setItem('PDSToken', response.token);

    alert(response.message);

    navigate('/users');
  };

  const isSignUpFormValid = () => {
    if (!username || !email || !password || !confirmPassword) {
      setSignUpError({
        message: '모든 필수 항목을 입력하세요.',
        visible: true,
      });
      return false;
    }

    if (password.length < 6) {
      setSignUpError({
        message: '비밀 번호는 반드시 6자 이상이어야 합니다.',
        visible: true,
      });
      return false;
    }

    if (!passwordValid) {
      setSignUpError({
        message: '대 소문자를 포함해야 합니다.',
        visible: true,
      });
      return false;
    }

    if (password !== confirmPassword) {
      setSignUpError({
        message: '비밀번호가 서로 일치하지 않습니다.',
        visible: true,
      });

      return false;
    }

    return true;
  };

  const handleClickSignUpButton = async () => {
    if (isSignUpFormValid()) {
      setSignUpError({ message: '', visible: false });

      const response = await fetchSignUp(username, email, password);

      if (response.result) {
        alert(response.message);

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        navigate('/users');
      }

      alert(response.message);
    }
  };

  const renderGuestForm = () => (
    <Input
      label="Email"
      type="email"
      placeholder="Enter your email"
      description="We need your email to start edit diary"
    >
    </Input>
  );
  const renderSighUpForm = () => (
    <div>
      <Input
        label="Username"
        type="text"
        value={username}
        placeholder="Enter your username"
        onChange={(e) => handleInputChange(e, 'username')}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => handleInputChange(e, 'email')}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => handleInputChange(e, 'password')}
      />
      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        placeholder="Confirm your password"
        onChange={(e) => handleInputChange(e, 'confirmPassword')}
      />
      {signUpError.visible && (
        <ErrorMessage
          setMessage={setSignUpError}
          content={signUpError.message}
        />
      )}
    </div>
  );
  const renderUserForm = () => (
    <div>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        onChange={(e) => handleInputChange(e, 'loginId')}
      >
      </Input>
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        onChange={(e) => handleInputChange(e, 'loginPassword')}
      >
      </Input>
    </div>
  );

  return (
    <Container>
      <Wrapper className="content-left"></Wrapper>
      <Wrapper className="content-right">
        {selectedOption !== 'signUp' ? (
          <>
            <CommonTitle mainTitle="Hello" subTitle="Please choose how you want to proceed" />
            <ButtonLine>
              <StyledButton selected={selectedOption === 'guest'} onClick={() => handleButtonClick('guest')}>
                Guest Checkout
              </StyledButton>
              <StyledButton selected={selectedOption === 'signIn'} onClick={() => handleButtonClick('signIn')}>
                Sign In
              </StyledButton>
            </ButtonLine>
          </>
        ) : (
          <CommonTitle mainTitle="SignUp" subTitle="Create a new account to get started" />
        )}
        <LoginContentWrapper>
          {selectedOption === 'guest' && renderGuestForm()}
          {selectedOption === 'signIn' && renderUserForm()}
          {selectedOption === 'signUp' && renderSighUpForm()}
        </LoginContentWrapper>
        {selectedOption !== 'signUp' ? (
          <>
            <DescriptionWrapper>
              아직 아이디어가 없으세요?
              <ButtonText onClick={() => handleButtonClick('signUp')}>회원 가입 하기</ButtonText>
            </DescriptionWrapper>
            <CommonButton width="400px" height="48px" onClick={handleClickLoginButton}>
              Login
            </CommonButton>
          </>
        ) : (
          <>
            <DescriptionWrapper>
              이미 계정이 있으신가요?
              <ButtonText onClick={() => handleButtonClick('signIn')}>로그인 하기</ButtonText>
            </DescriptionWrapper>
            <CommonButton width="400px" height="48px" onClick={handleClickSignUpButton}>
              SignUp
            </CommonButton>
          </>
        )}
        <GoogleSignInContainer>
          Or sign in with
          <Link to="*">Google</Link>
          <GoogleLogo src={googleLogoImage} alt="Google Logo" />
        </GoogleSignInContainer>
      </Wrapper>
    </Container>
  );
}

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const LoginContentWrapper = styled.div`
  height: 40%;
`;

const ButtonText = styled.button`
  border: none;
  background-color: none;
  color: black;
`;
const ButtonLine = styled.div`
  background-color: #E9F1FF;
  padding: 10px 5px;
  width: 400px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  padding: 10px;
  flex:1;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.selected ? 'lightblue' : '#E9F1FF')};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .content-left {
    flex-grow: 5;

    background-color: blue;
  }

  .content-right {
    flex-grow: 5;

    background-color: #84cd84;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const GoogleSignInContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: space-between;
`;

const GoogleLogo = styled.img`
  width: 24px;
  height: 24px;
`;

export default Login;
