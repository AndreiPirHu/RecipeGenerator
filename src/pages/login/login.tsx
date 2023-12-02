import { useEffect, useState } from "react";
import "./login.css";
import { auth, signInWithEmailAndPassword } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { LoginAuth } from "./loginAuth";
export const Login = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      //save the recipes in localstorage to user in firestore
      //remove all items from localstorage
      console.log(`${user.email} logged in successfully`);
    } catch (error) {
      console.log(error);
    }
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
          type="text"
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
        <button className="button" onClick={() => handleLogIn()}>
          Log in
        </button>
        <LoginAuth />
        <button className="button">Register</button>
      </form>
    </div>
  );
};
