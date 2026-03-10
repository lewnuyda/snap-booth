import React from "react";
import TitleText from "../../components/UI/TitleText";
import CustomTabs from "../../components/UI/CustomTabs";

const Tabs = () => {
  const tabData = [
    {
      label: "Tab One",
      value: "tab1",
      content: (
        <p className="text-gray-700 dark:text-gray-300">
          This is the content for Tab One.
        </p>
      ),
    },
    {
      label: "Tab Two",
      value: "tab2",
      content: (
        <p className="text-gray-700 dark:text-gray-300">
          This is the content for Tab Two.
        </p>
      ),
    },
    {
      label: "Tab Three",
      value: "tab3",
      content: (
        <p className="text-gray-700 dark:text-gray-300">
          This is the content for Tab Three.
        </p>
      ),
    },
  ];

  return (
    <div className="mt-6 px-4">
      {/* Page Title */}
      <TitleText variant="h1" className="mb-4 dark:text-gray-300">
        Tabs
      </TitleText>

      {/* Tabs Preview */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
        <CustomTabs
          data={tabData}
          headerClassName="dark:bg-gray-900 dark:text-gray-200  rounded-t-md"
          bodyClassName="mt-4"
          tabClassName="dark:text-black"
          indicatorProps={{ className: "bg-white" }}
        />
      </div>

      {/* Code Snippet */}
      <div className="bg-gray-900 text-white p-4 rounded-lg mt-6">
        <h2 className="text-xl mb-3">Usage Example</h2>

        <pre className="text-sm whitespace-pre-wrap">
          {`import CustomTabs from "../../components/UI/CustomTabs";

const ExampleTabs = () => {
   const tabData = [
    {
      label: "Tab One",
      value: "tab1",
      content: (
        <p className="text-gray-700">
          This is the content for Tab One.
        </p>
      ),
    },
    {
      label: "Tab Two",
      value: "tab2",
      content: (
        <p className="text-gray-700">
          This is the content for Tab Two.
        </p>
      ),
    },
    {
      label: "Tab Three",
      value: "tab3",
      content: (
        <p className="text-gray-700">
          This is the content for Tab Three.
        </p>
      ),
    },
  ];

  return (
    <CustomTabs
        data={tabData}
        headerClassName="rounded-t-md"
        bodyClassName="mt-4"
        tabClassName="dark:text-black"
        indicatorProps={{ className: "bg-white" }}
    />
  );
};

export default ExampleTabs;`}
        </pre>
      </div>
    </div>
  );
};

export default Tabs;
