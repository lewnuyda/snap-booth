// src/pages/UI/CardPage.jsx
import React from "react";
import DashboardCard from "../../components/UI/DashboardCard";
import TitleText from "../../components/UI/TitleText";

const Cards = () => {
  return (
    <div className="mt-6 px-4">
      {/* Page Title */}
      <TitleText
        variant="h1"
        className="mb-4  dark:border-gray-700 dark:text-gray-300"
      >
        Cards
      </TitleText>

      {/* Card Preview Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* Example Card 1 */}
        <DashboardCard
          title="Total Sales"
          value="$10,000"
          icon="💵"
          footer="+5% since last month"
        />
        {/* Example Card 2 */}
        <DashboardCard
          title="New Customers"
          value="1,250"
          icon="👥"
          footer="+10% since last week"
          color="bg-gradient-to-tr from-green-400 to-green-600"
        />
        {/* Example Card 3 */}
        <DashboardCard
          title="Revenue"
          value="$50,000"
          icon="💰"
          footer="-2% from yesterday"
          color="bg-gradient-to-tr from-red-400 to-red-600"
        />
      </div>

      {/* Code Snippet Box */}
      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <h2 className="text-xl mb-3">Usage Example</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {`import DashboardCard from "../../components/UI/DashboardCard";

const CardsExample = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title="Total Sales"
        value="$10,000"
        icon="💵"
        footer="+5% since last month"
      />
      <DashboardCard
        title="New Customers"
        value="1,250"
        icon="👥"
        footer="+10% since last week"
        color="bg-gradient-to-tr from-green-400 to-green-600"
      />
      <DashboardCard
        title="Revenue"
        value="$50,000"
        icon="💰"
        footer="-2% from yesterday"
        color="bg-gradient-to-tr from-red-400 to-red-600"
      />
    </div>
  );
};

export default CardsExample;`}
        </pre>
      </div>
    </div>
  );
};

export default Cards;
