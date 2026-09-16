import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          COFFEE<span>WRITER</span>
        </Link>

        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/recipe/espresso">커피 기록장</Link>
          <Link to="/beans">원두 기록장</Link>

          {isAuthenticated ? (
            <>

              <div className="header-user">
                <span className="user-name">
                  {user?.nickname || user?.username || "사용자"}님
                </span>

                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <div className="header-auth">
              <Link to="/login" className="header-user">
                로그인
              </Link>

              <Link to="/signup" className="signup-link">
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}