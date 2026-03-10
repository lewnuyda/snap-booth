import React from "react";

const SelectInput = ({
  label = "Select Option",
  options = [],
  id,
  name,
  value,
  onChange = () => {},
  error = false,
  errorMessage = "",
  className = "w-full",
  wrapperClassName,
  labelClassName = "block mb-1 font-medium",
  selectClassName = "",
  placeholder,
  showPlaceholderOption = true,
  ref,
  ...rest
}) => {
  const inputId = id || name;
  const containerClassName = wrapperClassName || className;
  const defaultPlaceholder = placeholder ?? `Select ${label}`;

  return (
    <div className={containerClassName}>
      <label htmlFor={inputId} className={labelClassName}>
        {label}
      </label>
      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
        className={`w-full border rounded p-2 ${
          error ? "border-red-500" : "border-gray-300"
        } ${selectClassName}`}
        aria-invalid={error}
        {...rest}
      >
        {showPlaceholderOption && (
          <option value="">{defaultPlaceholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default SelectInput;
