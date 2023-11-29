import "./login.css";
import { LoginAuth } from "./loginAuth";
export const Login = () => {
  return (
    <div className="Login">
      <div className="login-container">
        <h1 className="title">Login</h1>
        <input
          className="username-input input-field"
          type="text"
          placeholder="Username"
        />
        <input
          className="password-input input-field"
          type="password"
          placeholder="password"
        />
        <LoginAuth />
      </div>
    </div>
  );
};
