import React from "react";
import "./App.css";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";


class App extends React.Component {

  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryState = async (country) => {
    if(country === "global") {
      const fetchedData = await fetchData();
      this.setState({data: fetchedData});
    } else {    
      const fetchedData = await fetchData(country);
      this.setState({ data: fetchedData, country: country });
    }
  };



  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryState={this.handleCountryState} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
