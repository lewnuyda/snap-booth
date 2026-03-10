// src/components/CheckboxLabel.jsx
import React from "react";
import { Checkbox } from "@material-tailwind/react";

const CheckboxLabel = ({
  label = "Default Label",
  name,
  id,
  wrapperClassName = "",
  labelClassName = "",
  helperText = "",
  error = false,
  errorMessage = "",
  color,
  ref,
  ...props
}) => {
  const checkboxId = id || name;

  return (
    <div className={wrapperClassName} ref={ref}>
      <Checkbox
        id={checkboxId}
        name={name}
        label={label}
        labelProps={labelClassName ? { className: labelClassName } : undefined}
        color={error ? "red" : color}
        {...props}
      />

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}

      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default CheckboxLabel;
