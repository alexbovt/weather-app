import React from "react";
import { connect } from "react-redux";

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
  };

  return (
    <form className={"form-inline"} onSubmit={handleSubmint}>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Seacrh"
          value={term}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Search</button>
      </div>
    </form>
  );
};

const mapDispatchToProps = () => ({
  onSearch: (term: string) => console.log(term)
});

export default connect(
  null,
  mapDispatchToProps
)(SearchPanel);
