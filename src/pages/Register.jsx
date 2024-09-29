import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const RePasswordRef = useRef();
  const [errorUser, setErrorUser] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");

  const naviget = useNavigate();
  //   Email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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
    // EMAIL
    if (!validateEmail(emailRef.current.value)) {
      setErrorEmail("email xato");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
    } else {
      setErrorEmail("");
      emailRef.current.style.outlineColor = "black";
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
    // REPASSWORD
    if (RePasswordRef.current.value != passwordRef.current.value) {
      setErrorRePassword("qayta kiritilgan password xato");
      RePasswordRef.current.focus();
      RePasswordRef.current.style.outlineColor = "red";
    } else {
      setErrorRePassword("");
      RePasswordRef.current.style.outlineColor = "black";
    }

    return true;
  }

  function handleRegister(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User registered successfully!") {
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          RePasswordRef.current.value = "";
          naviget("/login");
        } else if (
          data.message === "Failed! Username is already in use!" ||
          data.message === "Failed! Email is already in use!"
        ) {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-1/4 mx-auto mt-5">
      <form className="flex flex-col gap-4 p-3 bg-teal-400 ">
        {errorUser && <p className="text-red-700 mb-[-5px]">{errorUser}</p>}
        <input
          className="p-2 rounded "
          ref={usernameRef}
          type="text"
          placeholder="Enter username..."
          required
        />
        {errorEmail && <p className="text-red-700 mb-[-5px]">{errorEmail}</p>}
        <input
          className="p-2 rounded "
          ref={emailRef}
          type="email"
          placeholder="Enter email..."
          required
        />
        {errorPassword && (
          <p className="text-red-700 mb-[-5px]">{errorPassword}</p>
        )}
        <input
          className="p-2 rounded "
          ref={passwordRef}
          type="password"
          required
        />
        {errorRePassword && (
          <p className="text-red-700 mb-[-5px]">{errorRePassword}</p>
        )}
        <input
          className="p-2 rounded "
          ref={RePasswordRef}
          type="password"
          required
        />

        <button
          className="rounded bg-violet-700 text-white py-2"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
