import React from "react";
import "./styles.scss";
const Toggle = ({ checked, onChange }) => (
  <span className="toggle-control">
    <input className="dmcheck" type="checkbox" checked={checked} onChange={onChange} id="dmcheck"  aria-label="Search"/>
    <label htmlFor="dmcheck" />
  </span>
);

export default Toggle;
