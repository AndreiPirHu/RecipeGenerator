import React from "react";
import { auth, createUserWithEmailAndPassword } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { syncCarts } from "../../components/syncCarts";

type RegisterAuthProps = {
  email: string;
  password: string;
};

export const RegisterAuth: React.FC<RegisterAuthProps> = ({
  email,
  password,
}) => {
  const navigate = useNavigate();

  const handleCreateAccount = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user.uid);
      syncCarts(user.uid);

      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="button secondary-btn"
        onClick={(e) => handleCreateAccount(e)}
      >
        Create Account
      </button>
    </>
  );
};
