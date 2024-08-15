import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import TutorialSwiper from "../Tutorial";
import CommonButton from "../../shared/Button";
import CommonTitle from "../../shared/Title";
import Input from "../../shared/Input/Index";
import ErrorMessage from "../../shared/ErrorMessage";

import googleLogoImage from "../../assets/google_logo.png";
import fetchSignUp from "../../services/user/fetchSignUp";
import fetchLogin from "../../services/user/fetchLogin";
import signUpValidate from "../../services/signupValidate";
import loginValidate from "../../services/loginValidate";

import useUserStore from "../../store/user";
import useMobileStore from "../../store/useMobileStore";

function Login() {
  const [selectedOption, setSelectedOption] = useState("signIn");
  const [touchStartX, setTouchStartX] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState({ message: "", visible: false });
  const [showContentRight, setShowContentRight] = useState(false);
  const navigate = useNavigate();

  const { setUser, setToken } = useUserStore();
  const { isMobile } = useMobileStore();

  const handleStartButtonClick = () => {
    setShowContentRight(true);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiffX = touchEndX - touchStartX;

    if (touchDiffX > 50) {
      setShowContentRight(false);
    } else if (touchDiffX < -50) {
      setShowContentRight(true);
    }
  };

  const handleButtonClick = (option) => {
    setUsername("");
    setEmail("");
    setUsername("");
    setEmail("");
    setSelectedOption(option);
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;

    if (field === "username") {
      setUsername(value);
    }

    if (field === "email") {
      setEmail(value);
    }

    if (field === "password") {
      setPassword(value);
      setConfirmPassword("");
    }

    if (field === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleClickLoginButton = async (e) => {
    e.preventDefault();

    if (selectedOption === "signIn") {
      const isSuccessValid = await loginValidate({
        email,
        password,
      }, setSignUpError);

      if (isSuccessValid) {
        const response = await fetchLogin(email, password);

        if (response.result) {
          setUser({
            userId: response.data.userId,
            username: response.data.username,
          });

          setToken({
            token: response.data.token,
          });

          sessionStorage.setItem("authenticatedUser", JSON.stringify({
            userId: response.data.userId,
            username: response.data.username,
            token: response.data.token,
          }));

          alert(response.message);

          navigate("/users");
        }

        setSignUpError({
          message: response.message,
          visible: true,
        });
      }
    }

    if (selectedOption === "guest") {
      if (!username) {
        setSignUpError({
          message: "닉네임을 입력해주세요",
          visible: true,
        });

        return false;
      }

      if (username.length < 3) {
        setSignUpError({
          message: "닉네임은 최소 3자 이상 입력해야 합니다.",
          visible: true,
        });

        return false;
      }

      setUser({ userId: email, username });

      sessionStorage.setItem("guestUser", JSON.stringify({ userId: email, username }));

      navigate("/users");
    }

    if (selectedOption === "signUp") {
      const isSuccessValid = signUpValidate({
        username,
        email,
        password,
        confirmPassword,
      }, setSignUpError);

      if (isSuccessValid) {
        setSignUpError({ message: "", visible: false });

        const response = await fetchSignUp(username, email, password);

        if (response.result) {
          alert(response.message);

          navigate("/users");
        }

        alert(response.message);
      }
    }
  };

  const renderGuestForm = (size) => (
    <GuestLogin>
      <Input
        label="이름"
        type="text"
        value={username}
        placeholder="이름을 입력해주세요"
        onChange={(e) => handleInputChange(e, "username")}
        onEnterDown={handleClickLoginButton}
        size={size ? { width: size.width, height: size.height } : 0}
      >
      </Input>
      {signUpError.visible && (
        <ErrorMessage
          setMessage={setSignUpError}
          content={signUpError.message}
        />
      )}
    </GuestLogin>
  );

  const renderSighUpForm = (size) => (
    <SignUp>
      <Input
        label="이름"
        type="text"
        value={username}
        placeholder="이름을 입력해 주세요"
        onChange={(e) => handleInputChange(e, "username")}
        size={size ? { width: size.width, height: size.height } : 0}
      />
      <Input
        label="이메일"
        type="email"
        value={email}
        placeholder="이메일을 입력해 주세요"
        onChange={(e) => handleInputChange(e, "email")}
        size={size ? { width: size.width, height: size.height } : 0}
      />
      <Input
        label="비밀번호"
        type="password"
        value={password}
        placeholder="비밀번호를 입력해 주세요"
        onChange={(e) => handleInputChange(e, "password")}
        size={size ? { width: size.width, height: size.height } : 0}
      />
      <Input
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        placeholder="비밀번호를 한번 더 입력해 주세요"
        onChange={(e) => handleInputChange(e, "confirmPassword")}
        onEnterDown={handleClickLoginButton}
        size={size ? { width: size.width, height: size.height } : 0}
      />
      {signUpError.visible && (
        <ErrorMessage
          setMessage={setSignUpError}
          content={signUpError.message}
        />
      )}
    </SignUp>
  );

  const renderUserForm = (size) => (
    <MemberLogin>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        onChange={(e) => handleInputChange(e, "email")}
        size={size ? { width: size.width, height: size.height } : 0}
      >
      </Input>
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        onChange={(e) => handleInputChange(e, "password")}
        onEnterDown={handleClickLoginButton}
        size={size ? { width: size.width, height: size.height } : 0}
      >
      </Input>
      {signUpError.visible && (
        <ErrorMessage
          setMessage={setSignUpError}
          content={signUpError.message}
        />
      )}
    </MemberLogin>
  );

  return (
    <Container>
      {!isMobile ? (
        <>
          <Wrapper className="content-left">
            <TutorialSwiper />
          </Wrapper>
          <Wrapper className="content-right">
            {selectedOption !== "signUp" ? (
              <>
                <CommonTitle mainTitle="안녕하세요" subTitle="원하시는 로그인 방식을 선택해주세요." />
                <ButtonLine>
                  <StyledButton selected={selectedOption === "guest"} onClick={() => handleButtonClick("guest")}>
                    게스트 로그인
                  </StyledButton>
                  <StyledButton selected={selectedOption === "signIn"} onClick={() => handleButtonClick("signIn")}>
                    일반 회원 로그인
                  </StyledButton>
                </ButtonLine>
              </>
            ) : (
              <CommonTitle mainTitle="회원가입" subTitle="PDS 다이어리에 오신것을 환영합니다." />
            )}
            <LoginContentWrapper>
              {selectedOption === "guest" && renderGuestForm()}
              {selectedOption === "signIn" && renderUserForm()}
              {selectedOption === "signUp" && renderSighUpForm()}
            </LoginContentWrapper>
            {selectedOption !== "signUp" ? (
              <>
                <DescriptionWrapper>
                  <TextWrapper>아직 아이디가 없으세요?</TextWrapper>
                  <ButtonText onClick={() => handleButtonClick("signUp")}>회원 가입 하기</ButtonText>
                </DescriptionWrapper>
                <CommonButton width="400px" height="48px" onClick={handleClickLoginButton}>
                  로그인
                </CommonButton>
              </>
            ) : (
              <>
                <DescriptionWrapper>
                  <TextWrapper>이미 계정이 있으신가요?</TextWrapper>
                  <ButtonText onClick={() => handleButtonClick("signIn")}>로그인 하기</ButtonText>
                </DescriptionWrapper>
                <CommonButton width="400px" height="48px" onClick={handleClickLoginButton}>
                  가입하기
                </CommonButton>
              </>
            )}
            <GoogleSignInContainer>
              구글 계정으로 로그인하기
              <Link to="*">Google</Link>
              <GoogleLogo src={googleLogoImage} alt="Google Logo" />
            </GoogleSignInContainer>
          </Wrapper>
        </>
      ) : (
        !showContentRight ? (
          <TutorialSwiper onClickStartButton={handleStartButtonClick} />
        ) : (
          <Wrapper
            className="content-right"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {selectedOption !== "signUp" ? (
              <>
                <CommonTitle mainTitle="안녕하세요" subTitle="원하시는 로그인 방식을 선택해주세요." />
                <ButtonLine isMobileScreen={isMobile}>
                  <StyledButton selected={selectedOption === "guest"} onClick={() => handleButtonClick("guest")}>
                    게스트 로그인
                  </StyledButton>
                  <StyledButton selected={selectedOption === "signIn"} onClick={() => handleButtonClick("signIn")}>
                    일반 회원 로그인
                  </StyledButton>
                </ButtonLine>
              </>
            ) : (
              <CommonTitle mainTitle="회원가입" subTitle="PDS 다이어리에 오신것을 환영합니다." />
            )}
            <LoginContentWrapper>
              {selectedOption === "guest" && renderGuestForm({ width: "350px", height: "50px" })}
              {selectedOption === "signIn" && renderUserForm({ width: "350px", height: "50px" })}
              {selectedOption === "signUp" && renderSighUpForm({ width: "350px", height: "50px" })}
            </LoginContentWrapper>
            {selectedOption !== "signUp" ? (
              <>
                <DescriptionWrapper>
                  <TextWrapper>아직 아이디가 없으세요?</TextWrapper>
                  <ButtonText onClick={() => handleButtonClick("signUp")}>회원 가입 하기</ButtonText>
                </DescriptionWrapper>
                <CommonButton width="350px" height="50px" onClick={handleClickLoginButton}>
                  로그인
                </CommonButton>
              </>
            ) : (
              <>
                <DescriptionWrapper>
                  <TextWrapper>이미 계정이 있으신가요?</TextWrapper>
                  <ButtonText onClick={() => handleButtonClick("signIn")}>로그인 하기</ButtonText>
                </DescriptionWrapper>
                <CommonButton width="350px" height="50px" onClick={handleClickLoginButton}>
                  회원가입
                </CommonButton>
              </>
            )}
            <GoogleSignInContainer>
              구글 계정으로 로그인하기
              <Link to="*">Google</Link>
              <GoogleLogo src={googleLogoImage} alt="Google Logo" />
            </GoogleSignInContainer>
          </Wrapper>
        )
      )}
    </Container>
  );
}

const SignUp = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const MemberLogin = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const GuestLogin = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-right: 10px;
  font-size: 14px;
  color: #707070;
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LoginContentWrapper = styled.div`
  height: auto;
  margin-bottom: 20px;
`;

const ButtonText = styled.button`
  border: none;
  background-color: none;
  color: black;
`;

const ButtonLine = styled.div`
  background-color: #f0f4f8;
  padding: 10px;
  width: ${(props) => (props.isMobileScreen ? "350px" : "400px")};
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.selected ? "#3f51b5" : "#f0f4f8")};
  color: ${(props) => (props.selected ? "#ffffff" : "#000000")};
  font-weight: bold;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .content-left {
    flex: 1;
    background-color: #f0f4f8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-right {
    flex: 1;
    background-color: #ffffff;
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
  justify-content: center;
  margin-top: 20px;

  a {
    margin-left: 10px;
    color: #3f51b5;
    text-decoration: none;
  }
`;

const GoogleLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 10px;
`;

export default Login;
