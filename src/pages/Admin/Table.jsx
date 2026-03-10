import React from "react";
import Datatable from "../../components/UI/Datatable";
import TitleText from "../../components/UI/TitleText";

const Table = () => {
  // Example data for the table
  const columns = ["Project", "Members", "Budget", "Completion"];
  const data = [
    {
      id: 1,
      project: "Material UI XD Version",
      members: "John Doe, Jane Smith",
      budget: "$14,000",
      completion: 60,
    },
    {
      id: 2,
      project: "Add Progress Track",
      members: "Alice, Bob",
      budget: "$3,000",
      completion: 10,
    },
    {
      id: 3,
      project: "Tailwind Design System",
      members: "Max, Lisa",
      budget: "$12,000",
      completion: 80,
    },
    {
      id: 4,
      project: "Refactor Settings Page",
      members: "Mia, Noah",
      budget: "$6,500",
      completion: 45,
    },
    {
      id: 5,
      project: "Build Notification Center",
      members: "Ethan, Ava",
      budget: "$9,200",
      completion: 70,
    },
    {
      id: 6,
      project: "Redesign Landing Page",
      members: "Lucas, Emma",
      budget: "$11,000",
      completion: 90,
    },
  ];

  // Render function for each row
  const renderRow = (row) => (
    <tr key={row.id}>
      <td className="p-4">{row.project}</td>
      <td className="p-4">{row.members}</td>
      <td className="p-4">{row.budget}</td>
      <td className="p-4">{row.completion}%</td>
    </tr>
  );

  return (
    <div className="mt-6 px-4">
      {/* Page Title */}
      <TitleText
        variant="h1"
        className="mb-4  dark:border-gray-700 dark:text-gray-300"
      >
        DataTable
      </TitleText>

      {/* DataTable Component */}
      <Datatable
        title="Projects Overview"
        columns={columns}
        data={data}
        renderRow={renderRow}
        getRowId={(row) => row.id}
        enableSearch
        searchKeys={["project", "members", "budget"]}
        searchPlaceholder="Search project, members, budget..."
        showPagination
        defaultPageSize={5}
      />

      {/* Code Snippet Box */}
      <div className="bg-gray-900 text-white p-4 rounded-lg mt-6">
        <h2 className="text-xl mb-3">Usage Example</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {`import Datatable from "../../components/UI/Datatable";

const DataTableExample = () => {
  const columns = ["Project", "Members", "Budget", "Completion"];
  const data = [
    { id: 1, project: "Material UI XD Version", members: "John Doe, Jane Smith", budget: "$14,000", completion: 60 },
    { id: 2, project: "Add Progress Track", members: "Alice, Bob", budget: "$3,000", completion: 10 },
    { id: 3, project: "Tailwind Design System", members: "Max, Lisa", budget: "$12,000", completion: 80 },
  ];

  const renderRow = (row) => (
    <tr key={row.id}>
      <td className="p-4">{row.project}</td>
      <td className="p-4">{row.members}</td>
      <td className="p-4">{row.budget}</td>
      <td className="p-4">{row.completion}%</td>
    </tr>
  );

  return (
    <Datatable
      title="Projects Overview"
      columns={columns}
      data={data}
      renderRow={renderRow}
      getRowId={(row) => row.id}
      enableSearch
      searchKeys={["project", "members", "budget"]}
      showPagination
      defaultPageSize={5}
    />
  );
};

export default DataTableExample;`}
        </pre>
      </div>

      {/* NOTE */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Note:</h2>
        <p className="text-sm text-gray-500">
          This Datatable now supports built-in client-side search and
          pagination. For advanced server-side sorting/filtering at scale, you
          can still connect this component to API-driven data and control
          pagination state from the parent.
          <br />
          If you need very advanced table behavior, you may consider specialized
          libraries like <code>@tanstack/react-table</code>.
        </p>
      </div>
    </div>
  );
};

export default Table;
