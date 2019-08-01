import React from "react";
import SearchPanel from "../SearchPanel";
import Weather from "../Weather";

import "./Main.css";

const Main: React.SFC = () => {
  return (
    <div className="main-component">
      <header className="main-component__nav navbar navbar-dark">
        <a className="navbar-brand" href="#">
          Weather App
        </a>
      </header>
      <div className="main-component__content container">
        <SearchPanel />
        <Weather />
      </div>
      <footer className={"main-component__footer"}>
        <div>Social Media</div>
        <div> 2019 </div>
      </footer>
    </div>
  );
};

export default Main;
