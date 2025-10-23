import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const { name, username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password) {
      return toast.error("Please fill in all fields");
    }
    try {
      await signup(name, username, email, password);
      navigate("/");
    } catch (err) {
      toast.error(
        "Failed to create an account. Username or email may already be taken."
      );
      console.error(err);
    }
  };

  useEffect(() => {
    // Store original body style to restore on component unmount
    const originalBodyStyle = document.body.style.cssText;

    // Apply styles directly to the body for the background
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.minHeight = '100vh';

    const style = document.createElement("style");
    style.innerHTML = `
      .signup-bg {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .signup-form {
        background-color: #000;
        border-radius: 20px;
        padding: 40px;
        margin-top: -50px;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
        color: #fff;
      }
      .signup-heading {
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
      .signup-input {
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
      .signup-input::placeholder {
        color: white !important;
        opacity: 1;
      }
      .signup-btn {
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
      .signup-btn:hover {
        box-shadow: 0 0 15px #FFD700;
      }
      .signup-footer {
        text-align: center;
        margin-top: 15px;
        color: #fff;
      }
      .signup-login {
        font-weight: bold;
        background: linear-gradient(135deg, #FFD700, #B8860B, #FFD700);
        -webkit-background-clip: text;
        color: transparent;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to restore original body style
    return () => {
      document.body.style.cssText = originalBodyStyle;
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="signup-bg">
      <form onSubmit={onSubmit} className="signup-form">
        <h2 className="signup-heading"> Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
          required
          className="signup-input"
        />

        <button type="submit" className="signup-btn">
          Register
        </button>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login" className="signup-login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;