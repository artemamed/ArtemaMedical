import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, ...props }) => {
  return (
    <div className="relative w-full">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
      <input
        {...props}
        className={`w-full pl-10 pr-6 py-2.5 text-sm border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500`}
      />
    </div>
  );
};

export default Input;
