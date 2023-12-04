import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, auth, collection, db } from "../../firebase";
import React from "react";
import { syncCarts } from "../../components/syncCarts";

type LoginAuthProps = {
  email: string;
  password: string;
};

export const LoginAuth: React.FC<LoginAuthProps> = ({ email, password }) => {
  const handleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email == "" || password == "") {
      return;
    }
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      console.log(`${user.email} logged in successfully`);
      //save the recipes in localstorage to user in firestore
      syncCarts(user.uid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="button primary-btn" onClick={(e) => handleLogIn(e)}>
      Login
    </button>
  );
};
