// src/components/UI/TextInput.jsx
import React from "react";
import { Input } from "@material-tailwind/react";

const TextInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error = false,
  errorMessage = "",
  wrapperClassName = "mb-4",
  autoComplete = "off",
  ref,
  ...rest
}) => {
  return (
    <div className={wrapperClassName}>
      <Input
        type={type}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        crossOrigin=""
        autoComplete={autoComplete}
        inputRef={ref}
        {...rest}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextInput;
