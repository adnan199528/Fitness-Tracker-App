import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    try {
      await login(email, password);
      navigate("/"); // Redirect to home
    } catch (err) {
      toast.error("Invalid credentials");
      console.error(err);
    }
  };

  useEffect(() => {
    const originalBodyStyle = document.body.style.cssText;

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.minHeight = '100vh';

    const style = document.createElement("style");
    style.innerHTML = `
      .login-bg {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .login-form {
        background-color: #000;
        border-radius: 20px;
        padding: 40px;
        width: 100%;
        margin-top: -80px;
        max-width: 400px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
        color: #fff;
      }
      .login-heading {
        text-align: center;
        margin-bottom: 30px;
        font-family: "Cinzel", serif;
        font-size: 36px;
        font-weight: bold;
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-shadow: 0 0 8px rgba(255, 215, 0, 0.7);
      }
      .login-input {
        width: 100%;
        padding: 12px;
        margin-bottom: 15px;
        border-radius: 30px;
        border: 2px solid #FFD700;
        background-color: transparent;
        color: #fff;
        outline: none;
        font-size: 14px;
      }
      .login-input::placeholder {
        color: white !important;
        opacity: 1;
      }
      .login-btn {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: none;
        background: linear-gradient(135deg, #FFD700, #B8860B, #FFD700);
        color: #000;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        margin-top: 10px;
      }
      .login-btn:hover {
        box-shadow: 0 0 15px #FFD700;
      }
      .login-footer {
        text-align: center;
        margin-top: 15px;
        color: #fff;
      }
      .login-signup {
        font-weight: bold;
        background: linear-gradient(135deg, #FFD700, #B8860B, #FFD700);
        -webkit-background-clip: text;
        color: transparent;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cssText = originalBodyStyle;
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="login-bg">
      <form onSubmit={onSubmit} className="login-form">
        <h2 className="login-heading">Login</h2>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          className="login-input"
        />
        <button type="submit" className="login-btn">Login</button>
        <p className="login-footer">
          Don't have an account? <Link to="/signup" className="login-signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;