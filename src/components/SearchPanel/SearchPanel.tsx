import React from "react";
import { connect } from "react-redux";

import "./SearchPanlel.css";

interface SearchPanelProps {
  onSearch: (term: string) => void;
}

const SearchPanel: React.SFC<SearchPanelProps> = ({ onSearch }) => {
  const [term, setTerm] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTerm(e.target.value);

  const handleSubmint = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch && onSearch(term);
    setTerm("");
  };

  return (
    <form className={"row search-form"} onSubmit={handleSubmint}>
      <input
        className={"form-control col-lg-6 col-xl-6 col-md-8 col-xs-12"}
        placeholder={"Seacrh"}
        value={term}
        onChange={handleChange}
      />
      <button className={"btn btn-dark col-lg-1 col-xl-1 col-md-2 col-xs-12"}>
        Search
      </button>
    </form>
  );
};

const mapDispatchToProps = () => ({
  onSearch: (term: string) =>
    console.log(
      navigator.geolocation.getCurrentPosition(geo => console.log(geo))
    )
});

export default connect(
  null,
  mapDispatchToProps
)(SearchPanel);
