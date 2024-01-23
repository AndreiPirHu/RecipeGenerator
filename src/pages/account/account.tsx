import { useEffect } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { signOut } from "firebase/auth";
import "./account.css";

export const Account = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userEmail: string = auth.currentUser?.email ?? "user not found";

  const handleLogOut = () => {
    signOut(auth);
  };

  const handleRedirect = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  useEffect(() => {
    handleRedirect();
  }, [isLoggedIn]);

  return (
    <div className="Account">
      <h1>Account</h1>
      <div className="container">
        <input value={userEmail} type="text" disabled />
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
};
