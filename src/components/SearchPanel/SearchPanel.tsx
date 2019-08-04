import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { WeatherStateShape } from "../../reducers/WeatherReducer";

import "./SearchPanlel.css";
import { getWeatherByGeo, getWeatherByCity } from "../../actions/Actions";

interface SearchPanelProps {
  city: string;
  pending: boolean;
  onGetLocation: (latitude: number, longitude: number) => void;
  onSearch: (term: string) => void;
}

const SearchPanel: React.SFC<SearchPanelProps> = ({
  city,
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

  useEffect(() => setTerm(city), [city]);

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

const mapStateToProps = ({ city, pending }: WeatherStateShape) => ({
  pending,
  city
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetLocation: (latitude: number, longitude: number) =>
    dispatch(getWeatherByGeo(latitude, longitude)),
  onSearch: (term: string) => dispatch(getWeatherByCity(term))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanel);
