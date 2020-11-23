import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = () => {
  const [dailyCases, setDailyCases] = useState([]);
  const [dailyDeaths, setDailyDeaths] = useState([]);
  const [dailyRecovered, setDailyRecovered] = useState([]);
  const [dates, setDates] = useState([]);
  var dailyObject = {};
  useEffect(() => {
    const fetchAPI = async () => {
      dailyObject = await fetchDailyData();
      setDailyCases(Object.values(dailyObject.cases));
      setDailyDeaths(Object.values(dailyObject.deaths));
      setDailyRecovered(Object.values(dailyObject.recovered));
      setDates(Object.values(dailyObject.dates));
    };

    fetchAPI();
  }, []);

  const lineChart = dailyObject ? (
    <Line
      data={{
        labels: dates.map((x) => x),
        datasets: [
          {
            data: dailyCases.map((x) => x),
            label: "Cases",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyDeaths.map((x) => x),
            label: "Deaths",
            borderColor: "red",
            fill: true,
          },
          {
            data: dailyRecovered.map((x) => x),
            label: "Recovered",
            borderColor: "green",
            fill: true,
          },
        ],
      }}
    />
  ) : (
    <h1>Failes</h1>
  );

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
