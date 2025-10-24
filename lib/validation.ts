export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  mobile: (mobile: string): boolean => {
    const mobileRegex = /^[0-9]{10}$/
    return mobileRegex.test(mobile)
  },

  password: (password: string): boolean => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
  },

  username: (username: string): boolean => {
    return username.length >= 3 && username.length <= 50
  },

  number: (value: string): boolean => {
    return !isNaN(Number(value)) && Number(value) > 0
  },

  required: (value: string): boolean => {
    return value.trim().length > 0
  },
}

export const errorMessages = {
  email: "Please enter a valid email address",
  mobile: "Mobile number must be 10 digits",
  password: "Password must be at least 8 characters with uppercase, lowercase, and number",
  username: "Username must be between 3 and 50 characters",
  number: "Please enter a valid number",
  required: "This field is required",
  passwordMismatch: "Passwords do not match",
}
