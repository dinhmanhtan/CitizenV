import React from "react";
import { HiSearch } from "react-icons/hi";
import "./search.css";
import { useState, useEffect } from "react";

function SearchBar({ search, Submit }) {
  const [value, setValue] = useState("");
  const [classNameIcon, setClassNameIcon] = useState("search-icon-default");

  useEffect(() => {
    search(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      Submit();
    }
  };

  return (
    <div className="form-field">
      <input
        onKeyDown={handleKeyDown}
        className="input"
        type="text"
        placeholder=" "
        value={value}
        onFocus={() => setClassNameIcon("search-icon-focus")}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className="label-form"> Search</span>
      <HiSearch className={classNameIcon} onClick={() => Submit()} />
    </div>
  );
}

export default SearchBar;
