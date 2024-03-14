import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CommonButton from '../../shared/Button';
import CommonTitle from '../../shared/Title';
import Input from '../../shared/Input/Index';
import ErrorMessage from '../../shared/ErrorMessage';

import useUserStore from '../../store/user';

import googleLogoImage from '../../assets/google_logo.png';
import fetchSignUp from '../../services/fetchSignUp';
import fetchLogin from '../../services/fetchLogin';
import signUpValidate from '../../services/signupValidate';
import loginValidate from '../../services/loginValidate';

function Login() {
  const [selectedOption, setSelectedOption] = useState('signIn');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState({ message: '', visible: false });

  const { setUser, setToken } = useUserStore();

  const navigate = useNavigate();

  const handleButtonClick = (option) => {
    setUsername('');
    setEmail('');
    setUsername('');
    setEmail('');
    setSelectedOption(option);
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;

    if (field === 'username') {
      setUsername(value);
    }

    if (field === 'email') {
      setEmail(value);
    }

    if (field === 'password') {
      setPassword(value);
      setConfirmPassword('');
    }

    if (field === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleClickLoginButton = async (e) => {
    e.preventDefault();

    if (selectedOption === 'signIn') {
      const isSuccessValid = loginValidate({
        email,
        password,
      }, setSignUpError);

      if (isSuccessValid) {
        const response = await fetchLogin(email, password);

        if (response.result) {
          alert(response.message);

          setUser({
            userId: response.data.userId,
            username: response.data.username,
          });

          setToken({
            token: response.data.token,
          });

          sessionStorage.setItem('authenticatedUser', JSON.stringify({
            userId: response.data.userId,
            username: response.data.username,
            token: response.data.token,
          }));

          navigate('/users');
        }

        alert(response.message);
      }
    }

    if (selectedOption === 'guest') {
      if (!email) {
        setSignUpError({
          message: '아이디를 입력해주세요',
          visible: true,
        });

        return false;
      }

      if (!username) {
        setSignUpError({
          message: '닉네임을 입력해주세요',
          visible: true,
        });

        return false;
      }

      setUser({ userId: email, username });

      sessionStorage.setItem('guestUser', JSON.stringify({ userId: email, username }));

      navigate('/users');
    }

    if (selectedOption === 'signUp') {
      const isSuccessValid = signUpValidate({
        username,
        email,
        password,
        confirmPassword,
      }, setSignUpError);

      if (isSuccessValid) {
        setSignUpError({ message: '', visible: false });

        const response = await fetchSignUp(username, email, password);

        if (response.result) {
          alert(response.message);

          navigate('/users');
        }

        alert(response.message);
      }
    }
  };

  const renderGuestForm = () => (
    <>
      <Input
        label="Email"
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => handleInputChange(e, 'email')}
      >
      </Input>
      <Input
        label="Nickname"
        type="text"
        value={username}
        placeholder="Enter your Nickname"
        onChange={(e) => handleInputChange(e, 'username')}
      >
      </Input>
    </>
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
        onChange={(e) => handleInputChange(e, 'email')}
      >
      </Input>
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        onChange={(e) => handleInputChange(e, 'password')}
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
            <CommonButton width="400px" height="48px" onClick={handleClickLoginButton}>
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
