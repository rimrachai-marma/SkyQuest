import { StylesConfig } from "react-select";

export const reactSlectStyles = (
  hasError: boolean
): StylesConfig<unknown, boolean> => ({
  container: (provided) => ({
    ...provided,
    width: "100%",
    height: "2.5rem",
  }),
  control: (provided) => ({
    ...provided,
    width: "100%",
    height: "2.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    borderColor: hasError ? "red" : "oklch(0.922 0 0)",
    boxShadow: "none",
    cursor: "text",

    "&:hover": {
      borderColor: "none",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
  }),
});
