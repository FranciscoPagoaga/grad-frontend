import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: "button"|"submit"|"reset"| undefined,
}

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button
      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 active:bg-blue-700"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
