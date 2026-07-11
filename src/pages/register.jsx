import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../service/authService";
import { validateRegister } from "../utils/validation";

const initialForm = {
  full_name: "",
  username: "",
  referral_id: "",
  email_id: "",
  country_row_id: "",
  mobile_number: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      await registerUser(formData);
      // After successful registration, send user to login
      navigate("/", { state: { registered: true } });
    } catch (error) {
      const raw = error.response?.data?.message;
      const message =
        (typeof raw === "string" && raw) ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="auth-box auth-box--wide">
        <h2>Register</h2>
        <p className="subtitle">Create a new account</p>

        {apiError && <p className="error-banner">{apiError}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="full_name">Full Name</label>
            <input
              id="full_name"
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John"
            />
            {errors.full_name && (
              <span className="field-error">{errors.full_name}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="jhon"
            />
            {errors.username && (
              <span className="field-error">{errors.username}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="referral_id">Referral ID</label>
            <input
              id="referral_id"
              type="text"
              name="referral_id"
              value={formData.referral_id}
              onChange={handleChange}
              placeholder="developer"
            />
            {errors.referral_id && (
              <span className="field-error">{errors.referral_id}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="email_id">Email ID</label>
            <input
              id="email_id"
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              placeholder="jhon@tgmail.com"
            />
            {errors.email_id && (
              <span className="field-error">{errors.email_id}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="country_row_id">Country Row ID</label>
            <input
              id="country_row_id"
              type="text"
              name="country_row_id"
              value={formData.country_row_id}
              onChange={handleChange}
              placeholder="101"
            />
            {errors.country_row_id && (
              <span className="field-error">{errors.country_row_id}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              id="mobile_number"
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="8798568912"
            />
            {errors.mobile_number && (
              <span className="field-error">{errors.mobile_number}</span>
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
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="footer-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
