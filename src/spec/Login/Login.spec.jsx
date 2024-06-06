import {
  render, screen, cleanup, fireEvent,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {
  afterEach, it, expect, describe, beforeEach,
} from "vitest";

import Login from "../../components/Login";

const formatTagerComponent = (targetComponent) => <BrowserRouter>{targetComponent}</BrowserRouter>;

describe("Login Component Test", () => {
  beforeEach(() => {
    render(formatTagerComponent(<Login />));
  });

  afterEach(() => {
    cleanup();
  });

  it("로그인 페이지에서 로그인 텍스트가 렌더링 되야 합니다.", () => {
    const loginDescription = screen.getByText(
      /Please choose how you want to proceed/,
    );

    expect(loginDescription.toBeInTheDocument);
  });

  it("로그인 페이지에서 게스트 로그인과 회원 로그인 버튼이 렌더되어야 합니다.", () => {
    const loginSelectButton = screen.getByText("Guest Checkout", "Sign In");

    expect(loginSelectButton.toBeInTheDocument);
  });

  it("로그인 페이지에서 게스트 로그인을 클릭했을때 게스트 정보 입력 Input이 렌더되어야 합니다.", () => {
    const guestCheckoutButton = screen.getByText("Guest Checkout");

    fireEvent.click(guestCheckoutButton);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const nickNameInput = screen.getByPlaceholderText("Enter your Nickname");

    expect(emailInput).toBeInTheDocument();
    expect(nickNameInput).toBeInTheDocument();
  });

  it("로그인 페이지에서 회원 로그인을 클릭했을때 회원 정보 입력 Input이 렌더되어야 합니다.", () => {
    const guestCheckoutButton = screen.getByText("Sign In");

    fireEvent.click(guestCheckoutButton);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const loginPasswordInput = screen.getByPlaceholderText("Enter your password");

    expect(emailInput).toBeInTheDocument();
    expect(loginPasswordInput).toBeInTheDocument();
  });

  it("로그인 페이지에서 회원가입 버튼을 클릭했을때 회원가입 정보 입력 Input이 렌더되어야 합니다.", () => {
    const signUpButton = screen.getByText("회원 가입 하기");

    fireEvent.click(signUpButton);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const singUpPasswordInput = screen.getByPlaceholderText("Enter your password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm your password");

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(singUpPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it("회원가입 창에서 로그인 버튼을 클릭했을때 다시 로그인 입력창으로 돌아와야 합니다.", () => {
    const signUpButton = screen.getByText("회원 가입 하기");

    fireEvent.click(signUpButton);

    const loginButton = screen.getByText("로그인 하기");

    fireEvent.click(loginButton);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
