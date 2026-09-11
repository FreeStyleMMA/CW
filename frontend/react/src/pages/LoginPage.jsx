
import "./LoginPage.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(memberId, password);

      console.log("로그인 성공");

      navigate("/");
    } catch (error) {
      console.log("로그인 에러 발생", error);
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
            <label htmlFor="memberId">memberId</label>

            <input
              id="memberId"
              className="input-box"
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="아이디를 입력하세요"
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

