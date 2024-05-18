import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://task-manager-eight-xi.vercel.app/login",
        formData,
        {
          "Content-Type": "application/json",
        }
      );
      if (res.data.success) {
        handleLogin();
        localStorage.setItem("UserToken", JSON.stringify(res.data.token));
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group my-4">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group my-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <button type="submit" className="btn bg-success btn-primary my-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
