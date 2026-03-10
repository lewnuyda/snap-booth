import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import TitleText from "./TitleText";
import TextInput from "./TextInput";
import AppButton from "./AppButton";

const Datatable = ({
  title = "Table",
  columns = [],
  data = [],
  renderRow,
  getRowId,
  emptyMessage = "No data available.",
  enableSearch = false,
  searchKeys = [],
  searchValue,
  defaultSearchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  showPagination = false,
  page,
  defaultPage = 1,
  onPageChange,
  pageSize,
  defaultPageSize = 5,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20],
  totalItems,
  manualPagination = false,
  manualSearch = false,
}) => {
  const [internalSearch, setInternalSearch] = useState(defaultSearchValue);
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

  const activeSearch = searchValue ?? internalSearch;
  const activePage = page ?? internalPage;
  const activePageSize = pageSize ?? internalPageSize;

  const shouldFilterClientSide = enableSearch && !manualSearch;

  const filteredData = useMemo(() => {
    if (!shouldFilterClientSide || !activeSearch?.trim()) {
      return data;
    }

    const query = activeSearch.trim().toLowerCase();

    return data.filter((row) => {
      const fields =
        searchKeys.length > 0
          ? searchKeys.map((key) => row?.[key])
          : Object.values(row || {});

      return fields.some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(query),
      );
    });
  }, [activeSearch, data, searchKeys, shouldFilterClientSide]);

  const effectiveTotalItems =
    typeof totalItems === "number" ? totalItems : filteredData.length;
  const columnCount = Math.max(columns.length, 1);
  const totalPages = Math.max(
    1,
    Math.ceil(effectiveTotalItems / activePageSize),
  );
  const safePage = Math.min(Math.max(activePage, 1), totalPages);

  const paginatedData = useMemo(() => {
    if (!showPagination || manualPagination) {
      return filteredData;
    }

    const start = (safePage - 1) * activePageSize;
    return filteredData.slice(start, start + activePageSize);
  }, [
    activePageSize,
    filteredData,
    manualPagination,
    safePage,
    showPagination,
  ]);

  const updateSearchValue = (nextValue) => {
    if (searchValue === undefined) {
      setInternalSearch(nextValue);
    }

    if (page === undefined) {
      setInternalPage(1);
    }

    if (onSearchChange) {
      onSearchChange(nextValue);
    }
  };

  const handleSearchChange = (event) => {
    updateSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    updateSearchValue("");
  };

  const handlePageChange = (nextPage) => {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);

    if (page === undefined) {
      setInternalPage(clamped);
    }

    if (onPageChange) {
      onPageChange(clamped);
    }
  };

  const handlePageSizeChange = (event) => {
    const nextSize = Number(event.target.value);

    if (pageSize === undefined) {
      setInternalPageSize(nextSize);
    }

    if (page === undefined) {
      setInternalPage(1);
    }

    if (onPageSizeChange) {
      onPageSizeChange(nextSize);
    }
  };

  return (
    <Card>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <TitleText variant="h6">{title}</TitleText>

          {enableSearch && (
            <div className="relative w-full md:w-72">
              <TextInput
                value={activeSearch}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                wrapperClassName="mb-0"
                className="pr-9"
              />

              {Boolean(activeSearch) && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-2 my-auto h-6 w-6 rounded-full p-0 text-xs leading-none text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  x
                </button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={typeof col === "string" ? col : col?.id || index}
                  className="border-b p-4 text-left"
                >
                  <TitleText variant="small" className="font-semibold">
                    {typeof col === "string" ? col : col?.header}
                  </TitleText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => {
                const rowKey = getRowId ? getRowId(row, index) : index;

                if (renderRow) {
                  const renderedRow = renderRow(row, index);

                  if (React.isValidElement(renderedRow)) {
                    return renderedRow.key == null
                      ? React.cloneElement(renderedRow, { key: rowKey })
                      : renderedRow;
                  }

                  return (
                    <React.Fragment key={rowKey}>{renderedRow}</React.Fragment>
                  );
                }

                return (
                  <tr key={rowKey}>
                    <td colSpan={columnCount} className="p-4">
                      {JSON.stringify(row)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columnCount} className="p-4 text-center">
                  <TitleText variant="small" className="text-gray-500">
                    {emptyMessage}
                  </TitleText>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showPagination && (
          <div className="mt-4 flex flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-600">
              Showing {paginatedData.length} of {effectiveTotalItems} items
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Rows:</label>
              <select
                value={activePageSize}
                onChange={handlePageSizeChange}
                className="rounded-md border border-gray-300 px-2 py-1 text-sm"
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <AppButton
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage <= 1}
                color="blue-gray"
                className="!w-auto px-3 py-2 text-xs normal-case"
              >
                Prev
              </AppButton>
              <span className="text-sm text-gray-700">
                {safePage} / {totalPages}
              </span>
              <AppButton
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage >= totalPages}
                color="blue-gray"
                className="!w-auto px-3 py-2 text-xs normal-case"
              >
                Next
              </AppButton>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default Datatable;
