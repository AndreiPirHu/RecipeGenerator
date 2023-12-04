import { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { LoginAuth } from "./loginAuth";
export const Login = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const navigate = useNavigate();

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  const handleRedirect = () => {
    if (isLoggedIn) {
      navigate("/account");
    }
  };

  useEffect(() => {
    handleRedirect();
  }, [isLoggedIn]);

  return (
    <div className="Login">
      <form className="login-container">
        <h1 className="title">Sign in</h1>
        <input
          className="email-input input-field"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />
        <input
          className="password-input input-field"
          type="password"
          placeholder="Password"
          onChange={(e) => setPasswordInput(e.target.value)}
          required
        />

        <LoginAuth email={emailInput} password={passwordInput} />
        <button
          className="button secondary-btn"
          onClick={handleNavigateToRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};
