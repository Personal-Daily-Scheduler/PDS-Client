import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CommonButton from "../../shared/Button";
import CommonTitle from "../../shared/Title";
import Input from "../../shared/Input/Index";
import GoogleLogo from "../../assets/google_logo.png"


function Login() {
  const [selectedOption, setSelectedOption] = useState("signIn");
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (event, field) => {
    const value = event.target.value;

    if (field === 'username') {
      setUsername(value);
    } else if (field === 'fullName') {
      setFullName(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

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
          {selectedOption === 'guest' && (
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              description="We need your email to start edit diary"
            >
            </Input>
          )}
          {selectedOption === 'signIn' && (
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => handleInputChange(e, 'username')}
              >
              </Input>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => handleInputChange(e, 'username')}
              >
              </Input>
            </div>
          )}
          {selectedOption === 'signUp' && (
            <div>
              <Input
                label="Username"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => handleInputChange(e, 'username')}
              />
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                onChange={(e) => handleInputChange(e, 'fullName')}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => handleInputChange(e, 'password')}
              />
            </div>
          )}
        </LoginContentWrapper>
        {selectedOption !== 'signUp' ? (
          <>
            <ParagraphWrapper>
              아직 아이디어가 없으세요? <button onClick={() => handleButtonClick('signUp')}>회원 가입 하기</button>
            </ParagraphWrapper>
            <CommonButton width="400px" height="48px" onClick={() => console.log('로그인 버튼 클릭')}>
              login
            </CommonButton>
          </>
        ): (
          <>
            <ParagraphWrapper>
              이미 계정이 있으신가요? <button onClick={() => handleButtonClick('signIn')}>로그인 하기</button>
            </ParagraphWrapper>
            <submit>
              <CommonButton width="400px" height="48px" onClick={() => console.log()}>
                signUp
              </CommonButton>
            </submit>
          </>
        )}
        <GoogleSignInContainer>
          <GoogleSignInText>
            Or sign in with <Link to="*">Google</Link>
          </GoogleSignInText>
          <GoogleSignInImage src={GoogleLogo} alt="Google Logo" />
        </GoogleSignInContainer>
      </Wrapper>
    </Container>
  );
}

const ParagraphWrapper = styled.p`
  display: flex;
  align-items: center;
  margin-top: 20px;
`

const LoginContentWrapper = styled.div`
  height: 25%;
`;

const ButtonLine = styled.div`
  background-color: #E9F1FF;
  padding: 10px 5px;
  width: 400px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`

const StyledButton = styled.button`
  padding: 10px;
  flex:1;
  border: none;
  border-radius: 10px;
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
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const GoogleSignInContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const GoogleSignInText = styled.div`
  margin-right: 10px;
`;

const GoogleSignInImage = styled.img`
  width: 24px;
  height: 24px;
`;

export default Login;
