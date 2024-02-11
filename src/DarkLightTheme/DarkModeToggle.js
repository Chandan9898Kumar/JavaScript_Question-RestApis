import React from "react";

import Toggle from "./Toggle";
import useDarkMode from "use-dark-mode";

import "./styles.scss";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className="centerElem">
      <div style={{ display: "inline-block", float: "inline-start", fontFamily: "sans-serif", fontSize: "larger", fontWeight: "bolder", color: "wheat" }}>Dark And Light Mode</div>
      <div className="dark-mode-toggle">
        <button type="button" onClick={darkMode.disable}>
          ☀
        </button>
        <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
        <button type="button" onClick={darkMode.enable}>
          ☾
        </button>
      </div>
    </div>
  );
};

export default DarkModeToggle;
