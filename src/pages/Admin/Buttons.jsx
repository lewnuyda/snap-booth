import React from "react";
import AppButton from "../../components/UI/AppButton";
import TitleText from "../../components/UI/TitleText";

const Buttons = () => {
  return (
    <div className="mt-6 px-4">
      {/* Page Title */}
      <TitleText
        variant="h1"
        className="mb-4  dark:border-gray-700 dark:text-gray-300"
      >
        Buttons
      </TitleText>

      {/* Button Preview Section */}
      <div className="flex gap-4 w-max mb-6">
        <AppButton color="blue">COLOR BLUE</AppButton>
        <AppButton color="red">COLOR RED</AppButton>
        <AppButton color="green">COLOR GREEN</AppButton>
        <AppButton color="amber">COLOR AMBER</AppButton>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <h2 className="text-xl mb-3">Usage Example</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {`import AppButton from "../../components/UI/AppButton";

const ButtonsExample = () => {
  return (
    <div className="flex w-max gap-4">
      <AppButton color="blue">COLOR BLUE</AppButton>
      <AppButton color="red">COLOR RED</AppButton>
      <AppButton color="green">COLOR GREEN</AppButton>
      <AppButton color="amber">COLOR AMBER</AppButton>
    </div>
  );
};

export default ButtonsExample;`}
        </pre>
      </div>
    </div>
  );
};

export default Buttons;
