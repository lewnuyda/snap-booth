import React, { useState } from "react";
import CustomModal from "../../components/UI/CustomModal";
import AppButton from "../../components/UI/AppButton";
import FormWrapper from "../../components/UI/FormWrapper";
import TextInput from "../../components/UI/TextInput";
import TextArea from "../../components/UI/TextArea";
import TitleText from "../../components/UI/TitleText";

const Modals = () => {
  const [openModal, setOpenModal] = useState(null);

  const toggleModal = (size) => setOpenModal(openModal === size ? null : size);

  const handleSubmit = (e, size) => {
    e.preventDefault();
    console.log(`Form submitted from ${size.toUpperCase()} modal!`);
    toggleModal(size);
  };

  const modalSizes = ["xs", "sm", "md", "lg", "xl", "xxl"];

  return (
    <div className="mt-6 px-4">
      <TitleText
        variant="h1"
        className="mb-4  dark:border-gray-700 dark:text-gray-300"
      >
        Custom Modal Sizes with Forms
      </TitleText>

      {/* Buttons to open each modal */}
      <div className="flex flex-wrap gap-2 mb-6">
        {modalSizes.map((size) => (
          <AppButton key={size} color="blue" onClick={() => toggleModal(size)}>
            Open {size.toUpperCase()} Modal
          </AppButton>
        ))}
      </div>

      {/* Modals with forms */}
      {modalSizes.map((size) => (
        <CustomModal
          key={size}
          open={openModal === size}
          handler={() => toggleModal(size)}
          size={size}
          header={`Modal Size: ${size.toUpperCase()}`}
          footer={
            <div className="flex justify-end gap-2">
              <AppButton color="gray" onClick={() => toggleModal(size)}>
                Cancel
              </AppButton>
              <AppButton type="submit" form={`form-${size}`} color="blue">
                Submit
              </AppButton>
            </div>
          }
        >
          <FormWrapper
            id={`form-${size}`}
            onSubmit={(e) => handleSubmit(e, size)}
            className="space-y-4"
          >
            <TextInput label="Name" name="name" placeholder="Enter your name" />
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <TextArea label="Message" name="message" />
          </FormWrapper>
        </CustomModal>
      ))}

      {/* Code Snippet */}
      <div className="bg-gray-900 text-white p-4 rounded-lg mt-6">
        <h2 className="text-xl mb-3">Usage Example</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {`import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import AppButton from "../../components/UI/AppButton";
import FormWrapper from "../../components/UI/FormWrapper";
import TextInput from "../../components/UI/TextInput";
import TextArea from "../../components/UI/TextArea";

const ModalSizesWithFormExample = () => {
  const [openModal, setOpenModal] = useState(null);
  const modalSizes = ["xs", "sm", "md", "lg", "xl", "xxl"];

  const toggleModal = (size) =>
    setOpenModal(openModal === size ? null : size);

  const handleSubmit = (e, size) => {
    e.preventDefault();
    console.log(\`Form submitted from \${size.toUpperCase()} modal!\`);
    toggleModal(size);
  };

  return (
    <div>
      {modalSizes.map((size) => (
        <AppButton key={size} onClick={() => toggleModal(size)}>
          Open {size.toUpperCase()} Modal
        </AppButton>
      ))}

      {modalSizes.map((size) => (
        <CustomModal
          key={size}
          open={openModal === size}
          handler={() => toggleModal(size)}
          size={size}
          header={\`Modal Size: \${size.toUpperCase()}\`}
          footer={
            <div className="flex justify-end gap-2">
              <AppButton onClick={() => toggleModal(size)}>Cancel</AppButton>
              <AppButton type="submit" form={\`form-\${size}\`}>
                Submit
              </AppButton>
            </div>
          }
        >
          <FormWrapper
            id={\`form-\${size}\`}
            onSubmit={(e) => handleSubmit(e, size)}
            className="space-y-4"
          >
            <TextInput label="Name" name="name" placeholder="Enter your name" />
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <TextArea label="Message" name="message"  />
          </FormWrapper>
        </CustomModal>
      ))}
    </div>
  );
};

export default ModalSizesWithFormExample;`}
        </pre>
      </div>
    </div>
  );
};

export default Modals;
