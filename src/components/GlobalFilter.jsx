import React from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";

// Default UI for filtering, accepts props provided by Table.jsx
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  // Adds a little delay to prevent too many re-renders whilst user types
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  // When user types in input GlobalFilter is called via onChange to pass 'value' to the Table component
  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
};

export default GlobalFilter;
