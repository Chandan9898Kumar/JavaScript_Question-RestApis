import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
const Toggle = ({ checked, onChange }) => (
  <span className="toggle-control">
    <input className="dmcheck" type="checkbox" checked={checked} onChange={onChange} id="dmcheck" aria-label="Search" />
    <label htmlFor="dmcheck" />
  </span>
);

Toggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Toggle;
