export const REGEX_PATTERN = {
  name: /[a-zA-Z]+$/,
  phoneNumber: /^\+91-[789]\d{9}$/,
  password:
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,20}$/,
};
