import "./LoginPage.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("요청 데이터:", response.data);
    } catch (error) {
      console.log("로그인 에러 발생");
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        <Link to="/" className="login-logo">
          Coffee Writer
        </Link>

        <div className="login-header">
          <h1>Welcome back</h1>
          <p>커피 기록을 계속 이어가세요.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              className="input-box"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              className="input-box"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>

        </form>

        <div className="register-link">
          <span>아직 계정이 없나요?</span>
          <Link to="/register">회원가입</Link>
        </div>

      </div>

    </div>
  );
}