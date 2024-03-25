import { CSSObjectWithLabel } from "react-select";

export const styles = {
  control: () => ({
    display: "flex",
    backgroundColor: "transparent",
    borderRadius: "8px",
    border: "1px solid #525252",
    cursor: "pointer",
    width: "fit-content",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (base: CSSObjectWithLabel) => ({ ...base, backgroundColor: "#171717" }),
  option: () => ({
    backgroundColor: "#171717",
    padding: "8px",
    cursor: "pointer",
    color: "#eef2ff",
    ":hover": { backgroundColor: "#525252" },
  }),
  input: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "#a3a3a3",
  }),
  multiValue: (base: CSSObjectWithLabel) => ({
    ...base,
    borderRadius: "4px",
    backgroundColor: "#525252",
    color: "#a3a3a3",
  }),
  multiValueLabel: (base: CSSObjectWithLabel) => ({ ...base, color: "#a3a3a3" }),
};
