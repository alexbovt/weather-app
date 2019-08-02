import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { WeatherStateShape } from "../../reducers/WeatherReducer";
import {
  LocationByGeo,
  getLocation,
  LocationByCity
} from "../../actions/Actions";

import "./SearchPanlel.css";

interface SearchPanelProps {
  location: string;
  pending: boolean;
  onGetLocation: (latitude: number, longitude: number) => void;
  onSearch: (term: string) => void;
}

const SearchPanel: React.SFC<SearchPanelProps> = ({
  location,
  pending,
  onGetLocation,
  onSearch
}) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geo => {
      if (geo && geo.coords) {
        onGetLocation &&
          onGetLocation(geo.coords.latitude, geo.coords.longitude);
      }
    });
  }, []);

  useEffect(() => setTerm(location), [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTerm(e.target.value);

  const handleSubmint = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch && onSearch(term);
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

const mapStateToProps = ({ location, pending }: WeatherStateShape) => ({
  pending,
  location
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetLocation: (latitude: number, longitude: number) =>
    dispatch(getLocation({ latitude, longitude } as LocationByGeo)),
  onSearch: (term: string) =>
    dispatch(getLocation({ city: term } as LocationByCity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanel);
