import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../../api/index";
import styles from "./CountryPicker.module.css";

const CountryPicker = (props) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <div>
      <FormControl>
        <NativeSelect className={styles.formControl} onChange={(e) => props.handleCountryState(e.target.value)}>
          <option value="global">Global</option>
          {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
