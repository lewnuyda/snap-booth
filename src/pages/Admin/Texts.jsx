import React from "react";
import TitleText from "../../components/UI/TitleText";

const Texts = () => {
  return (
    <div className="mt-6 px-4">
      {/* Page Title */}
      <TitleText
        variant="h1"
        className="mb-4  dark:border-gray-700 dark:text-gray-300"
      >
        Texts
      </TitleText>

      {/* Sample TitleText with different sizes */}
      <div className="space-y-4">
        <TitleText
          variant="small"
          color="blue-gray"
          className="mb-4  dark:border-gray-700 dark:text-gray-300"
        >
          This is small text
        </TitleText>

        <TitleText
          variant="paragraph"
          color="blue-gray"
          className="mb-4  dark:border-gray-700 dark:text-gray-300"
        >
          This is paragraph text
        </TitleText>

        <TitleText
          variant="h6"
          color="blue-gray"
          className="mb-4  dark:border-gray-700 dark:text-gray-300"
        >
          This is H6 text
        </TitleText>

        <TitleText
          variant="h5"
          color="blue-gray"
          className="mb-4  dark:border-gray-700 dark:text-gray-300"
        >
          This is H5 text
        </TitleText>

        <TitleText
          variant="h4"
          color="blue-gray"
          className="mb-4  dark:border-gray-700 dark:text-gray-300"
        >
          This is H4 text
        </TitleText>

        <TitleText
          variant="h3"
          color="blue-gray"
          className="mb-4  dark:border-gray-700 dark:text-gray-300"
        >
          This is H3 text
        </TitleText>

        <TitleText
          variant="h2"
          color="blue-gray"
          className="mb-4  dark:border-gray-700 dark:text-gray-300"
        >
          This is H2 text
        </TitleText>

        <TitleText
          variant="h1"
          color="blue-gray"
          className="mb-4  dark:border-gray-700 dark:text-gray-300"
        >
          This is H1 text
        </TitleText>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-gray-900 text-white p-4 rounded-lg mt-6">
        <h2 className="text-xl mb-3">Usage Example</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {`import TitleText from "../../components/UI/TitleText";

const TextsExample = () => {
  return (
    <div>
      <TitleText variant="small">This is small text</TitleText>
      <TitleText variant="paragraph">This is paragraph text</TitleText>
      <TitleText variant="h6">This is H6 text</TitleText>
      <TitleText variant="h5">This is H5 text</TitleText>
      <TitleText variant="h4">This is H4 text</TitleText>
      <TitleText variant="h3">This is H3 text</TitleText>
      <TitleText variant="h2">This is H2 text</TitleText>
      <TitleText variant="h1">This is H1 text</TitleText>
    </div>
  );
};

export default TextsExample;`}
        </pre>
      </div>
    </div>
  );
};

export default Texts;
