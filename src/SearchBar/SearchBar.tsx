import { Input } from "antd";
import { ISearchbarProps } from "../types";

function Searchbar({ onSearch }: ISearchbarProps) {
  return (
    <Input
      size="large"
      className="searchbar"
      placeholder="Search a product..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default Searchbar;
