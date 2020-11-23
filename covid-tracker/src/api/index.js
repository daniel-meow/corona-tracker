import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {

  let changeableURL = url;

  if(country) {
    changeableURL = `${url}/countries/${country}`;
    console.log("changeableURL: " + changeableURL);
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableURL);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    /* const { data } = await axios.get(`${url}/daily`); */
    const {
      data: { cases, deaths, recovered },
    } = await axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );

    const modifiedData = {
      cases: cases,
      deaths: deaths,
      recovered: recovered,
      dates: Object.keys(cases),
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
