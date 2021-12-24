import React from "react";
import { HiSearch } from "react-icons/hi";
import "./search.css";
import { useState, useEffect } from "react";

function SearchBar(props) {
  const { input, setInput, setIsSearch } = props;
  const [classNameIcon, setClassNameIcon] = useState("search-icon-default");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (input && input !== "") setIsSearch(true);
    }
  };

  return (
    <div className="form-field">
      <input
        onKeyDown={handleKeyDown}
        className="input"
        type="text"
        placeholder=" "
        value={input}
        onFocus={() => setClassNameIcon("search-icon-focus")}
        onChange={(e) => setInput(e.target.value)}
      />
      <span className="label-form"> Search</span>
      <HiSearch
        className={classNameIcon}
        onClick={() => {
          if (input && input !== "") setIsSearch(true);
        }}
      />
    </div>
  );
}

export default SearchBar;
