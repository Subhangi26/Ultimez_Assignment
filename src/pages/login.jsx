import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../service/authService";
import {
  validateLogin,
  extractUserFromLoginResponse,
  extractTokenFromLoginResponse,
} from "../utils/validation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login_id: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const res = await loginUser(formData);
      const payload = res.data;

      // Persist token for ProtectRoute and axios interceptor
      const token = extractTokenFromLoginResponse(payload);

      if (!token) {
        setApiError("Login succeeded but no token was returned.");
        return;
      }

      localStorage.setItem("token", token);

      const user = extractUserFromLoginResponse(payload);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      const raw = error.response?.data?.message;
      const message =
        (typeof raw === "string" && raw) ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="auth-box">
        <h2>Login</h2>
        <p className="subtitle">Sign in to continue</p>

        {apiError && <p className="error-banner">{apiError}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="login_id">Email / Login ID</label>
            <input
              id="login_id"
              type="email"
              name="login_id"
              value={formData.login_id}
              onChange={handleChange}
              placeholder="developer@gmail.com"
              autoComplete="username"
            />
            {errors.login_id && (
              <span className="field-error">{errors.login_id}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="footer-link">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
