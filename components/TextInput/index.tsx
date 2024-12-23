import React from 'react';

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, placeholder, type = "text", value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#666666]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border-b focus:outline-none focus:ring-0 focus:bg-none"
      />
    </div>
  );
};

export default TextInput;
