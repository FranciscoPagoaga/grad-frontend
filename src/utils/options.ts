// All the options to work with
// react-hook-form's validation options
// with the input component structure the project has

export const optionGeneric = {
  required: "This field is required",
  maxLength: 20,
};

export const optionEmail = {
  required: "This field is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "It must be in a valid email address",
  },
  maxLength: {
    value: 320,
    message: "The Email is too long"
  }
};

export const optionName = {
    
    required: "This field is required",
    pattern: {
        value: /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/,
        message: "It must only contain letters, hyphen or spaces"
    },
    minLength: {
        value: 3,
        message: "This field must have at least 3 characters"
    },
    maxLength: {
        value: 32,
        message: "This field cannot be longer that 16 characters"
    }
}

export const optionUserName = {
    required: "This field is required",
    pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: "It must only contain either letters, numbers or underscores"
    },
    minLength: {
        value: 3,
        message: "This field must have at least 3 characters"
    },
    maxLength: {
        value: 16,
        message: "This field cannot be longer that 16 characters"
    }
}

export const optionPassword = {
    required: "This field is required",
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
        message: "It must contain at least one lowercase letter, one uppercase letter and one number"
    },
    minLength: {
        value: 8,
        message: "This field must have at least 8 characters"
    },
}
