import React from "react";
import { Textarea } from "@material-tailwind/react";

const TextArea = ({ name, label, error, className = "", ref, ...rest }) => {
  return (
    <div className="w-full">
      <Textarea
        label={label}
        name={name}
        ref={ref}
        error={!!error}
        className={`!min-h-[10rem] ${className}`}
        {...rest}
      />
      {error?.message && (
        <p className="mt-1 text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default TextArea;
