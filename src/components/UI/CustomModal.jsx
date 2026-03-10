// src/components/CustomModal.jsx
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const CustomModal = ({
  open,
  handler,
  onClose,
  size = "md",
  title,
  header,
  children,
  footer,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  animate,
  ...rest
}) => {
  const closeHandler = onClose ?? handler;
  const headerContent = title ?? header;

  return (
    <Dialog
      open={open}
      handler={closeHandler}
      size={size}
      animate={animate}
      className={className}
      {...rest}
    >
      {headerContent && (
        <DialogHeader className={headerClassName}>{headerContent}</DialogHeader>
      )}
      <DialogBody className={bodyClassName}>{children}</DialogBody>
      {footer && (
        <DialogFooter className={footerClassName}>{footer}</DialogFooter>
      )}
    </Dialog>
  );
};

export default CustomModal;
