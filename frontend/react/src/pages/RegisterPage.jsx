import "./RegisterPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/members/register",
        {
          memberId,
          password,
          nickname,
          email,
        },
        {
          withCredentials: true,
        }
      );

      console.log("요청 데이터:", response.data);
    } catch (error) {
      console.log("회원가입 에러 발생");
    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        <Link to="/" className="register-logo">
          Coffee Writer
        </Link>

        <div className="register-header">
          <h1>Create account</h1>
          <p>커피 기록을 시작해보세요.</p>
        </div>

        <form
          onSubmit={handleRegister}
          className="register-form"
        >

          <div className="form-group">
            <label htmlFor="memberId">ID</label>

            <input
              id="memberId"
              className="input-box"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="아이디"
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
              placeholder="비밀번호"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nickname">Nickname</label>

            <input
              id="nickname"
              className="input-box"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              className="input-box"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
          </div>

          <button
            type="submit"
            className="register-button"
          >
            회원가입
          </button>

        </form>

        <div className="login-link">
          <span>이미 계정이 있나요?</span>
          <Link to="/login">로그인</Link>
        </div>

      </div>

    </div>
  );
}