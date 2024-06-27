// % EMAIL VALIDATION
const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

// ! PASSWORD VALIDATION
const isValidPassword = (password) => {
  // Regular expressions for password validation
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  return (
    password.length >= 8 &&
    symbolRegex.test(password) &&
    numberRegex.test(password) &&
    upperCaseRegex.test(password) &&
    lowerCaseRegex.test(password)
  );
};

// # LOGIN VALIDATION RULES
const loginFormValidation = (formData, setErrors) => {
  let newErrors = {};

  if (!formData?.email) {
    newErrors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (!isValidPassword(formData.password)) {
    newErrors.password =
      "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

// # SIGN UP VALIDATION RULES
const signUpFormValidation = (formData, setErrors) => {
  let newErrors = {};

  if (!formData?.userName) {
    newErrors.userName = "Name is required";
  }

  if (!formData?.email) {
    newErrors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData?.partner_id) {
    newErrors.partner_id = "Partner Id is required";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (!isValidPassword(formData.password)) {
    newErrors.password =
      "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required";
  } else if (formData.confirmPassword !== formData.password) {
    newErrors.confirmPassword = "Passwords must match";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// # OTP VALIDATION RULES
const otpFormValidation = (formData, setErrors) => {
  let newErrors = {};

  if (!formData?.otp) {
    newErrors.otp = "OTP is required";
  } else if (formData?.otp.length !== 6) {
    newErrors.otp = "Invalid OTP";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (!isValidPassword(formData.password)) {
    newErrors.password =
      "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required";
  } else if (formData.confirmPassword !== formData.password) {
    newErrors.confirmPassword = "Passwords must match";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export {
  isValidEmail,
  isValidPassword,
  loginFormValidation,
  signUpFormValidation,
  otpFormValidation,
};
