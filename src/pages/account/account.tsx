import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { signOut } from "firebase/auth";

export const Account = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

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
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};
