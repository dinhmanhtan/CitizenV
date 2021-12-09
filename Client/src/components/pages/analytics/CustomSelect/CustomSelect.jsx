import React from "react";
import Select from "react-select";
import "./select.css";

function CustomSelect(props) {
  return (
    <div className="select" style={props.style}>
      <Select
        options={props.options}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}

export default CustomSelect;
