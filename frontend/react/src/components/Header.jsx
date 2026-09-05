import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">

        <Link to="/" className="logo">
          Coffee Writer
        </Link>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/recipe">recipe</Link>
          <Link to="/beans">Beans</Link>
          <Link to="/map">Map</Link>
        </nav>

        <div className="auth-nav">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="signup-button">
            Sign up
          </Link>
        </div>

      </div>
    </header>
  );
}