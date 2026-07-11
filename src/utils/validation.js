/**
 * Shared validation helpers for login and register forms.
 * Returns an errors object; empty object means valid.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^\d{10}$/;

export const validateLogin = (formData) => {
  const errors = {};

  if (!formData.login_id?.trim()) {
    errors.login_id = "Login ID is required";
  } else if (!EMAIL_REGEX.test(formData.login_id.trim())) {
    errors.login_id = "Enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateRegister = (formData) => {
  const errors = {};

  if (!formData.full_name?.trim()) {
    errors.full_name = "Full name is required";
  }

  if (!formData.username?.trim()) {
    errors.username = "Username is required";
  }

  if (!formData.referral_id?.trim()) {
    errors.referral_id = "Referral ID is required";
  }

  if (!formData.email_id?.trim()) {
    errors.email_id = "Email is required";
  } else if (!EMAIL_REGEX.test(formData.email_id.trim())) {
    errors.email_id = "Enter a valid email address";
  }

  if (!formData.country_row_id?.trim()) {
    errors.country_row_id = "Country ID is required";
  }

  if (!formData.mobile_number?.trim()) {
    errors.mobile_number = "Mobile number is required";
  } else if (!MOBILE_REGEX.test(formData.mobile_number.trim())) {
    errors.mobile_number = "Enter a valid 10-digit mobile number";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

/**
 * Normalize login API response into the dashboard user shape.
 * Live API returns: { status, message: { token, full_name, ... } }
 */
export const extractUserFromLoginResponse = (data) => {
  const user = data?.message || data?.user || data?.data || data || {};

  return {
    full_name: user.full_name || user.fullname || "",
    username: user.username || "",
    country:
      user.country ||
      user.country_name ||
      user.country_row_id ||
      "",
    email_id: user.email_id || user.email || "",
    mobile_number: user.mobile_number || user.mobile || "",
    referral_id:
      user.referral_id ||
      user.referral_username ||
      String(user.referral_row_id ?? ""),
  };
};

/** Pull token from nested login response */
export const extractTokenFromLoginResponse = (data) => {
  return (
    data?.message?.token ||
    data?.token ||
    data?.data?.token ||
    data?.access_token ||
    ""
  );
};
