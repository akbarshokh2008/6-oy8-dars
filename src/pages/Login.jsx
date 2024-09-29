import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const naviget = useNavigate();

  // Password
  function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regex.test(password)) {
      return true;
    } else {
      return false;
    }
  }

  function validate() {
    // USERNAME
    if (usernameRef.current.value.length < 3) {
      setErrorUser("username xato 3 ta sozdan koproq yozing");
      console.log(usernameRef);
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    } else {
      usernameRef.current.style.outlineColor = "black";
      setErrorUser("");
    }
    // PASSWORD
    if (!validatePassword(passwordRef.current.value)) {
      setErrorPassword("password xato");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
    } else {
      setErrorPassword("");
      passwordRef.current.style.outlineColor = "black";
    }
    return true;
  }

  function handleLogin(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          usernameRef.current.value = "";
          passwordRef.current.value = "";
          naviget("/");
        } else if (
          data.message === "User Not found." ||
          data.message === "Invalid Password!"
        ) {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-1/4 mx-auto mt-5">
      <form className="flex flex-col gap-4 p-3 bg-teal-400 ">
        <label htmlFor="username">Usernameni kiriting</label>
        {errorUser && <p className="text-red-700 mb-[-5px]">{errorUser}</p>}
        <input
          className="p-2 rounded "
          ref={usernameRef}
          type="text"
          id="username"
          placeholder="Enter username..."
          required
        />

        <label htmlFor="password">Passwordni kiriting</label>
        {errorPassword && (
          <p className="text-red-700 mb-[-5px]">{errorPassword}</p>
        )}
        <input
          className="p-2 rounded "
          ref={passwordRef}
          type="password"
          id="password"
          required
        />

        <button
          className="rounded bg-violet-700 text-white py-2"
          onClick={handleLogin}
        >
          Login
        </button>
        <a
          href="/register"
          className="rounded text-center bg-violet-700 text-white py-2"
        >
          Signup
        </a>
      </form>
    </div>
  );
}

export default Register;
