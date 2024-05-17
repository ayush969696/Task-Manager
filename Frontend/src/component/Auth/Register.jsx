import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Register = () => {
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formData
      );
      localStorage.setItem("UserToken", JSON.stringify(res.data.token));

      if (res.data.success) {
        handleLogin();
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/")
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group my-4">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
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
        <button type="submit" className="btn bg-success btn-primary my-4">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
