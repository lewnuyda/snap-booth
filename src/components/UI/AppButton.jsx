import React from "react";
import { Button } from "@material-tailwind/react";

const AppButton = ({
  children,
  type = "button",
  color = "black",
  className = "",
  onClick,
  fullWidth = true,
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  ref,
  ...rest
}) => {
  return (
    <Button
      ref={ref}
      type={type}
      color={color}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${fullWidth ? "w-full" : "w-auto"} ${className}`}
      {...rest}
    >
      {loading ? loadingText : children}
    </Button>
  );
};

export default AppButton;
