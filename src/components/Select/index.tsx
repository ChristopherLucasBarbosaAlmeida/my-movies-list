import ReactSelect, { GroupBase, Props } from "react-select";
import { styles } from "./styles";

export function Select<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: Props<Option, IsMulti, Group>
) {
  return (
    <ReactSelect
      styles={styles}
      {...props}
    />
  );
}
