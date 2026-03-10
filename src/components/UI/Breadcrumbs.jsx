import React from "react";
import { Breadcrumbs as MTBreadcrumbs } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import TitleText from "./TitleText";

// Capitalize each word after dash (-) or underscore (_)
const capitalize = (str) =>
  str
    .split(/[-_]/g) // split by dash or underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const Breadcrumbs = ({
  textOnly = false,
  homePath = "/dashboard",
  homeLabel = "Dashboard",
  hideHome = false,
  labelMap = {},
  getLabel,
  className = "",
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const resolveLabel = (segment) => {
    if (typeof getLabel === "function") {
      return getLabel(segment);
    }

    return labelMap[segment] || capitalize(segment);
  };

  if (textOnly) {
    const pageTitle = pathnames.length
      ? resolveLabel(pathnames[pathnames.length - 1])
      : homeLabel;

    return (
      <TitleText
        variant="small"
        className={`text-gray-800 dark:text-gray-100 font-semibold inline whitespace-nowrap ${className}`}
      >
        {pageTitle}
      </TitleText>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className={`mb-4 mt-2 ${className}`}>
      <MTBreadcrumbs
        fullWidth
        className="bg-gray-100 dark:bg-gray-800 rounded-md p-2"
      >
        {!hideHome && (
          <Link
            to={homePath}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            {homeLabel}
          </Link>
        )}

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = resolveLabel(name);

          return isLast ? (
            <TitleText
              key={routeTo}
              variant="small"
              className="text-gray-800 dark:text-gray-100 font-medium"
              aria-current="page"
            >
              {label}
            </TitleText>
          ) : (
            <Link
              key={routeTo}
              to={routeTo}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              {label}
            </Link>
          );
        })}
      </MTBreadcrumbs>
    </nav>
  );
};

export default Breadcrumbs;
