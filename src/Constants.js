export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const nameRegex = /^[a-zA-Z\s]+$/;
export const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
export const otpRegex = /^\d{6}$/;
