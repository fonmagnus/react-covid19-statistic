import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    console.log("useEffect is called with country", country);
    const fetchDailyDataAPI = async (country) => {
      const dailyDataResult = await fetchDailyData(country);
      console.log(dailyDataResult);
      setDailyData(dailyDataResult);
    };
    fetchDailyDataAPI(country);
  }, [country]);

  const lineChart = dailyData.length ? (
    <Line
      options={{
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      }}
      data={{
        labels: dailyData.map(({ date }) => new Date(date).toDateString()),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(110, 225, 245, 0.803)",
            fill: true,
            pointHoverBackgroundColor: "blue",
            pointHoverRadius: 7,
            borderWidth: 4,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "rgba(250, 132, 119, 0.803)",
            fill: true,
            pointHoverBackgroundColor: "red",
            pointHoverRadius: 7,
            borderWidth: 4,
          },
        ],
      }}
    />
  ) : (
    <div>
      Oops... it seems you cannot get the data for this country right now :(
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer}>{lineChart}</div>
    </div>
  );
};

export default Chart;
