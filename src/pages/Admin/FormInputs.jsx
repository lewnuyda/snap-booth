import React, { useState } from "react";
import TextInput from "../../components/UI/TextInput";
import TextArea from "../../components/UI/TextArea";
import SelectInput from "../../components/UI/SelectInput";
import CheckboxLabel from "../../components/UI/CheckBoxLabel";
import FormWrapper from "../../components/UI/FormWrapper";
import AppButton from "../../components/UI/AppButton";
import TitleText from "../../components/UI/TitleText";

const FormInputs = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    message: "",
    fruit: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="mt-6 px-4">
      {/* Page Title */}
      <TitleText
        variant="h1"
        className="mb-4 dark:border-gray-700 dark:text-gray-300"
      >
        Form Inputs
      </TitleText>

      {/* Form Preview Section */}
      <FormWrapper onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />

        <TextInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <TextArea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <SelectInput
          label="Favorite Fruit"
          name="fruit"
          value={formData.fruit}
          onChange={handleChange}
          options={[
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "orange", label: "Orange" },
          ]}
        />

        <CheckboxLabel
          label="I agree to the terms"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
        />

        <AppButton type="submit" color="blue">
          Submit
        </AppButton>
      </FormWrapper>

      {/* Code Snippet Box */}
      <div className="bg-gray-900 text-white p-4 rounded-lg mt-6">
        <h2 className="text-xl mb-3">Usage Example</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {`import React, { useState } from "react";
import TextInput from "../../components/UI/TextInput";
import TextArea from "../../components/UI/TextArea";
import SelectInput from "../../components/UI/SelectInput";
import CheckboxLabel from "../../components/UI/CheckBoxLabel";
import FormWrapper from "../../components/UI/FormWrapper";
import AppButton from "../../components/UI/AppButton";

const FormInputsExample = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    message: "",
    fruit: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <TextInput
        label="Username"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
      />

      <TextInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <TextArea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />

      <SelectInput
        label="Favorite Fruit"
        name="fruit"
        value={formData.fruit}
        onChange={handleChange}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "orange", label: "Orange" },
        ]}
      />

      <CheckboxLabel
        label="I agree to the terms"
        name="agree"
        checked={formData.agree}
        onChange={handleChange}
      />

      <AppButton type="submit" color="blue">Submit</AppButton>
    </FormWrapper>
  );
};

export default FormInputsExample;`}
        </pre>
      </div>
    </div>
  );
};

export default FormInputs;
