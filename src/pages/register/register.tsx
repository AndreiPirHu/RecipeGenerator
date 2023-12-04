import { useState } from "react";
import "./register.css";
import { RegisterAuth } from "./registerAuth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="Register">
      <form className="login-container">
        <h1 className="title">Register</h1>
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
          pattern=".{6,}"
          title="The password needs to be atleast 6 characters long"
        />

        <RegisterAuth email={emailInput} password={passwordInput} />
        <p className="link-text">
          Already have an account?{" "}
          <a className="link" onClick={handleNavigateToLogin}>
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};
