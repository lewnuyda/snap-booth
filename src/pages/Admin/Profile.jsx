import React from "react";
import Breadcrumbs from "../../components/UI/Breadcrumbs";
import CustomTabs from "../../components/UI/CustomTabs";

const Profile = () => {
  const tabsData = [
    {
      label: "Overview",
      value: "overview",
      content: (
        <div className="text-gray-800 dark:text-gray-200">
          This is your overview content.
        </div>
      ),
    },
    {
      label: "Settings",
      value: "settings",
      content: (
        <div className="text-gray-800 dark:text-gray-200">
          Here you can update your settings.
        </div>
      ),
    },
    {
      label: "Activity",
      value: "activity",
      content: (
        <div className="text-gray-800 dark:text-gray-200">
          Recent activity will appear here.
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mt-6 px-4">
        <CustomTabs
          value="overview"
          data={tabsData}
          className="w-full"
          headerClassName="rounded-none border-b border-blue-gray-50 dark:border-gray-700 bg-transparent p-0"
          bodyClassName="p-4 text-gray-800 dark:text-gray-200"
          tabClassName="text-gray-700 dark:text-gray-200 font-semibold hover:text-blue-500 dark:hover:text-blue-300"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 dark:border-gray-200 shadow-none rounded-none",
          }}
        />
      </div>
    </>
  );
};

export default Profile;
