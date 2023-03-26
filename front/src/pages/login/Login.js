import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      alert(res);
      console.log(res);
	  const data = await res.json();
	  Cookies.set("token", data.token);
      if (data) {
        navigate("/");
      } else if (!res.data) {
        alert("User not registerd");
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }

    try {
      await axios
        .post("http://localhost:3001/auth/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data) {
            navigate("/home");
          } else if (!res.data) {
            alert("User not registerd");
          }
        });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  return (
    <div className="login">
      <h1 className="logrej"> Login </h1>
      <form className="logform" action="POST">
        <input
          className="log-input"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="log-input"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input className="button" type="submit" onClick={submit} />
      </form>
      <br />
      <Link to="/register">Register here</Link>
    </div>
  );
}

export default Login;
